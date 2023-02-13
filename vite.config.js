import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import autoprefixer from 'autoprefixer';
import postcssPresetEnv from 'postcss-preset-env';

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: [
      'firebase',
      'firebase/app',
      'firebase/auth',
      'firebase/firestore',
      'firebase/analytics',
    ],
  },
  plugins: [react()],
  server: {
    host: true,
  },
  css: {
    postcss: {
      plugins: [autoprefixer, postcssPresetEnv()],
    },
  },
  test: {
    include: [
      './src/__tests__/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
      './src/**/__tests__/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}',
    ],
    globals: true,
    environment: 'jsdom',
  },
});
