/**
 * Returns the public URL of this website.
 */
export const getPublicUrl = (): string =>
  process.env.NEXT_PUBLIC_PUBLIC_URL ||
  (typeof window !== 'undefined' ? window.location.origin : '');

/**
 * Returns the prefix for assets in /public. Empty unless a public URL is configured.
 */
export const getPublicAssetUrl = (): string => process.env.NEXT_PUBLIC_PUBLIC_URL || '';
