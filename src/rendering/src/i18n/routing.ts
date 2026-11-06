import { defineRouting } from 'next-intl/routing';
import sitecoreConfig from 'sitecore.config';

export const routing = defineRouting({
  // These should match, or be a subset of, the languages in Sitecore.
  locales: ['en', 'fr-CA', 'ja-JP'] as string[],
  defaultLocale: sitecoreConfig.defaultLanguage,
  // Keeps the default locale unprefixed. Must match `redirects.appLocalePrefix` in sitecore.config.ts.
  localePrefix: sitecoreConfig.redirects?.appLocalePrefix || 'as-needed',
});
