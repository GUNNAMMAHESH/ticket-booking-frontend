import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // specify the port you want to use
    host: '0.0.0.0', // allow access from any IP address on your network
  },
  build: {
    outDir: 'dist', // ensure this matches your vercel.json
  },
  publicDir: 'public', 
});
