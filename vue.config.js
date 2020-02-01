const path = require('path')
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'js': path.resolve(__dirname, 'src/assets/js'),
        'scss': path.resolve(__dirname, 'src/assets/scss'),
        'components': path.resolve(__dirname, 'src/components'),
        'views': path.resolve(__dirname, 'src/views'),
        'pages': path.resolve(__dirname, 'src/pages'),
        'api': path.resolve(__dirname, 'src/api')
      }
    }
  }
}
