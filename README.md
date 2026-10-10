# @abelspithost/eslint-config-ts

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=aspithost_eslint-config-ts&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=aspithost_eslint-config-ts)
![NPM Version](https://img.shields.io/npm/v/@abelspithost/eslint-config-ts)

A shared ESLint flat config for TypeScript projects, with JavaScript support.

Includes:

- ESLint recommended rules (TS and JS)
- [eslint-plugin-jsdoc](https://github.com/gajus/eslint-plugin-jsdoc) recommended rules for JS files
- [typescript-eslint](https://typescript-eslint.io/) strict and stylistic rules that use TypeScript type information, via `projectService`
- Stylistic rules for TS and JS files (quotes, trailing commas, semicolons, 2-space indent, etc.)
- Consistent type imports (`import type`) in TS files
- Unused variables and arguments whose names start with `_` pass the unused-name checks

This ESLint preset checks JS files without type information.

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

This repo also exports `createConfigJs` and `createConfigTs` directly, so you can use either of them if you want only a JS or TS config.

### Custom options

You can specify optional options:

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
| `globalIgnores`       | Globs that make ESLint and later configs ignore matching files.      |
| `globals`             | Additional globals for TS and JS files; `createConfig` adds them to Node.js globals. |
| `ignores`             | Globs that this preset skips while other configs can still lint matching files. |
| `js.files`            | Globs for JS files; ESLint applies no type-aware rules to them.      |
| `js.plugins`          | Additional JS plugins; same-named plugins override preset plugins.  |
| `js.rules`            | Rules for JS files; same-named rules override defaults.              |
| `ts.allowDefaultProject` | Extra TS file globs outside `tsconfig.json` to include in project service. |
| `ts.files`            | Globs for TS files; strict rules use TypeScript type information.     |
| `ts.plugins`          | Additional TS plugins; same-named plugins override preset plugins.   |
| `ts.rules`            | Rules for TS files; same-named rules override defaults.              |
| `ts.tsconfigRootDir`  | Root for resolving `tsconfig.json`; usually `import.meta.dirname`.   |

Keep `ts.files` and `js.files` separate; type-aware rules fail on JS files.

`createConfig` combines each rule map with its defaults; user-provided entries override same-named defaults. It also combines plugin maps with preset plugins; user-provided plugins override same-named defaults.

### Defaults

| Option                   | Default                                           |
| ------------------------ | ------------------------------------------------- |
| `globalIgnores`          | `['**/build/**', '**/coverage/**', '**/dist/**']` |
| `globals`                | `globals.node`                                    |
| `ignores`                | `[]`                                              |
| `js.files`               | `['**/*.{js,mjs,cjs,jsx}']`                       |
| `js.plugins`             | `import-x` and `@stylistic`                       |
| `js.rules`               | `no-unused-vars` ignores names that start with `_` |
| `ts.allowDefaultProject` | `[]`                                              |
| `ts.files`               | `['**/*.{ts,mts,cts,tsx}']`                       |
| `ts.plugins`             | `import-x`, `@stylistic`, and `tsdoc`             |
| `ts.rules`               | TSDoc syntax, type-only imports, and unused-name checks |
| `ts.tsconfigRootDir`     | None                                              |
