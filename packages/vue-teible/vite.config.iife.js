import path from 'path'
import { createVuePlugin } from 'vite-plugin-vue2'

const reslv = p => {
  return path.resolve(__dirname, p)
}

module.exports = {
  plugins: [
    createVuePlugin()
  ],
  build: {
    emptyOutDir: false,
    lib: {
      entry: reslv('src/main.js'),
      formats: ['iife'],
      name: 'vueteible'
    },
    rollupOptions: {
      output: {
        exports: 'named'
      }
    }
  }
}
