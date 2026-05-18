# @abelspithost/eslint-config-ts

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=aspithost_eslint-config-ts&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=aspithost_eslint-config-ts)
![NPM Version](https://img.shields.io/npm/v/@abelspithost/eslint-config-ts)

A shared ESLint flat config for TypeScript projects.

Includes:

- ESLint recommended rules
- [typescript-eslint](https://typescript-eslint.io/) strict type-checked and stylistic type-checked rules via `projectService`
- Stylistic rules (quotes, trailing commas, semicolons, 2-space indent, etc.)
- Consistent type imports (`import type`)

## Installation

```bash
npm install -D @abelspithost/eslint-config-ts eslint typescript jiti
```

## Usage

Create an `eslint.config.ts` in your project root:

```ts
import type { Config } from 'eslint/config';
import { createConfig } from '@abelspithost/eslint-config-ts';

const eslintConfig: Config[] = createConfig();
export default eslintConfig;
```

### Custom options

You can override the default `files` and `ignores` patterns:

```ts
import { createConfig } from '@abelspithost/eslint-config-ts';

export default createConfig({
  files: ['src/**/*.ts', 'lib/**/*.ts'],
  globalIgnores: ["dist/**", "node_modules/**"]
  ignores: [],
});
```

### Defaults

| Option          | Default                            |
| --------------- | ---------------------------------- |
| `files`         | `['src/**/*.{js,ts}']`             |
| `globalIgnores` | `[dist/**", "node_modules/**"]`    |
| `ignores`       | `[]`                               |
