module.exports = {
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest"
  },
  transformIgnorePatterns: [
    "node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)"
  ]
};
