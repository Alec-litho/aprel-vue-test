export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],
  css: ['~/assets/scss/main.scss'],

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