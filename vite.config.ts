import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    VitePWA({
      includeAssets: ['favicon.ico', './img/cardFaceDown.jfif', './cards.json', './img/cards/*'],
      manifest: {
        name: 'Memogame',
        short_name: 'Memogame',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'favicon.ico',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: '/memory-game-vue-ts/',
})
