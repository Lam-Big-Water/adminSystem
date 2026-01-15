import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],  // Remove tailwindcss()
  build: {
    outDir: 'dist',
  },
  server: {
    historyApiFallback: true,
    open: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "./src")
    }
  },
})


  // server: {
  //   port: 5174, // 默认 5173
  //   open: true  // 自动打开浏览器
  // }