// eslint-disable-next-line no-undef
module.exports = {
  setupFiles: ['jest-canvas-mock', '<rootDir>/tests/setup.ts'],
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  transform: {
    '\\.m?jsx?$': [
      'babel-jest',
      {
        plugins: ['@babel/plugin-transform-modules-commonjs']
      }
    ],
    '\\.tsx?$': 'ts-jest'
  },
  transformIgnorePatterns: ['node_modules/(?!@ngrx|(?!deck.gl)|ng-dynamic)']
};
