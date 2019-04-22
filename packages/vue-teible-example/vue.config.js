module.exports = {
  publicPath: process.env.NODE_ENV === 'production' && !process.env.TEIBLE_EXAMPLE ? '/teible' : '',
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'src/index.html'
    }
  }
}
