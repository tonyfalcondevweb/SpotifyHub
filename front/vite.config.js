import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/verify-token": {
        target: import.meta.env.VITE_API_URL,

      },
      "/top-tracks": {
        target: import.meta.env.VITE_API_URL,
      },
      "/logout": {
        target: import.meta.env.VITE_API_URL,
      },
    },    
  },
});
