import { pt } from 'vuetify/locale'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['vuetify-nuxt-module'],
  vuetify: {
    vuetifyOptions: {
      locale: {
        locale: 'pt',
        fallback: 'pt',
        messages: { pt }
      },
      labComponents: [
        'VIconBtn',
        'VDateInput'
      ],
    }
  },
  vite: {
    server: {
      allowedHosts: ['unstretchable-extrospective-trudie.ngrok-free.dev']
    }
  },
  ssr: true
})