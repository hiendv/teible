import path from 'path'
import postcss from 'rollup-plugin-postcss'
import buble from 'rollup-plugin-buble'

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
  },
  {
    input: reslv('src/index.js'),
    output: {
      name: 'tabs',
      format: 'iife',
      file: reslv('dist/iife.js')
    },
    plugins: [postcss(), buble()]
  }
]
