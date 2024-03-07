// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@storyblok/nuxt', "@nuxtjs/tailwindcss", "@nuxt/image-edge"],
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  tailwindcss: {
    configPath: './tailwind.config.js',
    cssPath: './assets/css/main.css'
  },
  storyblok: {
    accessToken: process.env.STORYBLOK_TOKEN,
    apiOptions: { region: 'us' },
    devtools: true,
  },
  image: {
    storyblok: {
      baseURL: 'https://a-us.storyblok.com',
    },
  },
})