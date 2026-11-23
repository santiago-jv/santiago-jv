import { timingSafeEqual } from 'node:crypto';
import type { APIRoute } from 'astro';
import {
  buildContactEmailPayloads,
  checkContactRateLimit,
  type ContactApiResponse,
  extractClientIp,
  isOriginAllowed,
  isSilentBotTrapTriggered,
  MAX_BODY_BYTES,
  validateAndSanitizeContactInput,
} from '@/services/contact-service';
import { fetchRemoteSiteConfig } from '@/services/remote-config';

export const prerender = false;

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

const getResendApiKey = (): string | undefined => readEnv('RESEND_API_KEY');

const verifyCfToken = (headerVal: string | null, expected: string | undefined): boolean => {
  if (!headerVal || !expected) return false;
  const bufA = Buffer.from(headerVal.trim(), 'utf8');
  const bufB = Buffer.from(expected.trim(), 'utf8');
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
};

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const prod = isProduction();
  const cfSecret = readEnv('CF_ORIGIN_SECRET');
  const cfVerified = verifyCfToken(request.headers.get('x-santiago-origin-token'), cfSecret);

  if (prod && cfSecret && !cfVerified) {
    return json({ ok: false, code: 'FORBIDDEN' }, 403);
  }

  const remoteConfig = prod
    ? await fetchRemoteSiteConfig(readEnv('PUBLIC_CONFIG_API_URL'))
    : null;
  const mergedAllowedOrigins = [
    readEnv('ALLOWED_CONTACT_ORIGINS'),
    remoteConfig?.domains.allowedOrigins?.join(','),
  ]
    .filter(Boolean)
    .join(',');

  if (!isOriginAllowed(request.headers.get('origin'), prod, mergedAllowedOrigins || undefined)) {
    return json({ ok: false, code: 'FORBIDDEN' }, 403);
  }

  const contentType = request.headers.get('content-type') || '';
  if (!contentType.toLowerCase().includes('application/json')) {
    return json({ ok: false, code: 'VALIDATION_ERROR' }, 400);
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

  // Silent honeypot & bot-speed trap: pretend success so bots do not retry or adapt
  if (isSilentBotTrapTriggered(body)) {
    return json({ ok: true, mode: 'live' });
  }

  let resolvedClientAddress: string | undefined;
  try {
    resolvedClientAddress = clientAddress;
  } catch {
    resolvedClientAddress = undefined;
  }

  if (!checkContactRateLimit(extractClientIp(request, resolvedClientAddress, cfVerified))) {
    return json({ ok: false, code: 'RATE_LIMITED' }, 429, { 'Retry-After': '600' });
  }

  const validation = validateAndSanitizeContactInput(body);
  if (!validation.valid) {
    return json({ ok: false, code: 'VALIDATION_ERROR' }, 400);
  }

  const { name, email, subject, message } = validation.data;
  const resendApiKey = getResendApiKey();
  const toEmail =
    readEnv('CONTACT_TO_EMAIL') ||
    remoteConfig?.social.contactEmail ||
    'contact@santiago-jv.tech';
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

    console.error('[Contact API] RESEND_API_KEY is missing in Production environment.');
    return json({ ok: false, code: 'DELIVERY_FAILED' }, 503);
  }

  const { htmlPayload, textPayload, subjectLine } = buildContactEmailPayloads(validation.data);

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
        subject: subjectLine,
        html: htmlPayload,
        text: textPayload,
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      const errorBody = (await response.json().catch(() => null)) as { message?: string } | null;
      console.warn('[Contact API] Resend returned non-OK response:', response.status, errorBody);
      return json({ ok: false, code: 'DELIVERY_FAILED' }, 502);
    }

    return json({ ok: true, mode: 'live' });
  } catch {
    return json({ ok: false, code: 'DELIVERY_FAILED' }, 502);
  }
};

export const ALL: APIRoute = () =>
  json({ ok: false, code: 'METHOD_NOT_ALLOWED' }, 405, { Allow: 'POST' });
