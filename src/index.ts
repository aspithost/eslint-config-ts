import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import type { Linter } from 'eslint';
import { globalIgnores as _globalIgnores, defineConfig, type Config } from 'eslint/config';
import _globals from 'globals';
import tseslint from 'typescript-eslint';

const DEFAULT_FILES = ['**/*.{ts,mts,cts,tsx}'];

const DEFAULT_GLOBALS: Linter.Globals = _globals.node;

const DEFAULT_GLOBAL_IGNORES = [
  '**/build/**',
  '**/coverage/**',
  '**/dist/**',
];

const DEFAULT_JS_FILES = ['**/*.{js,mjs,cjs,jsx}'];

const DEFAULT_JS_RULES: Linter.RulesRecord = {
  'no-unused-vars': ['error', {
    varsIgnorePattern: '^_',
    argsIgnorePattern: '^_',
  }],
};

const DEFAULT_STYLISTIC_RULES: Linter.RulesRecord = {
  '@stylistic/comma-dangle': ['error', 'always-multiline'],
  '@stylistic/eol-last': 'error',
  '@stylistic/indent': ['error', 2, { 'SwitchCase': 1 }],
  '@stylistic/no-multi-spaces': 'error',
  '@stylistic/no-multiple-empty-lines': ['error', {
    max: 1,
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
  /** Globs for TS files (strict, type-checked). @default DEFAULT_FILES */
  files?: string[];

  /** Globals for TS and JS files. @default DEFAULT_GLOBALS */
  globals?: Linter.Globals;

  /** Globs ignored by the entire ESLint run, including later configs. @default DEFAULT_GLOBAL_IGNORES */
  globalIgnores?: string[];

  /** Globs skipped by this preset only; other configs still lint them. @default [] */
  ignores?: string[];

  /** Extra rules for JS files, merged after `stylisticRules`. @default DEFAULT_JS_RULES */
  jsRules?: Linter.RulesRecord;

  /** Globs for JS files (non-type-checked). @default DEFAULT_JS_FILES */
  jsFiles?: string[];

  /** Stylistic rules for TS and JS files. @default DEFAULT_STYLISTIC_RULES */
  stylisticRules?: Linter.RulesRecord;

  /** Root for resolving `tsconfig.json`; usually `import.meta.dirname`. */
  tsconfigRootDir?: string;

  /** Extra rules for TS files, merged after `stylisticRules`. @default DEFAULT_TS_RULES */
  tsRules?: Linter.RulesRecord;
}

/**
 * Creates a shared flat config: strict type-checked TS plus plain JS,
 * both with stylistic rules.
 *
 * @param options - See {@link CreateConfigOptions}.
 */
export function createConfig({
  files = DEFAULT_FILES,
  globals = DEFAULT_GLOBALS,
  globalIgnores = DEFAULT_GLOBAL_IGNORES,
  ignores = [],
  jsFiles = DEFAULT_JS_FILES,
  jsRules = DEFAULT_JS_RULES,
  stylisticRules = DEFAULT_STYLISTIC_RULES,
  tsconfigRootDir,
  tsRules = DEFAULT_TS_RULES,
}: CreateConfigOptions = {}): Config[] {
  const plugins = { '@stylistic': stylistic };

  return defineConfig([
    _globalIgnores(globalIgnores),
    {
      name: 'preset/ts',
      extends: [
        eslint.configs.recommended,
        tseslint.configs.strictTypeChecked,
        tseslint.configs.stylisticTypeChecked,
      ],
      files,
      ignores,
      plugins,
      languageOptions: {
        globals,
        parserOptions: {
          projectService: true,
          tsconfigRootDir,
        },
      },
      rules: {
        ...stylisticRules,
        ...tsRules,
      },
    },
    {
      name: 'preset/js',
      extends: [eslint.configs.recommended],
      files: jsFiles,
      ignores,
      plugins,
      languageOptions: { globals },
      rules: {
        ...stylisticRules,
        ...jsRules,
      },
    },
  ]);
}
