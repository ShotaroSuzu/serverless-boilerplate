import type { Config } from '@jest/types';
import baseConfig from './jest.config';

const config: Config.InitialOptions = {
  ...baseConfig,
  testMatch: ['**/__tests__/**/*.test.ts'],
  reporters: [
    'default',
    [
      'jest-stare',
      {
        resultDir: 'jest-stare/unit',
        coverageLink: '../../coverage/lcov-report/index.html',
        reportTitle: 'shelf server Unit Test',
        reportHeadline: 'shelf server Unit Test',
      },
    ],
  ],
};
export default config;
