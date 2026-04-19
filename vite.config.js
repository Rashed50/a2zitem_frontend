import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

/**
 * Optional dev proxy (avoids CORS when using same-origin API paths).
 * Set in .env: VITE_DEV_PROXY_TARGET=http://localhost:8000
 * And set VITE_API_BASE_URL=/api so requests go to the Vite dev server and get proxied.
 */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const proxyTarget = env.VITE_DEV_PROXY_TARGET?.trim().replace(/\/$/, '')

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      proxy: proxyTarget
        ? {
            '/api': {
              target: proxyTarget,
              changeOrigin: true,
              secure: false,
            },
          }
        : {},
    },
  }
})
