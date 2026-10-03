import type { Linter } from 'eslint';
import type { Plugin } from '@eslint/core';
import _globals from 'globals';
import stylistic from '@stylistic/eslint-plugin';
import { importX } from 'eslint-plugin-import-x';

export const DEFAULT_FILES_JS = ['**/*.{js,mjs,cjs,jsx}'];
export const DEFAULT_FILES_TS = ['**/*.{ts,mts,cts,tsx}'];

export const DEFAULT_GLOBALS: Linter.Globals = _globals.node;
export const DEFAULT_GLOBAL_IGNORES = [
  '**/build/**',
  '**/coverage/**',
  '**/dist/**',
];

const DEFAULT_RULES_ESLINT: Linter.RulesRecord = {
  'sort-imports': ['error', {
    'ignoreDeclarationSort': true,
  }],
};

const DEFAULT_RULES_IMPORT_X: Linter.RulesRecord = {
  'import-x/order': ['error', {
    'newlines-between': 'always',
  }],
};

export const DEFAULT_RULES_STYLISTIC: Linter.RulesRecord = {
  '@stylistic/array-bracket-newline': ['error', { minItems: 3 }],
  '@stylistic/array-element-newline': ['error', {
    consistent: true,
    minItems: 3,
  }],
  '@stylistic/comma-dangle': ['error', 'always-multiline'],
  '@stylistic/comma-spacing': ['error', {
    before: false,
    after: true,
  }],
  '@stylistic/eol-last': 'error',
  '@stylistic/max-len': ['error', { code: 100 }],
  '@stylistic/indent': [
    'error',
    2,
    { 'SwitchCase': 1 },
  ],
  '@stylistic/member-delimiter-style': ['error', {
    multiline: {
      delimiter: 'semi',
      requireLast: true,
    },
    multilineDetection: 'brackets',
    singleline: {
      delimiter: 'semi',
      requireLast: false,
    },
  }],
  '@stylistic/no-multi-spaces': 'error',
  '@stylistic/no-multiple-empty-lines': ['error', {
    max: 1,
    maxEOF: 0,
  }],
  '@stylistic/no-trailing-spaces': 'error',
  '@stylistic/no-whitespace-before-property': 'error',
  '@stylistic/object-curly-spacing': ['error', 'always'],
  '@stylistic/object-curly-newline': ['error', {
    ExportDeclaration: {
      minProperties: 3,
      multiline: true,
      consistent: true,
    },
    ImportDeclaration: {
      minProperties: 3,
      multiline: true,
      consistent: true,
    },
    ObjectExpression: {
      minProperties: 3,
      multiline: true,
      consistent: true,
    },
    ObjectPattern: {
      minProperties: 3,
      multiline: true,
      consistent: true,
    },
    TSEnumBody: {
      minProperties: 3,
      multiline: true,
      consistent: true,
    },
    TSInterfaceBody: {
      minProperties: 3,
      multiline: true,
      consistent: true,
    },
    TSTypeLiteral: {
      minProperties: 3,
      multiline: true,
      consistent: true,
    },
  }],
  '@stylistic/object-property-newline': ['error', {
    allowAllPropertiesOnSameLine: false,
  }],
  '@stylistic/quotes': ['error',
    'single'],
  '@stylistic/semi': ['error', 'always'],
};

const DEFAULT_RULES: Linter.RulesRecord = {
  ...DEFAULT_RULES_ESLINT,
  ...DEFAULT_RULES_IMPORT_X,
  ...DEFAULT_RULES_STYLISTIC,
};

export const DEFAULT_RULES_JS: Linter.RulesRecord = {
  ...DEFAULT_RULES,
  'no-unused-vars': ['error', {
    varsIgnorePattern: '^_',
    argsIgnorePattern: '^_',
  }],
};

export const DEFAULT_RULES_TS: Linter.RulesRecord = {
  ...DEFAULT_RULES,
  '@typescript-eslint/consistent-type-imports': ['error', {
    prefer: 'type-imports',
    fixStyle: 'separate-type-imports',
  }],
  '@typescript-eslint/no-unused-vars': ['error', {
    varsIgnorePattern: '^_',
    argsIgnorePattern: '^_',
  }],
};

const PLUGIN_IMPORT_X: Record<string, Plugin> = {
  'import-x': importX,
};
const PLUGIN_STYLISTIC: Record<string, Plugin> = {
  '@stylistic': stylistic,
};
export const DEFAULT_PLUGINS_JS: Record<string, Plugin> = {
  ...PLUGIN_STYLISTIC,
  ...PLUGIN_IMPORT_X,
};
export const DEFAULT_PLUGINS_TS: Record<string, Plugin> = {
  ...PLUGIN_STYLISTIC,
  ...PLUGIN_IMPORT_X,
};
