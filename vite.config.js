import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'build',
    // Ensure content hashes in filenames for cache busting
    rollupOptions: {
      output: {
        // Add hash to entry files
        entryFileNames: 'assets/[name]-[hash].js',
        // Add hash to chunk files
        chunkFileNames: 'assets/[name]-[hash].js',
        // Add hash to asset files (css, images, etc.)
        assetFileNames: 'assets/[name]-[hash].[ext]',
      },
    },
    // Generate source maps for debugging
    sourcemap: false,
  },
  server: {
    port: 3000,
    open: true,
  },
});
