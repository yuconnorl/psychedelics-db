module.exports = {
  root: true,
  extends: ['plugin:@next/next/recommended', '@payloadcms'],
  ignorePatterns: ['**/payload-types.ts', 'src/components/ui'],
  plugins: ['simple-import-sort'],
  rules: {
    'import/extensions': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'no-unused-vars': 'warn',
    'simple-import-sort/imports': 'error', // sorting imports
    'simple-import-sort/exports': 'error', // sorting exports
    'no-console': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
}
