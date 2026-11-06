import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://www.santiago-jv.tech',
  output: 'static',
  adapter: vercel(),
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  // `/mcp` and `/mcp/*` 307 redirects are served by src/pages/mcp/[...slug].ts
  build: {
    inlineStylesheets: 'auto',
  },
});
