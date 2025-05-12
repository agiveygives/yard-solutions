// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  ssr: true,
  components: true,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/ui',
    '@nuxtjs/seo',
    '@vueuse/nuxt',
  ],
  nitro: {
    preset: 'netlify',
    debug: true,
  },
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
    }
  },
  site: {
    // Default meta tags
    baseUrl: 'https://yardsolutionskc.com',
    name: 'Yard Solutions LLC',
    title: 'Yard Solutions LLC',
    templateTitle: '%name% | %title%',
    description: 'Affordable Lawn Care in the Kansas City Metro Area',
    canonical: true, // Automatically generate canonical tags
    author: 'Yard Solutions LLC',

    // Open Graph settings
    ogType: 'website',
    ogTitle: 'Yard Solutions LLC',
    ogDescription: 'Affordable Lawn Care in the Kansas City Metro Area',
    ogImage: '/default-og-image.jpg', // Default Open Graph image
    ogHost: 'https://yardsolutionskc.com',

    // Robots settings
    robots: {
      index: true,
      follow: true,
    },
  },
  alias: {
    "~/types": "/<srcDir>/types",
    "~/utils": "/<srcDir>/utils"
  },
})