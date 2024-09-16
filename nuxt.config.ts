// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: [],
  modules: [
    '@pinia/nuxt',
  ],
  future: {
    compatibilityVersion: 4,
  },
  ssr: false, // Disable SSR, making the app client-side only
  experimental: {
    sharedPrerenderData: false,
    compileTemplate: true,
    resetAsyncDataToUndefined: true,
    templateUtils: true,
    relativeWatchPaths: true,
    defaults: {
      useAsyncData: {
        deep: true,
      },
    },
  },
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: 'https://nordcdn.net/ds/css/3.2.1/nord.min.css' },
        { rel: 'stylesheet', href: 'https://nordcdn.net/ds/themes/8.0.3/nord-dark.css' },
      ],
      script: [
        { src: 'https://nordcdn.net/ds/components/3.17.0/index.js', type: 'module' }
      ]
    }
  }
})
