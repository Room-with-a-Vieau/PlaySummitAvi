import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const sitecoreApiHost = process.env.SITECORE_API_HOST;

const nextConfig: NextConfig = {
  // Allow specifying a distinct distDir when running the app in a container
  distDir: process.env.NEXTJS_DIST_DIR || '.next',

  reactStrictMode: true,

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'edge*.**', port: '' },
      { protocol: 'https', hostname: 'xmc-*.**', port: '' },
      { protocol: 'https', hostname: 'feaas*.blob.core.windows.net', port: '' },
    ],
  },

  rewrites: async () => [
    { source: '/healthz', destination: '/api/healthz' },
    { source: '/sitemap:id([\\w-]{0,}).xml', destination: '/api/sitemap', locale: false },
    { source: '/robots.txt', destination: '/api/robots', locale: false },
    { source: '/llms.txt', destination: '/api/llms-txt', locale: false },
    // Local containers only: proxy Sitecore paths to the CM instance
    ...(sitecoreApiHost
      ? [
          { source: '/sitecore/api/:path*', destination: `${sitecoreApiHost}/sitecore/api/:path*` },
          { source: '/-/:path*', destination: `${sitecoreApiHost}/-/:path*` },
          {
            source: '/sitecore/service/:path*',
            destination: `${sitecoreApiHost}/sitecore/service/:path*`,
          },
        ]
      : []),
  ],
};

export default createNextIntlPlugin()(nextConfig);
