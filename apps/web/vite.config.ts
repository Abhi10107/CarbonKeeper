import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(process.cwd(), 'src')
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': 'http://localhost:4000'
    }
  }
});
