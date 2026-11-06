'use client';
import { PropsWithChildren } from 'react';
import { LayoutServicePageState, Page, SitecoreProvider } from '@sitecore-content-sdk/nextjs';
import scConfig from 'sitecore.config';
import components from '.sitecore/component-map.client';

// Routes outside Sitecore reuse Sitecore components, which read the page from context.
const standalonePage = {
  locale: scConfig.defaultLanguage,
  siteName: scConfig.defaultSite,
  mode: {
    name: 'normal',
    isNormal: true,
    isEditing: false,
    isPreview: false,
    isDesignLibrary: false,
  },
  layout: {
    sitecore: {
      context: { pageEditing: false, pageState: LayoutServicePageState.Normal },
      route: null,
    },
  },
} as unknown as Page;

const StandaloneProviders = ({ children }: PropsWithChildren): React.JSX.Element => (
  <SitecoreProvider api={scConfig.api} componentMap={components} page={standalonePage}>
    {children}
  </SitecoreProvider>
);

export default StandaloneProviders;
