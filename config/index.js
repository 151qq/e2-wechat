// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var glob = require('glob')
var pages = getEntry('src/views/**/*.html');
function getEntry(globPath) {
  var entries = {},
    basename;

  glob.sync(globPath).forEach(function(entry) {

    basename = path.basename(entry, path.extname(entry));
    entries[basename] = entry;
  });
  return entries;
}
var build = {
  env: require('./prod.env'),
  //index: path.resolve(__dirname, '../dist/index.html'),
  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',
  productionSourceMap: false,
  productionGzip: false,
  productionGzipExtensions: ['js', 'css'],
  bundleAnalyzerReport: process.env.npm_config_report
}

//每个入口页面生成一个入口添加到build中
for (var pathname in pages) {
  build[pathname] = path.resolve(__dirname, '../dist/' + pathname + '.html')
}
module.exports = {

  build:build,

  dev: {
    env: require('./dev.env'),
    port: 80,
    autoOpenBrowser: false,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    // http://112.126.90.50:8085
    proxyTable: {
      '/e2-mobile-api': {
        target: 'http://192.168.2.109:8080/E2-Mobile',
        changeOrigin: true,
        pathRewrite: {
          '^/e2-mobile-api': ''
        }
      }
    },

    cssSourceMap: false
  }
}
