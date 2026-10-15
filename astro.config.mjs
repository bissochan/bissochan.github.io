// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// SITE_URL comes from .env locally and from a repository variable in CI.
const { SITE_URL } = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const site = SITE_URL && /^https?:\/\//.test(SITE_URL) ? SITE_URL : 'https://bissochan.github.io';

// https://astro.build/config
export default defineConfig({
  site,
  trailingSlash: 'ignore',

  i18n: {
    locales: ['en', 'it'],
    defaultLocale: 'en',
    routing: { prefixDefaultLocale: false },
  },

  integrations: [
    react(),
    sitemap({
      i18n: { defaultLocale: 'en', locales: { en: 'en', it: 'it' } },
    }),
  ],

  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'none'",
      ],
      // Radix (mobile menu) injects a <style> tag to lock scrolling. Inline styles are low risk;
      // scripts stay hash-only, which is what the policy is really for.
      styleDirective: { resources: ["'self'", "'unsafe-inline'"] },
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
