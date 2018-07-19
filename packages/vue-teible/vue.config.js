module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/variables.scss";`
      }
    }
  },
  configureWebpack: {
    externals: ['lodash.chunk', 'lodash.orderby', 'octicons-modular', 'octicons-vue']
  }
}
