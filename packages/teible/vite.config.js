const path = require('path')

const reslv = p => {
  return path.resolve(__dirname, p)
}

export default {
  build: {
    lib: {
      entry: reslv('src/index.js'),
      formats: ['es']
    },
    rollupOptions: {
      external: id => /\.scss$/.test(id)
    }
  }
}
