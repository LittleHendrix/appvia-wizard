const { defaults } = require('jest-config');

module.exports = {
    verbose: true,
    testRegex: 'src/.*\\.(test|spec).(js|jsx)$',
    coverageDirectory: '<rootDir>/src/test/coverage',
    coverageThreshold: {
      global: {
        branches: 50,
        functions: 50,
        lines: 50,
        statements: 50
      }
    },
    coveragePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/'],
    setupFilesAfterEnv: ['<rootDir>/src/test/setupTests'],
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'js', 'jsx'],
  };