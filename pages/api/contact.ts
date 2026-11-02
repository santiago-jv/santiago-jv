import type { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '16kb',
    },
  },
};

type ContactApiResponse =
  | { ok: true; mode: 'live' | 'dev-preview' }
  | {
      ok: false;
      code:
        | 'METHOD_NOT_ALLOWED'
        | 'FORBIDDEN'
        | 'RATE_LIMITED'
        | 'VALIDATION_ERROR'
        | 'DELIVERY_FAILED';
      message?: string;
    };

const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;
const MIN_HUMAN_FILL_MS = 1200;
const MAX_TRACKED_IPS = 2000;

const ipBuckets = new Map<string, number[]>();

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const ALLOWED_PROD_HOSTS = new Set([
  'santiago-jv.tech',
  'www.santiago-jv.tech',
]);

const stripHeaderControls = (value: string): string =>
  value.replace(/[\r\n\0\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim();

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const getClientIp = (req: NextApiRequest): string => {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  if (Array.isArray(forwarded) && forwarded[0]) {
    return forwarded[0].trim();
  }
  const realIp = req.headers['x-real-ip'];
  if (typeof realIp === 'string' && realIp.length > 0) {
    return realIp.trim();
  }
  return req.socket?.remoteAddress || 'unknown';
};

const isOriginAllowed = (req: NextApiRequest): boolean => {
  const origin = req.headers.origin;
  if (!origin) {
    return process.env.NODE_ENV !== 'production';
  }

  try {
    const parsed = new URL(origin);
    const hostname = parsed.hostname.toLowerCase();

    if (ALLOWED_PROD_HOSTS.has(hostname) || hostname.endsWith('.vercel.app')) {
      return true;
    }

    if (
      process.env.NODE_ENV !== 'production' &&
      (hostname === 'localhost' || hostname === '127.0.0.1')
    ) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
};

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();

  if (ipBuckets.size > MAX_TRACKED_IPS) {
    ipBuckets.forEach((timestamps: number[], key: string) => {
      const fresh = timestamps.filter((ts: number) => now - ts < RATE_WINDOW_MS);
      if (fresh.length === 0) {
        ipBuckets.delete(key);
      } else {
        ipBuckets.set(key, fresh);
      }
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContactApiResponse>
): Promise<void> {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    res.status(405).json({ ok: false, code: 'METHOD_NOT_ALLOWED' });
    return;
  }

  if (!isOriginAllowed(req)) {
    res.status(403).json({ ok: false, code: 'FORBIDDEN' });
    return;
  }

  const body = typeof req.body === 'object' && req.body !== null ? req.body : {};
  const honeypot = typeof body.website === 'string' ? body.website.trim() : '';
  const startedAt = typeof body.startedAt === 'number' ? body.startedAt : 0;

  // Silent honeypot & bot-speed trap: pretend success so bots do not retry or adapt
  if (honeypot.length > 0 || (startedAt > 0 && Date.now() - startedAt < MIN_HUMAN_FILL_MS)) {
    res.status(200).json({ ok: true, mode: 'live' });
    return;
  }

  const clientIp = getClientIp(req);
  if (!checkRateLimit(clientIp)) {
    res.setHeader('Retry-After', '600');
    res.status(429).json({ ok: false, code: 'RATE_LIMITED' });
    return;
  }

  const rawName = typeof body.name === 'string' ? body.name : '';
  const rawEmail = typeof body.email === 'string' ? body.email : '';
  const rawSubject = typeof body.subject === 'string' ? body.subject : '';
  const rawMessage = typeof body.message === 'string' ? body.message : '';

  const name = stripHeaderControls(rawName);
  const email = stripHeaderControls(rawEmail).toLowerCase();
  const subject = stripHeaderControls(rawSubject);
  const message = rawMessage.replace(/\0/g, '').trim();

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
    res.status(400).json({ ok: false, code: 'VALIDATION_ERROR' });
    return;
  }

  const getResendApiKey = (): string | undefined => {
    if (process.env.RESEND_API_KEY?.trim()) return process.env.RESEND_API_KEY.trim();

    for (const [key, value] of Object.entries(process.env)) {
      if (typeof value === 'string' && value.trim()) {
        const normalized = key.trim().toUpperCase();
        if (
          normalized === 'RESEND_API_KEY' ||
          normalized === 'NEXT_PUBLIC_RESEND_API_KEY' ||
          normalized === 'RESEND_KEY' ||
          normalized === 'RESEND_TOKEN' ||
          normalized === 'RESEND_API' ||
          normalized === 'RESEND'
        ) {
          return value.trim();
        }
      }
    }
    return undefined;
  };

  const resendApiKey = getResendApiKey();
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim() || 'contact@santiago-jv.tech';
  const fromEmail =
    process.env.CONTACT_FROM_EMAIL?.trim() || 'Santiago Portfolio <noreply@santiago-jv.tech>';

  // Local development preview fallback when RESEND_API_KEY is not configured yet
  if (!resendApiKey) {
    if (process.env.NODE_ENV !== 'production') {
      console.info('[contact-api][dev-preview] Validated message ready:', {
        to: toEmail,
        replyTo: email,
        name,
        subject,
        messageLength: message.length,
      });
      res.status(200).json({ ok: true, mode: 'dev-preview' });
      return;
    }

    const systemPrefixes = ['AWS_', 'VERCEL', 'LAMBDA_', 'NODE_', '_', 'PATH', 'LD_', 'LANG', 'TZ', 'HOME'];
    const customKeys = Object.keys(process.env).filter(
      (k) => !systemPrefixes.some((prefix) => k.startsWith(prefix))
    );

    res.status(503).json({
      ok: false,
      code: 'DELIVERY_FAILED',
      message: `RESEND_API_KEY is missing in Vercel environment. Custom env keys found in production: [${customKeys.join(', ')}].`,
    });
    return;
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
      const errorBody = await response.json().catch(() => null);
      console.warn('[Contact API] Resend returned non-OK response:', response.status, errorBody);
      res.status(502).json({
        ok: false,
        code: 'DELIVERY_FAILED',
        message: errorBody?.message || 'Email delivery failed',
      });
      return;
    }

    res.status(200).json({ ok: true, mode: 'live' });
  } catch {
    res.status(502).json({ ok: false, code: 'DELIVERY_FAILED' });
  }
}
