import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import cjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import postcss from 'rollup-plugin-postcss'
import { uglify } from 'rollup-plugin-uglify'

const reslv = p => {
  return path.resolve(__dirname, p)
}

const plugins = [
  resolve(),
  cjs(),
  vue({
    css: false
  }),
  buble()
]

export default [
  {
    input: reslv('src/main.js'),
    output: [{
      format: 'es',
      file: reslv('dist/vueteible.es.js')
    }, {
      format: 'cjs',
      file: reslv('dist/vueteible.common.js'),
      exports: 'named'
    }],
    plugins: [
      ...plugins
    ],
    external: id => {
      return ['octicons-vue', 'teible'].includes(id.split('/')[0])
    }
  },
  {
    input: reslv('src/main.js'),
    output: {
      format: 'iife',
      file: reslv('dist/vueteible.iife.js'),
      name: 'vueteible',
      exports: 'named'
    },
    plugins: [
      postcss({
        extract: reslv('dist/vueteible.css')
      }),
      ...plugins,
      uglify({
        compress: { unused: true, dead_code: true }
      })
    ]
  }
]
