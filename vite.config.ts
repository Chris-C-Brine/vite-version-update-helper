import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true, // Creates a types field reference in dist
      include: ['src/lib'] // Should generate TypeScript definitions automatically
    })
  ],
  build: {

    // Empties the dist folder before building
    emptyOutDir: true,

    lib: {
      // Defines the entry point and output configurations
      entry: resolve(__dirname, 'src/lib/index.ts'),
      name: 'ViteVersionUpdateHelper',
      formats: ['es', 'cjs'], // Outputs both ES Modules and CommonJS
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      // Assures peer dependencies are not compiled into your final bundle
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        }
      }
    }
  }
});