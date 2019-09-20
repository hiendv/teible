module.exports = {
  publicPath: process.env.NODE_ENV === 'production' && process.env.GH_PAGES ? '/tabs' : ''
}
