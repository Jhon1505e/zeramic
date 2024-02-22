/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'components/**/*.vue',
    'layouts/**/*.vue',
    'storyblok/**/*.vue',
    'pages/**/*.vue',
    'plugins/**/*.js',
    'nuxt.config.js'
  ],
  safelist: [
    { pattern: /(bg|text|border)-./ }
  ],
  theme: {
    extend: {
      colors: {
        'PRP': '#5200f8',
      },
    },
  },
  plugins: [],

}

