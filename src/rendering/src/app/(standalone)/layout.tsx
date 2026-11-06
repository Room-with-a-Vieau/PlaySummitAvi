import { Suspense } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import StandaloneProviders from 'src/StandaloneProviders';

/**
 * Routes that are not Sitecore pages. src/proxy.ts excludes them from site and locale rewrites.
 */
export default function StandaloneLayout({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider locale="en" messages={{}}>
      <StandaloneProviders>
        <Suspense>{children}</Suspense>
      </StandaloneProviders>
    </NextIntlClientProvider>
  );
}
