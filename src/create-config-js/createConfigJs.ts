import type { Plugin } from '@eslint/core';
import eslint from '@eslint/js';
import type { Linter } from 'eslint';
import {
  type Config,
  defineConfig,
} from 'eslint/config';
import jsdoc from 'eslint-plugin-jsdoc';

import {
  DEFAULT_FILES_JS,
  DEFAULT_GLOBALS,
  DEFAULT_PLUGINS_JS,
  DEFAULT_RULES_JS,
  DEFAULT_RULES_SHARED,
} from '../constants/defaultConfig.js';

/** Options for {@link createConfigJs}. */
export interface CreateConfigJsOptions {
  /**
   * File globs to apply the lint configuration to.
   *
   * @defaultValue All `.js`, `.mjs`, `.cjs`, and `.jsx` files
   */
  files?: string[];

  /**
   * Node.js globals available in JavaScript and TypeScript files.
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
   * Additional plugin map for JS files. Entries with existing names override
   * the preset's plugins.
   *
   * @defaultValue The `import-x` and `@stylistic` plugins
   */
  plugins?: Record<string, Plugin>;

  /**
   * Rules that override same-named shared rules for JS files.
   *
   * @defaultValue Flag unused variables and arguments unless their names start with `_`
   */
  rules?: Linter.RulesRecord;
}

/**
 * Creates a flat config for JavaScript files with ESLint recommended,
 * JSDoc recommended, and shared stylistic rules.
 *
 * @param options - See {@link CreateConfigJsOptions}.
 */
export function createConfigJs({
  files = DEFAULT_FILES_JS,
  globals,
  ignores = [],
  plugins,
  rules,
}: CreateConfigJsOptions = {}): Config[] {
  return defineConfig([
    {
      name: 'preset/js',
      extends: [
        eslint.configs.recommended,
        jsdoc.configs['flat/recommended'],
      ],
      files,
      ignores,
      languageOptions: {
        globals: {
          ...DEFAULT_GLOBALS,
          ...globals,
        },
      },
      plugins: {
        ...DEFAULT_PLUGINS_JS,
        ...plugins,
      },
      rules: {
        ...DEFAULT_RULES_SHARED,
        ...DEFAULT_RULES_JS,
        ...rules,
      },
    },
  ]);
}
