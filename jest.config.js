const jestTsConfigPathMapper = require('./jest-tsconfig-path-mapper');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  moduleNameMapper: jestTsConfigPathMapper(),
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
