module.exports = {
  restoreMocks: true,
  clearMocks: true,
  testMatch: ['**/*.integration.js', '**/?(*.)(spec).js?(x)'],
  verbose: true,
  testPathIgnorePatterns: [
    '/node_modules/',
    '/config/',
    '/logs/',
    '/client/',
  ],
  testURL: 'http://localhost',
};
