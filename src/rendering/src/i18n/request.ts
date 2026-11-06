import { getRequestConfig, GetRequestConfigParams } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';
import client from 'src/lib/sitecore-client';

export default getRequestConfig(async ({ requestLocale }: GetRequestConfigParams) => {
  // The catch-all route calls setRequestLocale with `{site}_{locale}`.
  const requested = await requestLocale;
  const [parsedSite, parsedLocale] = requested?.split('_') || [];
  const locale = hasLocale(routing.locales, parsedLocale) ? parsedLocale : routing.defaultLocale;

  // Routes outside Sitecore, such as /search, have no site and no dictionary.
  if (!parsedSite) {
    return { locale, messages: {} };
  }

  return {
    locale,
    messages: {
      [parsedSite]: await client.getDictionary({ locale, site: parsedSite }),
    },
  };
});
