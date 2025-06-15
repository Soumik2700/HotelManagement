import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // optional but helpful
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: '/index.html',
    },
  },
});
