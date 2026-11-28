# Changelog

All notable changes to `santiago-jv` (`https://www.santiago-jv.tech`) are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.5.3] - 2026-11-28

### Bug Fixes

- fix(security): allow api.santiago-jv.tech in CSP connect-src for remote-config hydration (`fa3163e`)
## [4.5.2] - 2026-11-27

### Documentation & Maintenance

- docs(profile): update experience to 5+ years and refine role metadata (`15e8ad0`)
## [4.5.1] - 2026-11-25

### Bug Fixes

- fix(ci): enable automated tag releases and changelog generation (`7b20f3d`)
## [4.5.0] - 2026-11-24

### Features

- Adopt Chrome Modern Web Guidance standards (`animation-timeline: scroll()`, `inert` mobile drawer focus management, roving `tabindex` tablists, `content-visibility: auto`, `fetchpriority="high"`, `font-size-adjust`, blur-based accessible form validation, `100dvh`, and high-contrast `:focus-visible` rings) and add `AGENTS.md` UI precedence rules (`88d4689`).
- Consume centralized Neon Postgres `site_config` remote configuration in `/api/contact` and client-side DOM hydrator (`c681230`).
- Integrate live Web AI chat showcase alongside the MCP console and interactive MacBook Architecture Studio (`ceb4804`, `eb86de3`).
- Replace Slack with Nequi digital wallet in the 12-service integrations matrix (`17aec31`).

### Bug Fixes

- Adopt declarative `AbortSignal.timeout()` across remote-config fetch callers per Modern Web Guidance `legacy-scan` (`98caf37`).
- Unwrap `/v1/config/public` response envelope in remote-config service and DOM hydrator (`aae5840`).
- Harden `/api/contact` origin allowlist, Cloudflare origin token lock, trusted IP extraction, and CSP/HSTS headers (`321868a`).
- Align MacBook screen bottom corners flush with unibody base seam (`cee54a7`).

### Performance & Refactoring

- Migrate portfolio to Astro 5/7 zero-React architecture with modular clean architecture, bilingual EN/ES test suite, SEO schemas, and `llms-full.txt` (`ece81e2`, `603c4a7`, `1f2f02a`).

### Documentation & Maintenance

- Upgrade to Astro 7 and `@astrojs/vercel` 11 with `path-to-regexp` override and zero `npm audit` vulnerabilities (`19fe6b6`).
- Update X/Twitter handle to `@santiagojvtech`, clarify Bolsiyo payment APIs (Transfiya API and Nequi API), and synchronize `README.md` (`c703822`, `acfaa2e`, `72c478e`).
