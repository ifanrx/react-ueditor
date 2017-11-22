module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: ['standard', 'standard-react'],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true,
    ecmaFeatures: {
      jsx: true
    },
  },
  plugins: [
    'react',
    'xss',
  ],
  rules: {
    'react/display-name': 0,
    'react/prop-types': 0,
    'camelcase': 0,
    'eqeqeq': 0,
    'max-len': ['error', 120],
    'comma-dangle': ['error', 'always-multiline'],
    'space-before-function-paren': ['error', 'never'],
    'object-curly-spacing': ['error', 'never'],
    'arrow-parens': ['error', 'as-needed'],
    indent: ['error', 2],
    quotes: ['error', 'single'],
    'no-console': 0,
  },
};
