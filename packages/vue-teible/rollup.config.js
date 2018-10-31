import path from 'path'
import importer from 'node-sass-tilde-importer'

import resolve from 'rollup-plugin-node-resolve'
import cjs from 'rollup-plugin-commonjs'
import vue from 'rollup-plugin-vue'
import buble from 'rollup-plugin-buble'
import { uglify } from 'rollup-plugin-uglify'

const reslv = p => {
  return path.resolve(__dirname, p)
}

const style = {
  trim: false,
  preprocessOptions: {
    scss: {
      importer,
      includePaths: [ reslv('../../node_modules'), reslv('src') ],
      data: `@import "variables.scss";`
    }
  }
}

const plugins = [
  resolve(),
  cjs(),
  vue({
    style
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
    plugins,
    external: id => {
      return id.match(/^octicons-vue/) || id.match(/^octicons-modular/)
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
      ...plugins,
      uglify({
        mangle: { reserved: ['octicon'] },
        compress: { unused: true, dead_code: true, pure_funcs: ['octicon'] }
      })
    ]
  }
]
