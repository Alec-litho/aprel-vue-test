export default defineNuxtConfig({
  app: {baseURL:"aprel-vue-test"},
  modules: ['@pinia/nuxt'],
  css: ['~/assets/scss/main.scss'],
  nitro: {
    prerender: {
      crawlLinks: true,
      ignore: ['/200.html'] 
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/scss/_variables.scss" as *;'
        }
      }
    }
  },

  compatibilityDate: '2025-03-23'
})