import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import AutoImport from 'unplugin-auto-import/vite'
import pkg from './package.json'

export default defineConfig({
  plugins: [
    dts({
      cleanVueFileName: true,
    }),
    AutoImport({
      include: ['/\.[tj]sx?$/'],
      imports: [
        'vitest',
      ],
    }),
  ],
  test: {
    environment: 'happy-dom',
  },
  build: {
    lib: {
      entry: './src/index.ts',
      formats: ['es', 'umd'],
      // the name expose in umd mode
      name: pkg.name,
      fileName: format => `index.${format}.js`,
    },
  },
})
