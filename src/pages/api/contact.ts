import type { APIRoute } from 'astro';

export const prerender = false;

type ContactErrorCode =
  | 'METHOD_NOT_ALLOWED'
  | 'FORBIDDEN'
  | 'PAYLOAD_TOO_LARGE'
  | 'RATE_LIMITED'
  | 'VALIDATION_ERROR'
  | 'DELIVERY_FAILED';

type ContactApiResponse =
  | { ok: true; mode: 'live' | 'dev-preview' }
  | { ok: false; code: ContactErrorCode; message?: string };

const MAX_BODY_BYTES = 16 * 1024;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;
const MIN_HUMAN_FILL_MS = 1200;
const MAX_TRACKED_IPS = 2000;

const ipBuckets = new Map<string, number[]>();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const ALLOWED_PROD_HOSTS = new Set(['santiago-jv.tech', 'www.santiago-jv.tech']);

const readEnv = (key: string): string | undefined => {
  const fromProcess = typeof process !== 'undefined' ? process.env?.[key] : undefined;
  const fromMeta = (import.meta.env as Record<string, string | undefined>)[key];
  const value = fromProcess ?? fromMeta;
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
};

const isProduction = (): boolean => {
  const vercelEnv = readEnv('VERCEL_ENV');
  if (vercelEnv) return vercelEnv === 'production';
  return import.meta.env.PROD && readEnv('NODE_ENV') === 'production';
};

const stripHeaderControls = (value: string): string =>
  value.replace(/[\r\n\0\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim();

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const json = (
  body: ContactApiResponse,
  status = 200,
  extraHeaders: Record<string, string> = {}
): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...extraHeaders,
    },
  });

const getClientIp = (request: Request, clientAddress?: string): string => {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return clientAddress || 'unknown';
};

const isOriginAllowed = (request: Request, prod: boolean): boolean => {
  const origin = request.headers.get('origin');
  if (!origin) return !prod;

  try {
    const hostname = new URL(origin).hostname.toLowerCase();
    if (ALLOWED_PROD_HOSTS.has(hostname) || hostname.endsWith('.vercel.app')) return true;
    if (!prod && (hostname === 'localhost' || hostname === '127.0.0.1')) return true;
    return false;
  } catch {
    return false;
  }
};

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();

  if (ipBuckets.size > MAX_TRACKED_IPS) {
    ipBuckets.forEach((timestamps, key) => {
      const fresh = timestamps.filter((ts) => now - ts < RATE_WINDOW_MS);
      if (fresh.length === 0) ipBuckets.delete(key);
      else ipBuckets.set(key, fresh);
    });
  }

  const recent = (ipBuckets.get(ip) || []).filter((ts) => now - ts < RATE_WINDOW_MS);
  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    ipBuckets.set(ip, recent);
    return false;
  }

  recent.push(now);
  ipBuckets.set(ip, recent);
  return true;
};

const getResendApiKey = (): string | undefined => {
  const direct = readEnv('RESEND_API_KEY');
  if (direct) return direct;

  if (typeof process !== 'undefined' && process.env) {
    for (const [key, value] of Object.entries(process.env)) {
      if (typeof value === 'string' && value.trim()) {
        const normalized = key.trim().toUpperCase();
        if (
          normalized === 'RESEND_API_KEY' ||
          normalized === 'RESEND_KEY' ||
          normalized === 'RESEND_TOKEN' ||
          normalized === 'RESEND_API' ||
          normalized === 'RESEND'
        ) {
          return value.trim();
        }
      }
    }
  }
  return undefined;
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const prod = isProduction();

  if (!isOriginAllowed(request, prod)) {
    return json({ ok: false, code: 'FORBIDDEN' }, 403);
  }

  const declaredLength = Number(request.headers.get('content-length') || '0');
  if (declaredLength > MAX_BODY_BYTES) {
    return json({ ok: false, code: 'PAYLOAD_TOO_LARGE' }, 413);
  }

  let rawText = '';
  try {
    rawText = await request.text();
  } catch {
    return json({ ok: false, code: 'VALIDATION_ERROR' }, 400);
  }

  if (new TextEncoder().encode(rawText).byteLength > MAX_BODY_BYTES) {
    return json({ ok: false, code: 'PAYLOAD_TOO_LARGE' }, 413);
  }

  let body: Record<string, unknown> = {};
  try {
    const parsed = JSON.parse(rawText || '{}');
    if (parsed && typeof parsed === 'object') body = parsed as Record<string, unknown>;
  } catch {
    return json({ ok: false, code: 'VALIDATION_ERROR' }, 400);
  }

  const honeypot = typeof body.website === 'string' ? body.website.trim() : '';
  const startedAt = typeof body.startedAt === 'number' ? body.startedAt : 0;

  // Silent honeypot & bot-speed trap: pretend success so bots do not retry or adapt
  if (honeypot.length > 0 || (startedAt > 0 && Date.now() - startedAt < MIN_HUMAN_FILL_MS)) {
    return json({ ok: true, mode: 'live' });
  }

  let resolvedClientAddress: string | undefined;
  try {
    resolvedClientAddress = clientAddress;
  } catch {
    resolvedClientAddress = undefined;
  }

  if (!checkRateLimit(getClientIp(request, resolvedClientAddress))) {
    return json({ ok: false, code: 'RATE_LIMITED' }, 429, { 'Retry-After': '600' });
  }

  const name = stripHeaderControls(typeof body.name === 'string' ? body.name : '');
  const email = stripHeaderControls(typeof body.email === 'string' ? body.email : '').toLowerCase();
  const subject = stripHeaderControls(typeof body.subject === 'string' ? body.subject : '');
  const message = (typeof body.message === 'string' ? body.message : '').replace(/\0/g, '').trim();

  if (
    name.length < 2 ||
    name.length > 80 ||
    email.length < 5 ||
    email.length > 120 ||
    !EMAIL_REGEX.test(email) ||
    subject.length < 2 ||
    subject.length > 140 ||
    message.length < 10 ||
    message.length > 3000
  ) {
    return json({ ok: false, code: 'VALIDATION_ERROR' }, 400);
  }

  const resendApiKey = getResendApiKey();
  const toEmail = readEnv('CONTACT_TO_EMAIL') || 'contact@santiago-jv.tech';
  const fromEmail = readEnv('CONTACT_FROM_EMAIL') || 'Santiago Portfolio <noreply@santiago-jv.tech>';

  // Local development / preview fallback when RESEND_API_KEY is not configured yet
  if (!resendApiKey) {
    if (!prod) {
      console.info('[contact-api][dev-preview] Validated message ready:', {
        to: toEmail,
        replyTo: email,
        name,
        subject,
        messageLength: message.length,
      });
      return json({ ok: true, mode: 'dev-preview' });
    }

    return json(
      {
        ok: false,
        code: 'DELIVERY_FAILED',
        message:
          'RESEND_API_KEY is not defined in the Vercel Production environment. Please ensure it is saved for "Production" in Vercel Settings -> Environment Variables.',
      },
      503
    );
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessageHtml = escapeHtml(message).replace(/\n/g, '<br />');

  const htmlPayload = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 24px; color: #1d1d1f;">
      <p style="font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.06em; color: #86868b; margin: 0 0 8px;">
        santiago-jv.tech · Portfolio Contact
      </p>
      <h2 style="font-size: 20px; font-weight: 700; margin: 0 0 18px; color: #1d1d1f;">
        ${safeSubject}
      </h2>
      <div style="background: #f5f5f7; border-radius: 14px; padding: 14px 16px; margin-bottom: 18px; font-size: 14px; line-height: 1.5;">
        <div><strong>From:</strong> ${safeName}</div>
        <div><strong>Reply-To:</strong> <a href="mailto:${safeEmail}" style="color: #1d1d1f;">${safeEmail}</a></div>
      </div>
      <div style="font-size: 15px; line-height: 1.6; color: #1d1d1f; white-space: normal;">
        ${safeMessageHtml}
      </div>
    </div>
  `.trim();

  const textPayload = `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        html: htmlPayload,
        text: textPayload,
      }),
    });

    if (!response.ok) {
      const errorBody = (await response.json().catch(() => null)) as { message?: string } | null;
      console.warn('[Contact API] Resend returned non-OK response:', response.status, errorBody);
      return json(
        {
          ok: false,
          code: 'DELIVERY_FAILED',
          message: errorBody?.message || 'Email delivery failed',
        },
        502
      );
    }

    return json({ ok: true, mode: 'live' });
  } catch {
    return json({ ok: false, code: 'DELIVERY_FAILED' }, 502);
  }
};

export const ALL: APIRoute = () =>
  json({ ok: false, code: 'METHOD_NOT_ALLOWED' }, 405, { Allow: 'POST' });
