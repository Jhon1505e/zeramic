// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    mongoURI: process.env.MONGO_URI,
    resendAPIKey: process.env.RESEND_API_KEY,
    public: {
      wompiPublicKey: process.env.WOMPI_PUBLIC_KEY,
      wompiIntegritySecret: process.env.WOMPI_INTEGRITY_SECRET,
    },
  },

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

  compatibilityDate: "2025-02-05",
});