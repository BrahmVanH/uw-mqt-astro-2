// eslint.config.js
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import sveltePlugin from 'eslint-plugin-svelte';
import tailwindPlugin from 'eslint-plugin-tailwindcss';
import astroPlugin from 'eslint-plugin-astro';

export default [
  // Ignore patterns (replaces .eslintignore)
  {
    ignores: [
      'node_modules/**',
      'dist/**',
      '.astro/**',
      '.svelte-kit/**',
      'build/**',
      'public/**',
      '**/*.min.js',
      '**/*.config.js',
      '**/*.config.cjs',
      'vite.config.ts'
    ]
  },
  
  // Base configurations
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  
  // Global formatting rules for all files
  {
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'error',
      'semi': ['error', 'always'],
      'quotes': ['error', 'single', { 'avoidEscape': true }],
      'indent': ['error', 2],
      'comma-dangle': ['error', 'always-multiline'],
      'object-curly-spacing': ['error', 'always']
    },
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    }
  },
  
  // TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx'],
    ...tseslint.configs.recommended,
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn'
    }
  },
  
  // React files
  {
    files: ['**/*.jsx', '**/*.tsx'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react/jsx-indent': ['error', 2],
      'react/jsx-indent-props': ['error', 2],
      'react/jsx-max-props-per-line': ['error', { maximum: { single: 3, multi: 1 } }]
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  },
  
  // Svelte files
  {
    files: ['**/*.svelte'],
    plugins: {
      svelte: sveltePlugin
    },
    processor: sveltePlugin.processors.svelte,
    rules: {
      ...sveltePlugin.configs.recommended.rules,
      'svelte/indent': ['error', { indent: 2 }],
      'svelte/max-attributes-per-line': ['error', { multiline: 1 }],
      'svelte/first-attribute-linebreak': ['error', { multiline: 'below' }],
      'svelte/no-at-html-tags': 'warn',
      'svelte/shorthand-attribute': ['error', { prefer: 'always' }]
    },
    languageOptions: {
      parser: sveltePlugin.parser
    }
  },
  
  // Astro files
  {
    files: ['**/*.astro'],
    plugins: {
      astro: astroPlugin
    },
    processor: astroPlugin.processors.astro,
    rules: {
      ...astroPlugin.configs.recommended.rules,
      'astro/no-conflict-set-directives': 'error',
      'astro/no-unused-define-vars-in-style': 'error'
    },
    languageOptions: {
      parser: astroPlugin.parser
    }
  },
  
  // Tailwind CSS
  {
    plugins: {
      tailwindcss: tailwindPlugin
    },
    rules: {
      ...tailwindPlugin.configs.recommended.rules,
      'tailwindcss/no-custom-classname': 'warn'
    },
    settings: {
      tailwindcss: {
        config: './tailwind.config.js',
        tags: ['tw', 'class', 'className']
      }
    }
  }
];