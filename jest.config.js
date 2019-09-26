const {defaults} = require('jest-config');
module.exports = {
  verbose: true,
  preset: 'react-native',
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'js', 'jsx'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/react-native/jest/preprocessor.js',
  },
  transformIgnorePatterns: ['node_modules/(?!react-native|react-navigation)'],
  globals: {
    window: {},
  },
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
    },
  },
  coveragePathIgnorePatterns: ['./tests/setupTests.tsx', 'index.js'],
  setupFiles: ['<rootDir>/tests/setupTests.js'],
};
