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
  theme: {
    extend: {
      colors: {
        'PRP': '#5200f8',
      },
    },
  },
  plugins: [],
  purge: {}
}

