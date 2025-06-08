import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@prisma/nuxt', '@pinia/nuxt'],
  nitro: {
    experimental: {
      openAPI: true
    }
  },
  alias: {
    "@": "/<srcDir>",
  },
  vite: {
    plugins: [
      tailwindcss()
    ]
  },
  css: ['~/assets/css/main.css']
})
