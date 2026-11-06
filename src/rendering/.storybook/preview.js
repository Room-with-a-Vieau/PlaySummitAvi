import React from 'react';
import { LayoutServicePageState, SitecoreProvider } from '@sitecore-content-sdk/nextjs';
import { NextIntlClientProvider } from 'next-intl';
import components from '../.sitecore/component-map.client';
import scConfig from '../sitecore.config';
import '../src/assets/css/abstracts/mixins.css';
import '../src/assets/css/main.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
  nextjs: { appDirectory: true },
  breakpoints: {
    breakpointNames: {
      default: '0',
      sm: '640',
      md: '768',
      lg: '1024',
      xl: '1280',
      '2xl': '1536',
    },
    debounceTimeout: 200,
  },
};

export const mockLayoutData = {
  sitecore: {
    context: {
      pageEditing: false,
      pageState: LayoutServicePageState.Normal,
      Languages: [
        {
          Name: 'en',
        },
        {
          Name: 'en-US',
        },
        {
          Name: 'fr',
        },
        {
          Name: 'fr-CA',
        },
        {
          Name: 'es-ES',
        },
        {
          Name: 'ja-JP',
        },
      ],
    },
    setContext: () => {
      // nothing
    },
    route: {
      itemId: null,
    },
  },
};

const mockPage = {
  locale: 'en',
  siteName: 'playwebsite',
  mode: { name: 'normal', isNormal: true, isEditing: false, isPreview: false, isDesignLibrary: false },
  layout: mockLayoutData,
};

export const decorators = [
  (Story) => (
    <NextIntlClientProvider locale="en" messages={{}}>
      <SitecoreProvider api={scConfig.api} componentMap={components} page={mockPage}>
        <Story />
      </SitecoreProvider>
    </NextIntlClientProvider>
  ),
];
