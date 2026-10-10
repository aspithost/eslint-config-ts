import type { Plugin } from '@eslint/core';
import eslint from '@eslint/js';
import type { Linter } from 'eslint';
import {
  type Config,
  defineConfig,
} from 'eslint/config';
import tseslint from 'typescript-eslint';

import {
  DEFAULT_FILES_TS,
  DEFAULT_GLOBALS,
  DEFAULT_PLUGINS_TS,
  DEFAULT_RULES_SHARED,
  DEFAULT_RULES_TS,
} from '../constants/defaultConfig.js';

/** Options for {@link createConfigTs}. */
export interface CreateConfigTsOptions {
  /**
   * Extra globs for files outside `tsconfig.json`; the empty array adds none.
   *
   * @defaultValue `[]`
   */
  allowDefaultProject?: string[];

  /**
   * File globs to apply the strict, type-checked TypeScript lint configuration to.
   *
   * @defaultValue All `.ts`, `.mts`, `.cts`, and `.tsx` files
   */
  files?: string[];

  /**
   * Globals available in TypeScript files.
   *
   * @defaultValue Node.js globals
   */
  globals?: Linter.Globals;

  /**
   * Globs that this preset skips while other configs can still lint them; none by default.
   *
   * @defaultValue `[]`
   */
  ignores?: string[];

  /**
   * Additional plugins for TS files. Entries with existing names override
   * the preset's plugins.
   *
   * @defaultValue The `import-x`, `@stylistic`, and `tsdoc` plugins
   */
  plugins?: Record<string, Plugin>;

  /**
   * Rules that override same-named shared or TypeScript rules.
   *
   * @defaultValue Check TSDoc syntax, prefer type-only imports, and flag unused names
   */
  rules?: Linter.RulesRecord;

  /** Root for resolving `tsconfig.json`; usually `import.meta.dirname`. */
  tsconfigRootDir?: string;
}

/**
 * Creates a flat config for strict, type-checked TypeScript files with
 * ESLint recommended, strict type-checked, and stylistic type-checked rules.
 *
 * @param options - See {@link CreateConfigTsOptions}.
 */
export function createConfigTs({
  allowDefaultProject = [],
  files = DEFAULT_FILES_TS,
  globals = DEFAULT_GLOBALS,
  ignores = [],
  plugins,
  rules,
  tsconfigRootDir,
}: CreateConfigTsOptions = {}): Config[] {
  return defineConfig([
    {
      name: 'preset/ts',
      extends: [
        eslint.configs.recommended,
        tseslint.configs.strictTypeChecked,
        tseslint.configs.stylisticTypeChecked,
      ],
      files,
      ignores,
      plugins: {
        ...DEFAULT_PLUGINS_TS,
        ...plugins,
      },
      languageOptions: {
        globals: {
          ...DEFAULT_GLOBALS,
          ...globals,
        },
        parserOptions: {
          projectService: {
            allowDefaultProject,
          },
          tsconfigRootDir,
        },
      },
      rules: {
        ...DEFAULT_RULES_SHARED,
        ...DEFAULT_RULES_TS,
        ...rules,
      },
    },
  ]);
}
