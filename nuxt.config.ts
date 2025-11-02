// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  build: {
    transpile: ['vuetify'],
  },
  css: [
    'vuetify/styles',
    '@mdi/font/css/materialdesignicons.min.css',
  ],
  modules: [
    '@nuxt/image',
    'nuxt-snackbar',
    '@nuxtjs/i18n'
  ],
  snackbar: {
    bottom: true,
    right: true,
    duration: 5000
  },

  image: {
    domains: ['localhost', '127.0.0.1', 'your-domain.com'],
    format: ['webp', 'avif'],
  },

  runtimeConfig: {
    public: {
      // API base for development. Change to your API origin as needed.
      apiBaseUrl: 'http://localhost:3001',
    },
  },

  compatibilityDate: '2025-10-30',
  i18n: {
    locales: [
      { code: 'en', file: 'en.json' },
      { code: 'ar', file: 'ar.json', dir: 'rtl' }
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    detectBrowserLanguage: false,
    langDir: 'locales'
  },
})
