const config = {
  testEnvironment: 'jsdom',
  transformIgnorePatterns: [
    '/node_modules\/(?!react-force-graph-2d)(.*)',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
};

export default config;
