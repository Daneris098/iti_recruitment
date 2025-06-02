import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { proxyConfig } from "./proxy.config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "shared/"),
      "@modules": path.resolve(__dirname, "src/modules"),
      "@components": path.resolve(__dirname, "src/components"),
      "@src": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@tabler/icons-react": "@tabler/icons-react/dist/esm/icons/index.mjs",
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: proxyConfig
  },
}); 