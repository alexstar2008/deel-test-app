module.exports = {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',

  coveragePathIgnorePatterns: ['/node_modules/'],

  coverageProvider: 'v8',

  coverageReporters: ['json', 'text', 'lcov', 'clover'],

  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],

  testPathIgnorePatterns: ['/node_modules/', 'config'],
};
