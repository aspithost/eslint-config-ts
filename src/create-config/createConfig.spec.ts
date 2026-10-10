import { defineConfig, globalIgnores } from 'eslint/config';
import {
  describe, expect, it,
} from 'vitest';

import { createConfig } from './createConfig.js';

import { type CreateConfigJsOptions, createConfigJs } from '@/create-config-js/createConfigJs.js';
import { type CreateConfigTsOptions, createConfigTs } from '@/create-config-ts/createConfigTs.js';

vi.mock('@/create-config-js/createConfigJs.js', () => ({
  createConfigJs: vi.fn(() => []),
}));
vi.mock('@/create-config-ts/createConfigTs.js', () => ({
  createConfigTs: vi.fn(() => []),
}));

vi.mock('eslint/config', () => ({
  defineConfig: vi.fn(),
  globalIgnores: vi.fn(),
}));

const JS_CONFIG: CreateConfigJsOptions = {
  files: ['**/*.js'],
  plugins: {},
  rules: {},
};
const TS_CONFIG: CreateConfigTsOptions = {
  allowDefaultProject: ['*.some-file-name.ts'],
  files: ['**/*.ts'],
  tsconfigRootDir: 'some-dir',
};

describe('createConfig', () => {
  it('should define an eslint config', () => {
    createConfig();

    expect(vi.mocked(defineConfig)).toHaveBeenCalledTimes(1);
  });

  it('should set global ignores', () => {
    const GLOBAL_IGNORES = ['node_modules', 'dist'];
    createConfig({ globalIgnores: GLOBAL_IGNORES });

    expect(vi.mocked(defineConfig)).toHaveBeenCalledTimes(1);
    expect(vi.mocked(globalIgnores)).toHaveBeenCalledExactlyOnceWith(GLOBAL_IGNORES);
  });

  it('should create an eslint config for JS files', () => {
    createConfig({ js: JS_CONFIG });

    expect(vi.mocked(createConfigJs))
      .toHaveBeenCalledExactlyOnceWith(expect.objectContaining(JS_CONFIG));
  });

  it('should create an eslint config for TS files', () => {
    createConfig({ ts: TS_CONFIG });

    expect(vi.mocked(createConfigTs))
      .toHaveBeenCalledExactlyOnceWith(expect.objectContaining(TS_CONFIG));
  });
});
