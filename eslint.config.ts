import type { Config } from 'eslint/config';
import { createConfig } from './src/index.js';

const eslintConfig: Config[] = createConfig();
export default eslintConfig;