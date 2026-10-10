import type { LanguageOptions } from '@eslint/core';
import { defineConfig } from 'eslint/config';

import { createConfigTs } from './createConfigTs.js';

import {
  DEFAULT_FILES_TS,
  DEFAULT_GLOBALS,
  DEFAULT_PLUGINS_TS,
  DEFAULT_RULES_SHARED,
  DEFAULT_RULES_TS,
} from '@/constants/defaultConfig.js';

vi.mock('eslint/config', () => ({
  defineConfig: vi.fn(),
}));

describe('createConfigTs', () => {
  it('should create a config with default presets', () => {
    createConfigTs();

    expect(vi.mocked(defineConfig)).toHaveBeenCalledExactlyOnceWith([
      expect.objectContaining({
        name: 'preset/ts',
        files: DEFAULT_FILES_TS,
        languageOptions: expect.objectContaining({
          globals: DEFAULT_GLOBALS,
        }) as LanguageOptions,
        plugins: DEFAULT_PLUGINS_TS,
        rules: {
          ...DEFAULT_RULES_SHARED,
          ...DEFAULT_RULES_TS,
        },
      }),
    ]);
  });
});
