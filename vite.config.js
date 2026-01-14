import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],  // 移除 tailwindcss()
  build: {
    outDir: 'dist',
  },
  server: {
    historyApiFallback: true,
  }
})


  // server: {
  //   port: 5174, // 默认 5173
  //   open: true  // 自动打开浏览器
  // }