import type { Plugin } from '@eslint/core';
import eslint from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import type { Linter } from 'eslint';
import { globalIgnores as _globalIgnores, defineConfig, type Config } from 'eslint/config';
import tseslint from 'typescript-eslint';

import {
  DEFAULT_FILES_JS,
  DEFAULT_FILES_TS,
  DEFAULT_GLOBAL_IGNORES,
  DEFAULT_GLOBALS,
  DEFAULT_RULES_JS,
  DEFAULT_RULES_TS,
  DEFAULT_RULES_STYLISTIC,
} from '../constants/defaultConfig.js';

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

  /** Extra rules for JS files, merged after `stylisticRules`. @default DEFAULT_RULES_JS */
  rulesJs?: Linter.RulesRecord;

  /** Extra rules for TS files, merged after `stylisticRules`. @default DEFAULT_RULES_TS */
  rulesTs?: Linter.RulesRecord;

  /** Stylistic rules for TS and JS files. @default DEFAULT_RULES_STYLISTIC */
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
  filesJs = DEFAULT_FILES_JS,
  filesTs = DEFAULT_FILES_TS,
  globals = DEFAULT_GLOBALS,
  globalIgnores = DEFAULT_GLOBAL_IGNORES,
  ignores = [],
  pluginsJs,
  pluginsTs,
  rulesJs = DEFAULT_RULES_JS,
  rulesTs = DEFAULT_RULES_TS,
  stylisticRules = DEFAULT_RULES_STYLISTIC,
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
