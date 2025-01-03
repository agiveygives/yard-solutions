// https://nuxt.com/docs/api/configuration/nuxt-config
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'

export default defineNuxtConfig({
  ssr: false,
  components: true,
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', 'nuxtjs-naive-ui', '@nuxt/icon', '@nuxt/fonts'],
  nitro: {
    preset: 'netlify',
    debug: 'true',
  },
  vite: {
    plugins: [
      AutoImport({
        imports: [
          {
            'naive-ui': [
              'useDialog',
              'useMessage',
              'useNotification',
              'useLoadingBar'
            ]
          },
        ]
      }),
      Components({
        resolvers: [NaiveUiResolver()]
      })
    ]
  },
  build: {
    transpile: ["vueuc"],
  },
  css: [
    '@/components/Layout/Navigation.vue'
  ]
})