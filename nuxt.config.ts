// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@storyblok/nuxt', "@nuxtjs/tailwindcss"],
  tailwindcss: {
    configPath: './tailwind.config.js',
    cssPath: './assets/css/main.css'
  },
  storyblok: {
    accessToken: process.env.STORYBLOK_TOKEN,
    apiOptions: { region: 'us' },
    devtools: true,
  },
})