module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/teible' : '',
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'src/index.html'
    }
  }
}
