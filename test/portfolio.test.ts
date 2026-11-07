import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { beforeEach, describe, it } from 'node:test';
import { ARCHITECTURE_STUDIO_CONTENT } from '../src/data/architecture-studio.ts';
import { INTEGRATIONS_CONTENT } from '../src/data/integrations-content.ts';
import { MCP_CONTENT, MCP_DOCS_URL, MCP_ENDPOINT_URL } from '../src/data/mcp-content.ts';
import { PORTFOLIO_CONTENT } from '../src/data/portfolio-content.ts';
import {
  buildContactEmailPayloads,
  checkContactRateLimit,
  escapeHtml,
  extractClientIp,
  isOriginAllowed,
  isSilentBotTrapTriggered,
  MIN_HUMAN_FILL_MS,
  resetContactRateLimiterForTests,
  stripHeaderControls,
  validateAndSanitizeContactInput,
} from '../src/services/contact-service.ts';

describe('santiago-jv Portfolio Architecture, Security, i18n & SEO Suite', () => {
  beforeEach(() => {
    resetContactRateLimiterForTests();
  });

  describe('Contact Service & Security Guardrails', () => {
    it('strips CRLF and control characters to prevent header injection', () => {
      const malicious = 'Santiago\r\nBcc: attacker@evil.com\x00\x1F';
      assert.equal(stripHeaderControls(malicious), 'SantiagoBcc: attacker@evil.com');
    });

    it('escapes HTML entities to prevent XSS in email templates', () => {
      const raw = `<script>alert("xss" & 'test')</script>`;
      assert.equal(
        escapeHtml(raw),
        '&lt;script&gt;alert(&quot;xss&quot; &amp; &#39;test&#39;)&lt;/script&gt;'
      );
    });

    it('enforces strict origin validation in production and allows localhost in development', () => {
      assert.equal(isOriginAllowed('https://www.santiago-jv.tech', true), true);
      assert.equal(isOriginAllowed('https://santiago-jv.tech', true), true);
      assert.equal(isOriginAllowed('https://santiago-jv-preview.vercel.app', true), true);
      assert.equal(isOriginAllowed('https://evil.example.com', true), false);
      assert.equal(isOriginAllowed(null, true), false);
      assert.equal(isOriginAllowed('http://localhost:3000', true), false);

      assert.equal(isOriginAllowed('http://localhost:3000', false), true);
      assert.equal(isOriginAllowed(null, false), true);
    });

    it('extracts client IP from X-Forwarded-For or X-Real-IP headers', () => {
      const req1 = new Request('https://www.santiago-jv.tech/api/contact', {
        headers: { 'x-forwarded-for': '198.51.100.10, 10.0.0.1' },
      });
      assert.equal(extractClientIp(req1), '198.51.100.10');

      const req2 = new Request('https://www.santiago-jv.tech/api/contact', {
        headers: { 'x-real-ip': '198.51.100.22' },
      });
      assert.equal(extractClientIp(req2), '198.51.100.22');
    });

    it('triggers silent bot trap on honeypot field or superhuman submission speed', () => {
      const now = 1_000_000;
      assert.equal(
        isSilentBotTrapTriggered({ website: 'https://spam.bot', startedAt: now - 5000 }, now),
        true
      );
      assert.equal(
        isSilentBotTrapTriggered({ website: '', startedAt: now - (MIN_HUMAN_FILL_MS - 200) }, now),
        true
      );
      assert.equal(
        isSilentBotTrapTriggered({ website: '', startedAt: now - (MIN_HUMAN_FILL_MS + 500) }, now),
        false
      );
    });

    it('enforces per-IP sliding window rate limit (max 3 requests per 10 minutes)', () => {
      const ip = '203.0.113.50';
      const t0 = 1_000_000;
      assert.equal(checkContactRateLimit(ip, t0), true);
      assert.equal(checkContactRateLimit(ip, t0 + 1000), true);
      assert.equal(checkContactRateLimit(ip, t0 + 2000), true);
      assert.equal(checkContactRateLimit(ip, t0 + 3000), false);
    });

    it('validates and sanitizes contact payloads and builds safe email templates', () => {
      const invalid = validateAndSanitizeContactInput({
        name: 'A',
        email: 'not-an-email',
        subject: 'Hi',
        message: 'Short',
      });
      assert.equal(invalid.valid, false);

      const valid = validateAndSanitizeContactInput({
        name: '  Jane Recruiter\r\n ',
        email: '  JANE@Company.com ',
        subject: 'Senior Backend Role <Urgent>',
        message: 'Hello Santiago,\nWe would love to schedule an interview for our team.',
      });
      assert.equal(valid.valid, true);
      if (valid.valid) {
        assert.equal(valid.data.name, 'Jane Recruiter');
        assert.equal(valid.data.email, 'jane@company.com');
        const payloads = buildContactEmailPayloads(valid.data);
        assert.equal(payloads.subjectLine, '[Portfolio] Senior Backend Role <Urgent>');
        assert.match(payloads.htmlPayload, /Senior Backend Role &lt;Urgent&gt;/);
        assert.match(payloads.htmlPayload, /<br \/>/);
      }
    });
  });

  describe('Bilingual Content Parity & Domain Integrity (EN / ES)', () => {
    it('maintains complete structural parity between English and Spanish portfolio content', () => {
      assert.equal(
        PORTFOLIO_CONTENT.en.experiences.length,
        PORTFOLIO_CONTENT.es.experiences.length
      );
      assert.equal(
        PORTFOLIO_CONTENT.en.projects.length,
        PORTFOLIO_CONTENT.es.projects.length
      );
      assert.equal(
        PORTFOLIO_CONTENT.en.contact.infoItems.length,
        PORTFOLIO_CONTENT.es.contact.infoItems.length
      );
      assert.equal(
        PORTFOLIO_CONTENT.en.hero.socialLinks.length,
        PORTFOLIO_CONTENT.es.hero.socialLinks.length
      );
    });

    it('includes Nequi and excludes Slack across all 12 production integrations in EN and ES', () => {
      const enIds = INTEGRATIONS_CONTENT.en.items.map((item) => item.id);
      const esIds = INTEGRATIONS_CONTENT.es.items.map((item) => item.id);

      assert.equal(enIds.length, 12);
      assert.deepEqual(enIds, esIds);
      assert.equal(enIds.includes('nequi'), true);
      assert.equal((enIds as string[]).includes('slack'), false);
    });

    it('maintains 4 interactive MacBook Architecture Studio topologies in EN and ES', () => {
      const enTabs = ARCHITECTURE_STUDIO_CONTENT.en.tabs;
      const esTabs = ARCHITECTURE_STUDIO_CONTENT.es.tabs;

      assert.equal(enTabs.length, 4);
      assert.equal(esTabs.length, 4);

      for (let i = 0; i < enTabs.length; i++) {
        assert.equal(enTabs[i].id, esTabs[i].id);
        assert.equal(enTabs[i].topology, esTabs[i].topology);
        assert.equal(enTabs[i].nodes.length, esTabs[i].nodes.length);
      }
    });

    it('maintains valid MCP showcase links and natural copy without AI em-dashes', () => {
      assert.equal(MCP_ENDPOINT_URL, 'https://mcp.santiago-jv.tech/mcp');
      assert.equal(MCP_DOCS_URL, 'https://mcp.santiago-jv.tech/docs');

      const serializedMcp = JSON.stringify(MCP_CONTENT);
      const serializedPortfolio = JSON.stringify(PORTFOLIO_CONTENT);
      const serializedIntegrations = JSON.stringify(INTEGRATIONS_CONTENT);
      const serializedStudio = JSON.stringify(ARCHITECTURE_STUDIO_CONTENT);

      assert.equal(serializedMcp.includes('—'), false, 'MCP_CONTENT should not contain AI em-dashes');
      assert.equal(
        serializedPortfolio.includes('—'),
        false,
        'PORTFOLIO_CONTENT should not contain AI em-dashes'
      );
      assert.equal(
        serializedIntegrations.includes('—'),
        false,
        'INTEGRATIONS_CONTENT should not contain AI em-dashes'
      );
      assert.equal(
        serializedStudio.includes('—'),
        false,
        'ARCHITECTURE_STUDIO_CONTENT should not contain AI em-dashes'
      );
    });
  });

  describe('SEO & AI Discovery Artifacts (robots.txt, sitemap.xml, llms.txt, llms-full.txt)', () => {
    const publicDir = path.resolve(import.meta.dirname, '../public');

    it('verifies robots.txt and sitemap.xml contain canonical URLs and hreflang alternates', () => {
      const robots = fs.readFileSync(path.join(publicDir, 'robots.txt'), 'utf8');
      const sitemap = fs.readFileSync(path.join(publicDir, 'sitemap.xml'), 'utf8');

      assert.match(robots, /Sitemap: https:\/\/www\.santiago-jv\.tech\/sitemap\.xml/);
      assert.match(sitemap, /https:\/\/www\.santiago-jv\.tech\//);
      assert.match(sitemap, /hreflang="es"/);
      assert.match(sitemap, /llms-full\.txt/);
    });

    it('verifies llms.txt and llms-full.txt include Nequi, MCP URLs, and clean punctuation', () => {
      const llms = fs.readFileSync(path.join(publicDir, 'llms.txt'), 'utf8');
      const llmsFull = fs.readFileSync(path.join(publicDir, 'llms-full.txt'), 'utf8');

      assert.match(llms, /Nequi/);
      assert.match(llms, /https:\/\/mcp\.santiago-jv\.tech\/mcp/);
      assert.equal(llms.includes('Slack'), false);

      assert.match(llmsFull, /Nequi/);
      assert.equal(llmsFull.includes(' ,  '), false, 'llms-full.txt should not contain " ,  " artifacts');
      assert.equal(llmsFull.includes('—'), false, 'llms-full.txt should not contain AI em-dashes');
    });
  });
});
