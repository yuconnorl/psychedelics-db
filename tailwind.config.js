/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  darkMode: ['class'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
        'button-gradient': {
          '0%': { backgroundPosition: '0% 0%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 100%' },
        },
        'jump-mod': {
          '0%, 100%': { transform: 'scale(100%)' },
          '10%': { transform: 'scale(90%)' },
          '50%': { transform: 'scale(110%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 400ms cubic-bezier(0.42, 0, 0, 1.00)',
        'accordion-up': 'accordion-up 400ms cubic-bezier(0.42, 0, 0, 1.00)',
        'button-gradient':
          'button-gradient 10s cubic-bezier(0.42, 0, 0, 1.00) infinite alternate',
        jumpyy:
          'jump-mod var(--tw-animate-duration, 500ms) var(--tw-animate-easing, ease) var(--tw-animate-delay, 0s) var(--tw-animate-iteration, 1) var(--tw-animate-fill, both)',
      },
      screens: {
        mdp: '930px',
      },
      fontFamily: {
        garamond: ['var(--font-garamond)', ...defaultTheme.fontFamily.serif],
        noto: ['var(--font-noto)', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
    require('tailwindcss/plugin')(function ({ addBase }) {
      addBase({
        '[type="search"]::-webkit-search-decoration': { display: 'none' },
        '[type="search"]::-webkit-search-cancel-button': { display: 'none' },
        '[type="search"]::-webkit-search-results-button': { display: 'none' },
        '[type="search"]::-webkit-search-results-decoration': {
          display: 'none',
        },
      })
    }),
    require('tailwindcss-animated'),
  ],
}
