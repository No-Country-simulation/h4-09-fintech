import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  preview: {
    host: '0.0.0.0',
    port: 4173,
    allowedHosts: ['h4-09-fintech-production-53e6.up.railway.app'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'h4-09-fintech-production-53e6.up.railway.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
