import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // For GitHub Pages
  //base: '/perplexor-ai/',
  // For Vercel
  base: '/',
  plugins: [react()],
  server: {
    port: 4000,
    watch: {
      usePolling: true,
    },
  },
})
