import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import VitePluginChecker from 'vite-plugin-checker';
import eslintPlugin from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [
    react(), 
    eslintPlugin(),
    VitePluginChecker({
      typescript: true, // Type-checking
    }),
    eslintPlugin(), // ESLint integration
  ],
  build: {
    minify: 'esbuild',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console logs in production
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // Split vendor dependencies
        },
      },
    },
  },
});
