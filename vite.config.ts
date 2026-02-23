import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync, mkdirSync, existsSync } from 'fs';

function copyManifest() {
  return {
    name: 'copy-manifest',
    closeBundle() {
      if (!existsSync('dist')) {
        mkdirSync('dist', { recursive: true });
      }
      if (!existsSync('dist/popup')) {
        mkdirSync('dist/popup', { recursive: true });
      }
      if (!existsSync('dist/icons')) {
        mkdirSync('dist/icons', { recursive: true });
      }
      copyFileSync('manifest.json', 'dist/manifest.json');
      copyFileSync('src/popup/styles.css', 'dist/popup/styles.css');
      copyFileSync('icons/icon16.png', 'dist/icons/icon16.png');
      copyFileSync('icons/icon48.png', 'dist/icons/icon48.png');
      copyFileSync('icons/icon128.png', 'dist/icons/icon128.png');
      copyFileSync('dist/src/popup/index.html', 'dist/popup/index.html');
    },
  };
}

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        content: resolve(__dirname, 'src/content/index.ts'),
        popup: resolve(__dirname, 'src/popup/index.html'),
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'chunks/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  plugins: [copyManifest()],
});
