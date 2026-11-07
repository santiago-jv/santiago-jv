export type ContactErrorCode =
  | 'METHOD_NOT_ALLOWED'
  | 'FORBIDDEN'
  | 'PAYLOAD_TOO_LARGE'
  | 'RATE_LIMITED'
  | 'VALIDATION_ERROR'
  | 'DELIVERY_FAILED';

export type ContactApiResponse =
  | { ok: true; mode: 'live' | 'dev-preview' }
  | { ok: false; code: ContactErrorCode; message?: string };

export interface SanitizedContactSubmission {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const MAX_BODY_BYTES = 16 * 1024;
export const RATE_WINDOW_MS = 10 * 60 * 1000;
export const MAX_REQUESTS_PER_WINDOW = 3;
export const MIN_HUMAN_FILL_MS = 1200;
export const MAX_TRACKED_IPS = 2000;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const ALLOWED_PROD_HOSTS = new Set(['santiago-jv.tech', 'www.santiago-jv.tech']);

const ipBuckets = new Map<string, number[]>();

export function stripHeaderControls(value: string): string {
  return value.replace(/[\r\n\0\x08\x0B\x0C\x0E-\x1F\x7F]/g, '').trim();
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function extractClientIp(request: Request, clientAddress?: string): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  const realIp = request.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  return clientAddress || 'unknown';
}

export function isOriginAllowed(origin: string | null, isProd: boolean): boolean {
  if (!origin) return !isProd;

  try {
    const hostname = new URL(origin).hostname.toLowerCase();
    if (ALLOWED_PROD_HOSTS.has(hostname) || hostname.endsWith('.vercel.app')) return true;
    if (!isProd && (hostname === 'localhost' || hostname === '127.0.0.1')) return true;
    return false;
  } catch {
    return false;
  }
}

export function checkContactRateLimit(ip: string, now = Date.now()): boolean {
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
}

export function resetContactRateLimiterForTests(): void {
  ipBuckets.clear();
}

export function isSilentBotTrapTriggered(
  rawBody: Record<string, unknown>,
  now = Date.now()
): boolean {
  const honeypot = typeof rawBody.website === 'string' ? rawBody.website.trim() : '';
  const startedAt = typeof rawBody.startedAt === 'number' ? rawBody.startedAt : 0;

  return honeypot.length > 0 || (startedAt > 0 && now - startedAt < MIN_HUMAN_FILL_MS);
}

export function validateAndSanitizeContactInput(
  rawBody: Record<string, unknown>
): { valid: true; data: SanitizedContactSubmission } | { valid: false } {
  const name = stripHeaderControls(typeof rawBody.name === 'string' ? rawBody.name : '');
  const email = stripHeaderControls(
    typeof rawBody.email === 'string' ? rawBody.email : ''
  ).toLowerCase();
  const subject = stripHeaderControls(typeof rawBody.subject === 'string' ? rawBody.subject : '');
  const message = (typeof rawBody.message === 'string' ? rawBody.message : '')
    .replace(/\0/g, '')
    .trim();

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
    return { valid: false };
  }

  return {
    valid: true,
    data: { name, email, subject, message },
  };
}

export function buildContactEmailPayloads(submission: SanitizedContactSubmission): {
  htmlPayload: string;
  textPayload: string;
  subjectLine: string;
} {
  const safeName = escapeHtml(submission.name);
  const safeEmail = escapeHtml(submission.email);
  const safeSubject = escapeHtml(submission.subject);
  const safeMessageHtml = escapeHtml(submission.message).replace(/\n/g, '<br />');

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

  const textPayload = `From: ${submission.name} <${submission.email}>\nSubject: ${submission.subject}\n\n${submission.message}`;

  return {
    htmlPayload,
    textPayload,
    subjectLine: `[Portfolio] ${submission.subject}`,
  };
}
