'use client';
import { useEffect } from 'react';
import { useSitecore } from '@sitecore-content-sdk/nextjs';
import { usePathname } from 'next/navigation';
import { PageController, trackEntityPageViewEvent } from '@sitecore-search/react';
import { initialize as initializeSend, trackViewEvent } from './services/SendService';
import { fetchUserProfileData, isSearchSDKEnabled } from './services/SearchSDKService';
import { logSearchProfileData } from './services/EventsService';

/**
 * Browser side effects of a Sitecore page: page language, Send, page view and Search tracking.
 */
const PageEffects = (): null => {
  const { page } = useSitecore();
  const { route, context } = page.layout.sitecore;
  const pageUri = usePathname();

  useEffect(() => {
    if (context.language) {
      document.documentElement.lang = context.language;
    }
  }, [context.language]);

  useEffect(() => {
    initializeSend(context.pageState);
  }, [context.pageState]);

  useEffect(() => {
    trackViewEvent();
  }, [route]);

  const itemId = route?.itemId;
  useEffect(() => {
    if (!isSearchSDKEnabled || !itemId) {
      return;
    }

    (async () => {
      PageController.getContext().setPageUri(pageUri);
      await trackEntityPageViewEvent('content', { items: [{ id: itemId }] });

      // Search API does not return custom attributes, so keep the page URI for later lookups
      sessionStorage.setItem(itemId, pageUri);

      const userProfileData = await fetchUserProfileData();
      logSearchProfileData(userProfileData);
    })();
  }, [pageUri, itemId]);

  return null;
};

export default PageEffects;
