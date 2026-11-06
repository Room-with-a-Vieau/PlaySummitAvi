'use client';
import { useCallback } from 'react';
import { useMessages } from 'next-intl';

/**
 * Reads phrases from the Sitecore dictionary of the current site.
 * Returns an empty string for a missing phrase, so callers can use `t('key') || 'Fallback'`.
 */
export const useI18n = () => {
  const messages = useMessages() as Record<string, Record<string, string>>;
  const dictionary = Object.values(messages)[0];

  const t = useCallback((key: string): string => dictionary?.[key] ?? '', [dictionary]);

  return { t };
};
