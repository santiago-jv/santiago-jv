# Repository Guidelines (`santiago-jv`)

## UI Components and Modern Web Guidance

When building or modifying UI in this repository, follow this strict order of precedence. This hierarchy applies even when `modern-web-guidance` skills describe themselves as mandatory for all HTML, CSS, and client-side JavaScript tasks:

1. **Prioritize internal Astro components and Apple design tokens**:
   - Reuse existing components in `src/components/` (`SectionHeading.astro`, `PortfolioIcon.astro`, `IntegrationLogo.astro`, `Header.astro`, `ContactSection.astro`, `MacBookShowcase.astro`, `McpShowcaseSection.astro`) and CSS Modules (`*.module.css`) backed by the tokens in `src/styles/globals.css` (`--apple-*`, `--radius-*`, `--ease-apple-*`).
   - Do not replace established brand components or layout primitives with unstyled native HTML elements simply because Modern Web Guidance recommends a raw native element.

2. **Use Modern Web Guidance where internal components end**:
   - Consult Modern Web Guidance before writing new HTML, CSS, or client-side JavaScript (`src/scripts/*.ts`) for interactive behaviors, layout isolation, accessibility, or Core Web Vitals:
     - **Scroll-linked effects**: Use declarative CSS Scroll-Driven Animations (`animation-timeline: scroll(block root)`) inside `@supports` with `@media (prefers-reduced-motion: reduce)` fallbacks instead of main-thread `scroll` listeners.
     - **Dialogs, drawers, and popovers**: Prefer native `<dialog>`, the Popover API (`popover`), or `inert` + focus restoration on background siblings instead of custom `overflow: hidden` body locks or manual tab traps.
     - **Exclusive or searchable disclosures**: Use `<details name="...">` and `hidden="until-found"` so collapsed content remains discoverable via in-page search (`Cmd+F` / `Ctrl+F`).
     - **Tablists and toolbars**: Always implement a single tab stop with roving `tabindex` (`0` / `-1`), ArrowLeft/ArrowRight/Home/End keyboard navigation, and paired `role="tabpanel"` + `aria-controls` / `aria-labelledby`.
     - **Core Web Vitals & viewport stability**: Use `fetchpriority="high"` decoupled from `loading="lazy"` on above-the-fold LCP assets, `[data-cv-section]` (`content-visibility: auto; contain-intrinsic-size`) on offscreen sections, `font-size-adjust` for web fonts, and `100dvh` (with `100vh` fallback) instead of static `100vh` on mobile overlays.
     - **Accessible forms**: Provide explicit `<label>` elements, `autocomplete` / `inputmode` tokens, `aria-describedby` error containers, and blur-based validation that suppresses errors during active typing.
     - **Focus contrast**: Maintain `>= 3:1` `:focus-visible` outline contrast on both Daylight surfaces and `[data-dark-surface]` Space Black surfaces.

3. **Prioritize existing conventions when guidance conflicts**:
   - Preserve complete structural parity between `en` and `es` locales in `src/data/portfolio-content.ts`, `src/data/integrations-content.ts`, and `src/data/mcp-content.ts`.
   - Maintain clean editorial copywriting without AI em-dash (`—`) artifacts in user-facing copy.
   - Verify every UI change with `npm run check`, `npm test`, and `npm run build`.
