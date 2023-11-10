module.exports = {
  root: true,
  extends: ['plugin:@next/next/recommended', '@payloadcms'],
  ignorePatterns: ['**/payload-types.ts'],
  rules: {
    'import/extensions': 'never',
    'no-unused-vars': 'warn',
  },
}
