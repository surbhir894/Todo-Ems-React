import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base:'/Todo-Ems-React/',
  plugins: [react()],
  server: {
    watch: {
      ignored: ['**/node_modules/**', '**/dist/**'],
    },
  },
})

