import type { Config } from 'jest';

const config: Config = {
  displayName: 'api',
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  rootDir: '.',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^@carbonkeeper/shared$': '<rootDir>/../../packages/shared/src/index.ts',
    '^@carbonkeeper/shared/(.*)$': '<rootDir>/../../packages/shared/src/$1'
  },
  testMatch: ['<rootDir>/src/**/*.test.ts']
};

export default config;
