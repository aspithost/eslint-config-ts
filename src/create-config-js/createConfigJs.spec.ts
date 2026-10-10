import { defineConfig } from 'eslint/config';

import { createConfigJs } from './createConfigJs.js';

import {
  DEFAULT_FILES_JS, DEFAULT_GLOBALS, DEFAULT_PLUGINS_JS, DEFAULT_RULES_JS, DEFAULT_RULES_SHARED,
} from '@/constants/defaultConfig.js';

vi.mock('eslint/config', () => ({
  defineConfig: vi.fn(),
}));

describe('createConfigJs', () => {
  it('should create a config with default presets', () => {
    createConfigJs();

    expect(vi.mocked(defineConfig)).toHaveBeenCalledExactlyOnceWith([
      expect.objectContaining({
        name: 'preset/js',
        files: DEFAULT_FILES_JS,
        languageOptions: {
          globals: DEFAULT_GLOBALS,
        },
        plugins: DEFAULT_PLUGINS_JS,
        rules: {
          ...DEFAULT_RULES_SHARED,
          ...DEFAULT_RULES_JS,
        },
      }),
    ]);
  });
});
