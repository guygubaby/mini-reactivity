import { defineConfig } from 'vite'

export default defineConfig({
  root: './',
  server: {
    port: 5000,
    fs: {
      strict: true,
    },
  },
})
