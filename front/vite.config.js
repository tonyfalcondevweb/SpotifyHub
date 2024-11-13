import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/verify-token": {
        target: "http://localhost:5000/spotify",

      },
      "/top-tracks": {
        target: "http://localhost:5000/spotify",
      },
      "/logout": {
        target: "http://localhost:5000/spotify",
      },
    },    
  },
});
