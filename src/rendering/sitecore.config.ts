import { defineConfig } from '@sitecore-content-sdk/nextjs/config';

/**
 * Connection values come from environment variables. See .env for the list.
 * https://doc.sitecore.com/xmc/en/developers/content-sdk/the-sitecore-configuration-file.html
 */
export default defineConfig({
  defaultSite: process.env.NEXT_PUBLIC_DEFAULT_SITE_NAME || 'playwebsite',
  redirects: {
    // Must match `localePrefix` in src/i18n/routing.ts.
    appLocalePrefix: 'as-needed',
  },
});
