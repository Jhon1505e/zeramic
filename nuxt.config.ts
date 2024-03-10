// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@storyblok/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxt/image-edge",
    "nuxt-vue3-google-signin",
  ],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
  googleSignIn: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    // clientId: '177843279083-s12hkag38sotldsmk7g0bn8l5cibnfao.apps.googleusercontent.com',
  },
  tailwindcss: {
    configPath: "./tailwind.config.js",
    cssPath: "./assets/css/main.css",
  },
  storyblok: {
    accessToken: process.env.STORYBLOK_TOKEN,
    apiOptions: { region: "us" },
    devtools: true,
  },
  image: {
    storyblok: {
      baseURL: "https://a-us.storyblok.com",
    },
  },
});
