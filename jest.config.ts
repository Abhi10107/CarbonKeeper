import type { Config } from 'jest';

const config: Config = {
  projects: [
    '<rootDir>/packages/shared/jest.config.ts',
    '<rootDir>/apps/api/jest.config.ts',
    '<rootDir>/apps/web/jest.config.ts'
  ],
  collectCoverageFrom: [
    'packages/shared/src/**/*.{ts,tsx}',
    'apps/api/src/**/*.{ts,tsx}',
    'apps/web/src/**/*.{ts,tsx}',
    '!**/*.d.ts'
  ]
};

export default config;
