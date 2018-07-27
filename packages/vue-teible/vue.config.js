module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/variables.scss";`
      }
    }
  },
  configureWebpack: config => {
    if (config.output.libraryTarget === 'umd') {
      return
    }

    config.externals = ['lodash.chunk', 'lodash.orderby', 'octicons-modular', 'octicons-vue']
  }
}
