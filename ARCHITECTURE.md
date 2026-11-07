# Architecture & Engineering Guide (`santiago-jv`)

> **Important Note:** `README.md` in this repository is reserved exclusively for the `santiago-jv` GitHub Profile presentation and must remain untouched. All project architecture, SEO, security, performance, and testing documentation lives in this `ARCHITECTURE.md` file.

---

## 1. Architectural Pattern: Modular Clean / Feature-Layered Architecture (Astro 5)

`santiago-jv` (`https://www.santiago-jv.tech`) is structured using a **Modular Clean / Feature-Layered Architecture** tailored for **Astro 5** static prerendering with on-demand Vercel Serverless API routes:

```text
src/
├── types/
│   └── portfolio.ts                 # Strict TypeScript domain contracts (Locale, ExperienceItem, ProjectItem, ContactCopy, etc.)
├── data/
│   ├── portfolio-content.ts         # Bilingual (EN / ES) content repository for Hero, Experience, Architecture Pillars, Contact & Footer
│   ├── architecture-studio.ts       # Bilingual interactive topology nodes & edges for the 3D MacBook Pro Architecture Studio
│   ├── integrations-content.ts      # Bilingual catalog of 12 production third-party integrations (Stripe, Nequi, Refácil, Datadog, etc.)
│   └── mcp-content.ts               # Bilingual showcase content & natural prompts for the personal MCP server (mcp.santiago-jv.tech)
├── services/
│   └── contact-service.ts           # Pure domain & security service: CRLF header stripping, HTML escaping, origin verification, bot traps, sliding-window rate limiter, and email payload builder
├── utils/
│   └── clipboard.ts                 # Shared client-side Async Clipboard helper with graceful fallback
├── scripts/
│   ├── header.ts                    # Sticky glass header, mobile drawer, and locale switcher controller
│   ├── macbook-studio.ts            # Interactive 3D MacBook Pro lid scroll physics, domain topology switching, and node inspector
│   ├── mcp-console.ts               # Interactive MCP prompt switcher and one-click endpoint copy controller
│   ├── contact.ts                   # Contact form submission state machine and email channel copy controller
│   └── page-motion.ts               # Hardware-accelerated IntersectionObserver reveal controller
├── components/
│   ├── PortfolioPage.astro          # Top-level page composition root for / (EN) and /es (ES)
│   ├── Header.astro                 # Navigation bar & locale switcher
│   ├── MainContent.astro            # Hero presentation & MacBook Pro Architecture Studio wrapper
│   ├── MacBookShowcase.astro        # 3D MacBook Pro hardware + interactive SVG architecture diagram
│   ├── ExperienceSection.astro      # Career timeline (GoodRec, Bolsiyo, Cooltivalo · +COTAS · SLS GROUPS)
│   ├── ProjectsSection.astro        # Production Architecture & Engineering Pillars
│   ├── IntegrationsSection.astro    # 12-card production integrations grid + custom SVG brand marks
│   ├── McpShowcaseSection.astro     # Interactive Personal MCP Server console
│   ├── ContactSection.astro         # Direct contact channels + guarded contact form
│   └── Footer.astro                 # Minimalist Apple Cupertino footer
├── layouts/
│   └── BaseLayout.astro             # Master SEO head, OpenGraph, Twitter Cards, hreflang alternates, and Schema.org ProfilePage JSON-LD
└── pages/
    ├── index.astro                  # Prerendered English entry route (/) and ?lang=es dynamic detector
    ├── es/index.astro               # Prerendered Spanish entry route (/es)
    ├── 404.astro                    # Custom bilingual 404 page
    ├── api/contact.ts               # Thin HTTP controller delegating to src/services/contact-service.ts + Resend API
    └── mcp/[...slug].ts             # 308 Permanent Redirect to https://mcp.santiago-jv.tech
```

---

## 2. Design Patterns & Clean Code Principles

1. **Separation of Concerns (Thin Controllers, Pure Services):**
   - `src/pages/api/contact.ts` handles only HTTP request/response plumbing and Resend transport, while `src/services/contact-service.ts` encapsulates all validation, sanitization, origin verification, bot-trap detection, rate limiting, and email HTML generation as pure, deterministic functions.
2. **Repository / Single Source of Truth Pattern:**
   - All bilingual copy (`en` and `es`) is strongly typed against `src/types/portfolio.ts` and stored in `src/data/*.ts`, guaranteeing structural parity across languages.
3. **Guard & Sanitizer Pattern:**
   - **Header Injection Prevention:** `stripHeaderControls` removes `\r`, `\n`, `\0`, and ASCII control characters from user-supplied fields.
   - **XSS Prevention:** `escapeHtml` sanitizes all user input before interpolating into HTML email templates.
   - **Silent Bot Traps:** Honeypot field (`website`) and human fill-time threshold (`MIN_HUMAN_FILL_MS = 1200ms`) silently absorb automated spam without tipping off bots.
   - **Sliding-Window Rate Limiter:** `checkContactRateLimit` restricts each IP to at most `3` submissions per `10` minutes with automatic memory eviction (`MAX_TRACKED_IPS = 2000`).
4. **DRY Client Controllers:**
   - Shared browser utilities (`src/utils/clipboard.ts`) eliminate duplicated clipboard logic across interactive sections and achieve `0 errors, 0 warnings, 0 hints` in `astro check`.

---

## 3. SEO, AI Discovery (`llms.txt`) & Web Performance

- **Technical SEO & Bilingual Indexing:**
  - Canonical URLs, `hreflang` alternates (`en`, `es`, `x-default`), OpenGraph (`og:image` 1200×630), Twitter Cards (`summary_large_image`), and a rich Schema.org `ProfilePage` + `Person` JSON-LD graph in `src/layouts/BaseLayout.astro`.
- **AI & LLM Discoverability:**
  - Serves `public/llms.txt` and `public/llms-full.txt` following the `llms.txt` standard, linking directly to the live Streamable HTTP MCP server (`https://mcp.santiago-jv.tech/mcp`) and ATS-friendly English/Spanish PDF resumes.
- **Web Performance:**
  - **Static Prerendering:** `/` and `/es` are prerendered at build time into zero-overhead HTML + CSS bundles.
  - **Self-Hosted Variable Fonts:** `@fontsource-variable/plus-jakarta-sans` and `@fontsource-variable/jetbrains-mono` eliminate third-party Google Fonts DNS/TLS waterfalls.
  - **Immutable Edge Caching:** `vercel.json` serves `/_astro/*` and `/fonts/*` with `Cache-Control: public, max-age=31536000, immutable` alongside strict security headers (`X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`).
  - **Passive Scroll & Reveal Observers:** All scroll and intersection listeners in `macbook-studio.ts`, `header.ts`, and `page-motion.ts` use `{ passive: true }` and `requestAnimationFrame` ticking to maintain 60fps animations.

---

## 4. Verification & Testing Commands

```bash
# 1. Run Astro & TypeScript diagnostics (0 errors, 0 warnings, 0 hints)
npm run check

# 2. Execute the automated unit, security, i18n parity & SEO test suite
npm test

# 3. Build production static + serverless bundle
npm run build
```
