import type { Linter } from 'eslint';
import _globals from 'globals';

export const DEFAULT_FILES_JS = ['**/*.{js,mjs,cjs,jsx}'];
export const DEFAULT_FILES_TS = ['**/*.{ts,mts,cts,tsx}'];

export const DEFAULT_GLOBALS: Linter.Globals = _globals.node;
export const DEFAULT_GLOBAL_IGNORES = [
  '**/build/**',
  '**/coverage/**',
  '**/dist/**',
];

export const DEFAULT_RULES_STYLISTIC: Linter.RulesRecord = {
  '@stylistic/comma-dangle': ['error', 'always-multiline'],
  '@stylistic/eol-last': 'error',
  '@stylistic/max-len': ['error', { code: 100 }],
  '@stylistic/indent': ['error', 2, { 'SwitchCase': 1 }],
  '@stylistic/member-delimiter-style': ['error', {
    multiline: { delimiter: 'semi', requireLast: true },
    multilineDetection: 'brackets',
    singleline: { delimiter: 'semi', requireLast: false },
  }],
  '@stylistic/no-multi-spaces': 'error',
  '@stylistic/no-multiple-empty-lines': ['error', {
    max: 1,
    maxEOF: 0,
  }],
  '@stylistic/no-trailing-spaces': 'error',
  '@stylistic/no-whitespace-before-property': 'error',
  '@stylistic/object-curly-spacing': ['error', 'always'],
  '@stylistic/quotes': ['error', 'single'],
  '@stylistic/semi': ['error', 'always'],
};

export const DEFAULT_RULES_JS: Linter.RulesRecord = {
  'no-unused-vars': ['error', {
    varsIgnorePattern: '^_',
    argsIgnorePattern: '^_',
  }],
};

export const DEFAULT_RULES_TS: Linter.RulesRecord = {
  '@typescript-eslint/consistent-type-imports': ['error', {
    prefer: 'type-imports',
    fixStyle: 'separate-type-imports',
  }],
  '@typescript-eslint/no-unused-vars': ['error', {
    varsIgnorePattern: '^_',
    argsIgnorePattern: '^_',
  }],
};
