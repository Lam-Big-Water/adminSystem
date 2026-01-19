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
  alias: [
    { find: '@', replacement: path.resolve(__dirname, './src') },
    { find: '@pages', replacement: path.resolve(__dirname, './src/pages') },
    { find: '@components', replacement: path.resolve(__dirname, './src/components') },
  ],
}
})

/*
Server Configuration (server object)

server: {
  port: 3000,           // Custom port (default: 5173)
  host: 'localhost',    // Local only → '0.0.0.0' for network access
  open: true,           // Auto-open browser
  https: true,          // Enable HTTPS (self-signed certs)
}
*/


/*
Proxy Requests

Vite's cross-domain configuration (server.proxy) is only available during the development phase.

server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  },
}

Frontend calls /api/users → proxied to http://localhost:8080/users
Bypasses CORS during development
*/ 