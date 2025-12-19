import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Определяем переменную для обхода аутентификации
    'process.env.USE_AUTH_BYPASS': JSON.stringify('true')
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        // Указываем альтернативную точку входа, если нужно
      }
    }
  }
})