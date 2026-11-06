'use client';
import { PropsWithChildren, useEffect } from 'react';
import { PageController, WidgetsProvider } from '@sitecore-search/react';
import { SendScripts } from './services/SendService';
import { identifyVisitor } from './services/IdentificationService';
import { isSearchSDKEnabled, config as searchSDKConfig } from './services/SearchSDKService';

/**
 * Browser integrations shared by every route.
 */
const GlobalClient = ({ children }: PropsWithChildren): React.JSX.Element => {
  useEffect(() => {
    // Identify the visitor from the email query string value of email links
    const email = new URLSearchParams(window.location.search).get('email');
    if (email) {
      identifyVisitor(email);
    }
  }, []);

  useEffect(() => {
    if (isSearchSDKEnabled) {
      PageController.getContext().setLocaleLanguage('en');
      PageController.getContext().setLocaleCountry('us');
    }
  }, []);

  return (
    <>
      {/* This script must render before the page so calls on first page load succeed. */}
      {SendScripts}
      {isSearchSDKEnabled ? (
        <WidgetsProvider {...searchSDKConfig}>{children}</WidgetsProvider>
      ) : (
        children
      )}
    </>
  );
};

export default GlobalClient;
