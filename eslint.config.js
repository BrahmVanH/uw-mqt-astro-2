import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import mdx from 'eslint-plugin-mdx';

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
  {
    ...mdx.flat,
    processor: mdx.createRemarkProcessor({
      lintCodeBlocks: true,
    }),
  },
  {
    // Override the processor for `.mdx` files
    files: ['**/*.mdx'],
    ...mdx.flatCodeBlocks,
    rules: {
      // Add any MDX-specific rules here
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
];