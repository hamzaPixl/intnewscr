module.exports = {
  restoreMocks: true,
  testMatch: ['**/?(*.)(spec).js?(x)'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/config/',
    '/logs/',
  ],
  testURL: 'http://localhost',
};
