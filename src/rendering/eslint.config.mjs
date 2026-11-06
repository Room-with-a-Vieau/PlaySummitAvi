import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      '@next/next/no-img-element': 'off', // Don't force next/image
      'jsx-a11y/alt-text': ['warn', { elements: ['img'] }], // Sitecore media supplies alt text for <Image/>
      '@typescript-eslint/no-empty-object-type': 'off',
      'jsx-quotes': ['error', 'prefer-double'],
      // Newer React Compiler rules flag patterns that predate them. Fix these separately.
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/static-components': 'warn',
      'react-hooks/immutability': 'warn',
    },
  },
  globalIgnores([
    'node_modules/**',
    '.next*/**',
    '.sitecore/**',
    'out/**',
    'build/**',
    'storybook-static/**',
    'next-env.d.ts',
    '**/*.js',
  ]),
]);
