// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@storyblok/nuxt'],
  storyblok: {
    // accessToken: process.env.STORYBLOK_TOKEN,
    accessToken: 'wziO6FqetaGF98JsD8Njbgtt',
    apiOptions: { region: 'us' },
    devtools: true,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
