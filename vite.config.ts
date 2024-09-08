import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import mkcert from 'vite-plugin-mkcert'
import { VitePWA } from 'vite-plugin-pwa'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    //mkcert(),
    VitePWA({

      registerType: 'autoUpdate',
     // devOptions:{
     //   enabled: true
     // },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.png'],
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      manifest: {
        name: 'Скородум Генератор',
        short_name: 'Скородум',
        description: 'Генератор сценариев для игры скородум',
        theme_color: '#ffffff',
        start_url: '/',
        icons: [
          {
            src: '192-pwa.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'trans-512-notitle.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
