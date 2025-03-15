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
    '@nuxt/image',
  ],
  nitro: {
    preset: 'netlify',
    debug: true,
    prerender: {
      routes: [
        "https://yardsolutionskc.s3.us-east-2.amazonaws.com/job_images/1/after/image1.jpg",
        "https://yardsolutionskc.s3.us-east-2.amazonaws.com/job_images/1/after/image2.jpg",
        "https://yardsolutionskc.s3.us-east-2.amazonaws.com/job_images/2/after/image13.jpg",
        "https://yardsolutionskc.s3.us-east-2.amazonaws.com/job_images/2/after/image3.jpg",
        "https://yardsolutionskc.s3.us-east-2.amazonaws.com/job_images/3/after/image4.jpg",
        "https://yardsolutionskc.s3.us-east-2.amazonaws.com/job_images/3/after/image5.jpg",
        "https://yardsolutionskc.s3.us-east-2.amazonaws.com/job_images/3/after/image6.jpg",
        "https://yardsolutionskc.s3.us-east-2.amazonaws.com/job_images/3/after/image7.jpg",
        "https://yardsolutionskc.s3.us-east-2.amazonaws.com/job_images/3/after/image8.jpg",
        "https://yardsolutionskc.s3.us-east-2.amazonaws.com/job_images/4/after/image9.jpg",
        "https://yardsolutionskc.s3.us-east-2.amazonaws.com/job_images/5/after/image10.jpg",
        "https://yardsolutionskc.s3.us-east-2.amazonaws.com/job_images/5/after/image11.jpg",
        "https://yardsolutionskc.s3.us-east-2.amazonaws.com/job_images/5/after/image12.jpg",
        "https://yardsolutionskc.s3.us-east-2.amazonaws.com/job_images/5/after/image14.jpg",
      ]
    }
  },
  // css: [
  //   '@/components/Layout/Navigation.vue'
  // ],
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
})