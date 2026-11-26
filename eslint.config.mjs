import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const config = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'public/**',
      'scratch/**',
      'supabase/**',
      '*.py',
      '*.mjs',
      'src/services/telegram/**',
    ],
  },
];

export default config;
