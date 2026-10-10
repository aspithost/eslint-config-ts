# @abelspithost/eslint-config-ts

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=aspithost_eslint-config-ts&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=aspithost_eslint-config-ts)
![NPM Version](https://img.shields.io/npm/v/@abelspithost/eslint-config-ts)

A shared ESLint flat config for TypeScript projects, with JavaScript support.

Includes:

- ESLint recommended rules (TS and JS)
- [eslint-plugin-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc) recommended rules for JS files
- [typescript-eslint](https://typescript-eslint.io/) strict type-checked and stylistic type-checked rules for TS files, via `projectService`
- Stylistic rules for TS and JS files (quotes, trailing commas, semicolons, 2-space indent, etc.)
- Consistent type imports (`import type`) in TS files
- Unused variables and arguments allowed when prefixed with `_`

JS files are linted without type information.

## Installation

```bash
npm install -D @abelspithost/eslint-config-ts eslint typescript jiti
```

## Usage

Create an `eslint.config.ts` in your project root:

```ts
import type { Config } from 'eslint/config';
import { createConfig } from '@abelspithost/eslint-config-ts';

const eslintConfig: Config[] = createConfig({
  ts: {
    tsconfigRootDir: import.meta.dirname,
  },
});
export default eslintConfig;
```

### Custom options

All options are optional:

```ts
import globals from 'globals';
import { createConfig } from '@abelspithost/eslint-config-ts';

export default createConfig({
  globals: { ...globals.browser, ...globals.node },
  globalIgnores: ['dist/**', 'node_modules/**'],
  ignores: ['**/*.generated.ts'],
  js: {
    files: ['scripts/**/*.js'],
  },
  ts: {
    allowDefaultProject: ['*.config.ts'],
    files: ['src/**/*.ts', 'lib/**/*.ts'],
    tsconfigRootDir: import.meta.dirname,
  },
});
```

| Option                | Description                                                          |
| --------------------- | -------------------------------------------------------------------- |
| `globalIgnores`       | Globs ignored by the entire ESLint run, including later configs.     |
| `globals`             | Globals for TS and JS files.                                         |
| `ignores`             | Globs skipped by this preset only; other configs can still lint them. |
| `js.files`            | Globs for JS files (not type-checked).                               |
| `js.plugins`          | Additional JS plugins; same-named plugins override preset plugins.  |
| `js.rules`            | Rules for JS files; same-named rules override defaults.              |
| `ts.allowDefaultProject` | Extra TS file globs outside `tsconfig.json` to include in project service. |
| `ts.files`            | Globs for TS files (strict, type-checked).                            |
| `ts.plugins`          | Additional TS plugins; same-named plugins override preset plugins.   |
| `ts.rules`            | Rules for TS files; same-named rules override defaults.              |
| `ts.tsconfigRootDir`  | Root for resolving `tsconfig.json`; usually `import.meta.dirname`.   |

`ts.files` and `js.files` should not overlap, since type-checked rules fail on JS files.

Rule maps are merged with the defaults; a user-provided entry overrides the same-named default. Plugin maps are also merged with preset plugins; a user-provided plugin with the same name overrides the default.

### Defaults

| Option                   | Default                                           |
| ------------------------ | ------------------------------------------------- |
| `globalIgnores`          | `['**/build/**', '**/coverage/**', '**/dist/**']` |
| `globals`                | `globals.node`                                    |
| `ignores`                | `[]`                                              |
| `js.files`               | `['**/*.{js,mjs,cjs,jsx}']`                       |
| `js.plugins`             | `import-x` and `@stylistic`                       |
| `js.rules`               | `no-unused-vars` (`^_` names are allowed)         |
| `ts.allowDefaultProject` | `[]`                                              |
| `ts.files`               | `['**/*.{ts,mts,cts,tsx}']`                       |
| `ts.plugins`             | `import-x`, `@stylistic`, and `tsdoc`             |
| `ts.rules`               | TSDoc syntax, type-only imports, and unused-name checks |
| `ts.tsconfigRootDir`     | Not set                                           |
