module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  ignorePatterns: ['vite-env.d.ts'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname
  },
  plugins: [
    'react'
  ],
  rules: {
    '@typescript-eslint/restrict-plus-operands': 0,
    'react/react-in-jsx-scope': 0,
    '@typescript-eslint/explicit-function-return-type': 0
  }
}
