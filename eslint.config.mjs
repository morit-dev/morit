// @ts-check

import js from '@eslint/js';
import perfectionist from 'eslint-plugin-perfectionist'
import ts from 'typescript-eslint';
import prettier from 'eslint-plugin-prettier';

export default ts.config({
  files: ['packages/**/*.ts'],
  extends: [
    js.configs.recommended,
    ...ts.configs.recommended,
    {
      plugins: {
        prettier,
      },
      rules: {
        'prettier/prettier': ['error', {
          singleQuote: true,
          semi: true,
          tabWidth: 2,
          useTabs: false,
          trailingComma: 'all',
          printWidth: 80,
          arrowParens: 'always',
        }],
      }
    },
    {
      plugins: {
        perfectionist,
      },
      rules: {
        'perfectionist/sort-classes': [
          'error',
          {
            type: 'natural',
            order: 'asc',
            groups: [
              'index-signature',
              'static-property',
              'static-block',
              ['protected-property', 'protected-accessor-property'],
              ['private-property', 'private-accessor-property'],
              ['property', 'accessor-property'],
              'constructor',
              'static-method',
              'protected-method',
              'private-method',
              'method',
              ['get-method', 'set-method'],
              'unknown',
            ]
          },
        ],
        // 'perfectionist/sort-imports': [
        //   'error',
        //   {
        //     groups: [
        //       'type-import',
        //       ['value-builtin', 'value-external'],
        //       'type-internal',
        //       'value-internal',
        //       ['type-parent', 'type-sibling', 'type-index'],
        //       ['value-parent', 'value-sibling', 'value-index'],
        //       'ts-equals-import',
        //       'unknown',
        //     ],
        //     'newlines-between': 1,
        //     'internal-pattern': ['^~/.+', '^@/.+'],
        //   },
        // ],
      },
    }
  ],
})

