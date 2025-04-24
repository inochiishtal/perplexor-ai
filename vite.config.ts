import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/perplexor-ai/',
  plugins: [react()],
  server: {
    port: 4000,
    watch: {
      usePolling: true,
    },
  },
})
