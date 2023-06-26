import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import react from '@vitejs/plugin-react';
import { dirname } from 'path';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      '@': `${dirname(import.meta.url).slice(7)}/src`,
    },
  },
});

