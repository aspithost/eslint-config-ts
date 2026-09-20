# @abelspithost/eslint-config-ts

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=aspithost_eslint-config-ts&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=aspithost_eslint-config-ts)
![NPM Version](https://img.shields.io/npm/v/@abelspithost/eslint-config-ts)

A shared ESLint flat config for TypeScript projects, with JavaScript support.

Includes:

- ESLint recommended rules (TS and JS)
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
  tsconfigRootDir: import.meta.dirname,
});
export default eslintConfig;
```

### Custom options

All options are optional:

```ts
import globals from 'globals';
import { createConfig } from '@abelspithost/eslint-config-ts';

export default createConfig({
  files: ['src/**/*.ts', 'lib/**/*.ts'],
  jsFiles: ['scripts/**/*.js'],
  globals: { ...globals.browser, ...globals.node },
  globalIgnores: ['dist/**', 'node_modules/**'],
  ignores: ['**/*.generated.ts'],
  tsconfigRootDir: import.meta.dirname,
});
```

| Option            | Description                                                          |
| ----------------- | -------------------------------------------------------------------- |
| `files`           | Globs for TS files (strict, type-checked).                           |
| `jsFiles`         | Globs for JS files (not type-checked).                               |
| `globals`         | Globals for TS and JS files.                                         |
| `globalIgnores`   | Globs ignored by the entire ESLint run, including later configs.     |
| `ignores`         | Globs skipped by this preset only; other configs still lint them.    |
| `stylisticRules`  | Stylistic rules for TS and JS files.                                 |
| `tsRules`         | Extra rules for TS files, merged after `stylisticRules`.             |
| `jsRules`         | Extra rules for JS files, merged after `stylisticRules`.             |
| `tsconfigRootDir` | Root for resolving `tsconfig.json`; usually `import.meta.dirname`.   |

`files` and `jsFiles` should not overlap, since type-checked rules fail on JS files.

Rule options replace their defaults rather than merging with them. To extend the defaults, spread your own rules into a full set.

### Defaults

| Option            | Default                                          |
| ----------------- | ------------------------------------------------ |
| `files`           | `['**/*.{ts,mts,cts,tsx}']`                      |
| `jsFiles`         | `['**/*.{js,mjs,cjs,jsx}']`                      |
| `globals`         | `globals.node`                                   |
| `globalIgnores`   | `['**/build/**', '**/coverage/**', '**/dist/**']` |
| `ignores`         | `[]`                                             |
| `stylisticRules`  | See [`index.ts`](./index.ts)                     |
| `tsRules`         | `consistent-type-imports`, `no-unused-vars` (`^_`) |
| `jsRules`         | `no-unused-vars` (`^_`)                          |
| `tsconfigRootDir` | Not set                                          |
