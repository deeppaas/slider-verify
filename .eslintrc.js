module.exports = {
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 13,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': ['warn', { extensions: ['.ts', '.tsx'] }],
    'react/function-component-definition': [
      'warn',
      { namedComponents: 'function-declaration' },
    ],
    'import/no-extraneous-dependencies': 0,
    'import/extensions': [
      'error',
      { ts: 'ignorePackages', tsx: 'ignorePackages' },
    ],
    'import/no-unresolved': 0,
    'import/prefer-default-export': ['warn'],
    'react/jsx-props-no-spreading': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'no-unused-vars': 'off',
    'react/jsx-no-bind': 'off',
  },
  env: {
    browser: true,
    node: true,
  },
}
