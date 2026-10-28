import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.tsx',
      formats: ['es'],
      fileName: () => 'index.js'
    },
    rollupOptions: {
      external: ['react', 'react-dom', '@orbix/sdk', 'lucide-react'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          '@orbix/sdk': 'OrbixSDK',
          'lucide-react': 'LucideReact'
        }
      }
    }
  },
  server: {
    port: 8080,
    cors: true
  }
});
