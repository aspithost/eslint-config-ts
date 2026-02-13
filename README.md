# @abelspithost/eslint-config-ts

A shared ESLint flat config for TypeScript projects.

Includes:

- ESLint recommended rules
- [typescript-eslint](https://typescript-eslint.io/) recommended rules with type-aware linting via `projectService`
- Stylistic rules (trailing commas, semicolons, 2-space indent, etc.)

## Installation

```bash
npm install -D @abelspithost/eslint-config-ts-ts eslint jiti typescript
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
  ignores: ['dist/**', 'build/**'],
});
```

### Defaults

| Option    | Default                            |
| --------- | ---------------------------------- |
| `files`   | `['src/**/*.{js,ts}']`            |
| `ignores` | `['dist/**', 'node_modules/**']`  |
