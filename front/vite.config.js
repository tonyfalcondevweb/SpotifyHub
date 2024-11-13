import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Accéder aux variables d'environnement via process.env
const backendUrl = process.env.VITE_API_URL || 'http://localhost:5000';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/verify-token": {
        target: backendUrl,
        changeOrigin: true,
        secure: false,
      },
      "/top-tracks": {
        target: backendUrl,
        changeOrigin: true,
        secure: false,
      },
      "/logout": {
        target: backendUrl,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
