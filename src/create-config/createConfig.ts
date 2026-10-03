import type { Plugin } from '@eslint/core';
import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import type { Linter } from 'eslint';
import { globalIgnores as _globalIgnores, defineConfig, type Config } from 'eslint/config';
import _globals from 'globals';
import tseslint from 'typescript-eslint';

const DEFAULT_GLOBALS: Linter.Globals = _globals.node;

const DEFAULT_GLOBAL_IGNORES = [
  '**/build/**',
  '**/coverage/**',
  '**/dist/**',
];

const DEFAULT_FILES_JS = ['**/*.{js,mjs,cjs,jsx}'];
const DEFAULT_FILE_TS = ['**/*.{ts,mts,cts,tsx}'];

const DEFAULT_JS_RULES: Linter.RulesRecord = {
  'no-unused-vars': ['error', {
    varsIgnorePattern: '^_',
    argsIgnorePattern: '^_',
  }],
};

const DEFAULT_STYLISTIC_RULES: Linter.RulesRecord = {
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

const DEFAULT_TS_RULES: Linter.RulesRecord = {
  '@typescript-eslint/consistent-type-imports': ['error', {
    prefer: 'type-imports',
    fixStyle: 'separate-type-imports',
  }],
  '@typescript-eslint/no-unused-vars': ['error', {
    varsIgnorePattern: '^_',
    argsIgnorePattern: '^_',
  }],
};

/** Options for {@link createConfig}. */
export interface CreateConfigOptions {
  /** Globs for allowing the default project in TypeScript ESLint. @default [] */
  allowDefaultProject?: string[];

  /** Globs for JS files (non-type-checked). @default DEFAULT_JS_FILES */
  filesJs?: string[];

  /** Globs for TS files (strict, type-checked). @default DEFAULT_FILES */
  filesTs?: string[];

  /** Globals for TS and JS files. @default DEFAULT_GLOBALS */
  globals?: Linter.Globals;

  /** Globs ignored by the entire ESLint run, including later configs.
   * @default DEFAULT_GLOBAL_IGNORES
   * */
  globalIgnores?: string[];

  /** Globs skipped by this preset only; other configs still lint them. @default [] */
  ignores?: string[];

  /** Extra plugins for JS files. Merged after the default plugins. */
  pluginsJs?: Record<string, Plugin>;

  /** Extra plugins for TS files. Merged after the default plugins. */
  pluginsTs?: Record<string, Plugin>;

  /** Extra rules for JS files, merged after `stylisticRules`. @default DEFAULT_JS_RULES */
  rulesJs?: Linter.RulesRecord;

  /** Extra rules for TS files, merged after `stylisticRules`. @default DEFAULT_TS_RULES */
  rulesTs?: Linter.RulesRecord;

  /** Stylistic rules for TS and JS files. @default DEFAULT_STYLISTIC_RULES */
  stylisticRules?: Linter.RulesRecord;

  /** Root for resolving `tsconfig.json`; usually `import.meta.dirname`. */
  tsconfigRootDir?: string;
}

/**
 * Creates a shared flat config: strict type-checked TS plus plain JS,
 * both with stylistic rules.
 *
 * @param options - See {@link CreateConfigOptions}.
 */
export function createConfig({
  allowDefaultProject = [],
  filesTs = DEFAULT_FILE_TS,
  filesJs = DEFAULT_FILES_JS,
  globals = DEFAULT_GLOBALS,
  globalIgnores = DEFAULT_GLOBAL_IGNORES,
  ignores = [],
  pluginsJs,
  pluginsTs,
  rulesJs = DEFAULT_JS_RULES,
  rulesTs = DEFAULT_TS_RULES,
  stylisticRules = DEFAULT_STYLISTIC_RULES,
  tsconfigRootDir,
}: CreateConfigOptions = {}): Config[] {
  return defineConfig([
    _globalIgnores(globalIgnores),
    {
      name: 'preset/ts',
      extends: [
        eslint.configs.recommended,
        tseslint.configs.strictTypeChecked,
        tseslint.configs.stylisticTypeChecked,
      ],
      files: filesTs,
      ignores,
      plugins: {
        '@stylistic': stylistic,
        ...pluginsTs,
      },
      languageOptions: {
        globals,
        parserOptions: {
          projectService: {
            allowDefaultProject,
          },
          tsconfigRootDir,
        },
      },
      rules: {
        ...stylisticRules,
        ...rulesTs,
      },
    },
    {
      name: 'preset/js',
      extends: [eslint.configs.recommended],
      files: filesJs,
      ignores,
      plugins: {
        '@stylistic': stylistic,
        ...pluginsJs,
      },
      languageOptions: { globals },
      rules: {
        ...stylisticRules,
        ...rulesJs,
      },
    },
  ]);
}
