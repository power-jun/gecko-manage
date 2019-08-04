const TerserPlugin = require('terser-webpack-plugin')
module.exports = {
  // 基本路径
  publicPath: '/',
  // 输出文件目录
  outputDir: 'gecko-manage',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // webpack配置 see https://github.com/vuejs/vue-cli/blob/dev/docs/guide/webpack.md
  chainWebpack: () => { },
  configureWebpack: {
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios',
      'element-ui': 'Element'
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              drop_console: true
            }
          }
        })
      ]
    },
    devtool: '#source-map'
  },
  // vue-loader 配置项
  productionSourceMap: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: process.env.NODE_ENV === 'production',
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
  // webpack-dev-server 相关配置
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8081,
    https: false,
    hotOnly: false
  }
}
