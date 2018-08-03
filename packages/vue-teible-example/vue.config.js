const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/teible' : '',
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'src/index.html'
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(new UglifyJsPlugin())
    }
  }
}
