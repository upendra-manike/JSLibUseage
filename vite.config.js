import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/JSLibUseage/', // GitHub Pages base path - update with your repo name
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
})

