const path = require('path')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const glob = require('glob-all')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: './',
  outputDir: 'dist',
  indexPath: 'index.html',
  productionSourceMap: false,
  css: {
    requireModuleExtension: true,
    sourceMap: false,
    extract: false,
    modules: false,
    loaderOptions: {}
  },
  configureWebpack: {
    plugins: [
      new PurgecssPlugin({
        paths: glob.sync([
          path.join(__dirname, './src/index.html'),
          path.join(__dirname, './**/*.vue')
          // path.join(__dirname, './**/*.css')
        ])
      })
    ]
  },
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
    config.resolve.alias.set('img', resolve('src/assets/img'))

    config.resolve.symlinks(true)
    config.module
      .rule('pdf')
      .test(/\.(pdf|xls|xlsx|doc|docx)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 10000
      })
  },
  devServer: {
    open: true, // 自动开启浏览器
    proxy: {
      '/**': {
        target: 'http://healthtest.minshenglife.com/',
        changeOrigin: true,
        headers: {
          Accept: 'application/json, text/plain',
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        pathRewrite: {},
        onProxyReq: function() {
          // console.log(proxyReq)
          // console.log('---------------------------')
        }
      }
    }
  }
}
