import { describe, expect, it } from 'vitest';
import { createConfig } from './createConfig.js';

describe('createConfig', () => {
  it('should return a configuration array with default presets', () => {
    const config = createConfig();

    expect(Array.isArray(config)).toBe(true);
    expect(config.length).toBeGreaterThan(0);
    expect(config.some((c) => c.name?.startsWith('preset/ts'))).toBe(true);
    expect(config.some((c) => c.name?.startsWith('preset/js'))).toBe(true);
  });

  it('should accept user provided parameters', () => {
    const config = createConfig({
      allowDefaultProject: ['*.config.ts'],
      files: ['src/**/*.ts'],
      globals: { myGlobal: 'readonly' },
      globalIgnores: ['**/out/**'],
      ignores: ['**/legacy/**'],
      jsFiles: ['scripts/**/*.js'],
      jsRules: { 'no-console': 'warn' },
      stylisticRules: { '@stylistic/semi': ['error', 'never'] },
      tsconfigRootDir: '/tmp',
      tsRules: { '@typescript-eslint/no-explicit-any': 'off' },
    });

    expect(config.length).toBeGreaterThan(0);
  });
});
