import Link from 'next/link';
import { NextIntlClientProvider } from 'next-intl';
import { ErrorPage, Page } from '@sitecore-content-sdk/nextjs';
import client from 'lib/sitecore-client';
import scConfig from 'sitecore.config';
import Layout from 'src/Layout';
import Providers from 'src/Providers';

export default async function NotFound() {
  const site = scConfig.defaultSite;
  const locale = scConfig.defaultLanguage;
  let page: Page | null = null;
  let dictionary = {};

  // Keep the fallback below when Sitecore can't be reached, such as during a build
  try {
    page = await client.getErrorPage(ErrorPage.NotFound, { site, locale });
    dictionary = page ? await client.getDictionary({ site, locale }) : {};
  } catch (error) {
    console.error('Could not fetch the Sitecore 404 page', error);
    page = null;
  }

  if (page) {
    return (
      <NextIntlClientProvider locale={locale} messages={{ [site]: dictionary }}>
        <Providers page={page}>
          <Layout page={page} />
        </Providers>
      </NextIntlClientProvider>
    );
  }

  return (
    <div style={{ padding: 10 }}>
      <h1>Page not found</h1>
      <p>This page does not exist.</p>
      <Link href="/">Go to the Home page</Link>
    </div>
  );
}
