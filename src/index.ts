import { defineConfig, type Config } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';

export function createConfig({
  files = ['src/**/*.{js,ts}'],
  ignores = ['dist/**', 'node_modules/**'],
}: {
  files?: string[];
  ignores?: string[];
} = {}): Config[] {
  return defineConfig([
    {
      extends: [
        eslint.configs.recommended,
        tseslint.configs.strictTypeChecked,
        tseslint.configs.stylisticTypeChecked,
      ],
      files,
      ignores,
      plugins: {
        '@stylistic': stylistic,
      },
      languageOptions: {
        globals: globals.node,
        parserOptions: {
          projectService: true,
        },
      },
      rules: {
        '@stylistic/comma-dangle': ['error', {
          arrays: 'always-multiline',
          objects: 'always-multiline',
          imports: 'always-multiline',
          exports: 'always-multiline',
          functions: 'always-multiline',
        }],
        '@stylistic/eol-last': 'error',
        '@stylistic/indent': ['error', 2, { 'SwitchCase': 1 }],
        '@stylistic/no-trailing-spaces': 'error',
        '@stylistic/quotes': ['error', 'single'],
        '@stylistic/semi': 'error',
        '@typescript-eslint/consistent-type-imports': ['error', {
          prefer: 'type-imports',
          fixStyle: 'separate-type-imports',
        }],
        '@typescript-eslint/no-unused-vars': ['error', {
          varsIgnorePattern: '^_',
          argsIgnorePattern: '^_',
        }],
      },
    },
  ]);
}
