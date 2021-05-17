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
      formats: ['es', 'cjs']
    },
    rollupOptions: {
      external: id => {
        return ['octicons-vue', 'teible'].includes(id.split('/')[0])
      },
      output: {
        exports: 'named'
      }
    }
  }
}
