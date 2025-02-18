import nextJest from 'next/jest';
import type { Config } from 'jest';

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig: Config = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!jest.config.ts',
    '!middleware.ts',
    '!next.config.ts',
    '!lib/http/**',
    '!lib/prisma.ts',
    '!lib/session.ts',
  ],
};

export default createJestConfig(customJestConfig);
