import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/JSLibUseage/', // GitHub Pages base path - update with your repo name
  plugins: [react()],
  resolve: {
    alias: {
      '@upendra.manike/seo-boost': '@upendra.manike/seo-boost/dist/index.mjs'
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: './app.html',
        landing: './index.html'
      }
    },
    commonjsOptions: {
      include: [/node_modules/],
      transformMixedEsModules: true
    }
  },
  server: {
    port: 3000,
    open: true
  }
})

