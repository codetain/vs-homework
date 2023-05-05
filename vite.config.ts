import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    viteTsconfigPaths(),
    command !== 'build'
      ? checker({
          typescript: true,
          eslint: { lintCommand: 'eslint "./src/**/*.{ts,tsx}"' }
        })
      : undefined
  ],
  server: {
    port: 3005
  },
  test: {
    environment: 'jsdom'
  }
}));
