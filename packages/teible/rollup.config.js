import path from 'path'

const reslv = p => {
  return path.resolve(__dirname, p)
}

export default [
  {
    input: reslv('src/index.js'),
    output: {
      format: 'es',
      file: reslv('dist/es.js')
    },
    external: id => /\.scss$/.test(id)
  }
]
