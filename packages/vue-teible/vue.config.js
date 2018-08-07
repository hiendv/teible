const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/variables.scss";`
      }
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(new UglifyJsPlugin())
    }

    if (config.output.libraryTarget === 'umd') {
      return
    }

    config.externals = ['octicons-modular', 'octicons-vue']
  }
}
