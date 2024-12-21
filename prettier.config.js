/** @type {import("prettier").Config} */
const config = {
  plugins: ['prettier-plugin-tailwindcss'],
  semi: false,
  singleQuote: true,
  quoteProps: 'as-needed',
  bracketSpacing: true,
  trailingComma: 'all',
  jsxSingleQuote: true,
  arrowParens: 'always',
  proseWrap: 'never',
}

module.exports = config
