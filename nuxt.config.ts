// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  runtimeConfig: {
    mongoURI: process.env.MONGO_URI,
    resendAPIKey: process.env.RESEND_API_KEY,
    public: {
      wompiPublicKey: process.env.WOMPI_PUBLIC_KEY,
      wompiIntegritySecret: process.env.WOMPI_INTEGRITY_SECRET,
      gtagId: process.env.NUXT_PUBLIC_GTAG_ID,
    },
  },

  modules: [
    "nuxt-gtag",
    "@storyblok/nuxt",
    "@nuxt/image-edge",
    "@nuxtjs/sitemap",
    "@nuxtjs/robots",
    "nuxt-vue3-google-signin",
    "@nuxt/ui",
  ],

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
      title: "Zeramic Guatapé - Soluciones creativas y funcionales en cerámica 3D",
      htmlAttrs: {
        lang: "es",
      },
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ]
    }
  },

  colorMode: {
    preference: 'light'
  },

  googleSignIn: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    // clientId: '177843279083-s12hkag38sotldsmk7g0bn8l5cibnfao.apps.googleusercontent.com',
  },

  gtag: {
    enabled: process.env.VERCEL_ENV === 'production',
    id: process.env.NUXT_PUBLIC_GTAG_ID,
  },

  css: ["~/assets/css/main.css"],

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