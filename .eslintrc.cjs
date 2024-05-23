module.exports = {
  settings: {
    react: {
      version: 'detect'
    }
  },
  env: {
    jest: true,
    browser: true, 
    amd: true, 
    node: true 
  },
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended'
  ],
  rules: {
    'max-len': ['error', {
      code: 80,
      ignorePattern: '^\\s*<',
      ignoreComments: true 
    }],
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: false }],
    'prettier/prettier': ['error', {}, { usePrettierrc: true }] 
  }
}
