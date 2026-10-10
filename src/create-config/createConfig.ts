import type { Linter } from 'eslint';
import {
  type Config, globalIgnores as _globalIgnores, defineConfig,
} from 'eslint/config';

import {
  DEFAULT_GLOBALS,
  DEFAULT_GLOBAL_IGNORES,
} from '../constants/defaultConfig.js';
import { type CreateConfigJsOptions, createConfigJs } from '../create-config-js/createConfigJs.js';
import { type CreateConfigTsOptions, createConfigTs } from '../create-config-ts/createConfigTs.js';

/** Options for {@link createConfig}. */
export interface CreateConfigOptions {
  /**
   * Globs that this config and later configs ignore: `build`, `coverage`, and `dist` directories.
   *
   * @defaultValue `build`, `coverage`, and `dist` directories at any depth
   */
  globalIgnores?: string[];

  /**
   * Globals available in JavaScript and TypeScript files.
   *
   * @defaultValue Node.js globals
   */
  globals?: Linter.Globals;

  /**
   * Globs that the preset skips while other configs can still lint them; none by default.
   *
   * @defaultValue `[]`
   */
  ignores?: string[];

  /**
   * Options for the JavaScript preset, passed to {@link createConfigJs}.
   *
   * See {@link CreateConfigJsOptions} for the available options and their defaults.
   */
  js?: CreateConfigJsOptions;

  /**
   * Options for the TypeScript preset, passed to {@link createConfigTs}.
   *
   * See {@link CreateConfigTsOptions} for the available options and their defaults.
   */
  ts?: CreateConfigTsOptions;
}

/**
 * Creates a shared flat config: strict type-checked TS plus plain JS,
 * both with stylistic rules.
 *
 * @param options - See {@link CreateConfigOptions}.
 */
export function createConfig({
  globalIgnores = DEFAULT_GLOBAL_IGNORES,
  globals = DEFAULT_GLOBALS,
  ignores = [],
  js: {
    files: filesJs,
    plugins: pluginsJs,
    rules: rulesJs,
  } = {},
  ts: {
    allowDefaultProject,
    files: filesTs,
    plugins: pluginsTs,
    rules: rulesTs,
    tsconfigRootDir,
  } = {},
}: CreateConfigOptions = {}): Config[] {
  return defineConfig([
    _globalIgnores(globalIgnores),
    ...createConfigTs({
      allowDefaultProject,
      files: filesTs,
      globals,
      ignores,
      plugins: pluginsTs,
      rules: rulesTs,
      tsconfigRootDir,
    }),
    ...createConfigJs({
      files: filesJs,
      globals,
      ignores,
      plugins: pluginsJs,
      rules: rulesJs,
    }),
  ]);
}
