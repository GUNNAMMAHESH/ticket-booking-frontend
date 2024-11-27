import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // specify the port you want to use
    host: "0.0.0.0", // allow access from any IP address on your network
  },
  preview:{
    port:3000
  },
  build: {
    rollupOptions: {
      external: ['react-icons'] // externalize this package
    }
  },
  publicDir: "public", // ensure public assets are handled correctly
});
