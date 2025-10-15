// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['vuetify-nuxt-module'],
  vuetify: {
    vuetifyOptions: {
      labComponents: ['VIconBtn'],
    }
  },
  vite: {
    server: {
      allowedHosts: ['unstretchable-extrospective-trudie.ngrok-free.dev']
    }
  },
  ssr: true
})