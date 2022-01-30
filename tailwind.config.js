const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./lib/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    fontSize: {
      ...defaultTheme.fontSize,
      xs: '0.7rem',
      sm: '0.85rem',
      base: '1rem',
      lg: '1.35rem',
      xl: '1.85rem',
      '2xl': '2.2rem',
      '3xl': '2.5rem',
      '4xl': '3rem'
    },
    extend: {},
  },
  plugins: [],
}
