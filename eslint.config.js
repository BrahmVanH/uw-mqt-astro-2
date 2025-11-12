import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import * as mdx from 'eslint';

export default [
  {
    ignores: ['node_modules/**', 'dist/**', '.astro/**', 'public/**']
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  },
  { ...mdx.flat }
];