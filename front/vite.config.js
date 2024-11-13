import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/verify-token": {
        target: "https://api-spotifyhub.vercel.app/spotify",

      },
      "/top-tracks": {
        target: "https://api-spotifyhub.vercel.app/spotify",
      },
      "/logout": {
        target: "https://api-spotifyhub.vercel.app/spotify",
      },
    },    
  },
});
