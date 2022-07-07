const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production'

  return {
    output: {
      publicPath: devMode ? '/' : '/digi-demo/dist/',
      filename: devMode ? 'bundle.js' : 'bundle.[hash].js'
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: devMode ? '[name].css' : '[name].[hash].css',
        chunkFilename: devMode ? '[id].css' : '[id].[hash].css'
      }),
      new HtmlWebpackPlugin({
        template: './src/index.html'
      })
    ],
    module: {
      rules: [{
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: { minimize: !devMode }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          // postcss-loader 要比 sass-loader 前，否则 cssnano 不无效结果。踩了一天的坑，晚上23:23才爬出来55555。postcss-loader在后时 autoprefixer 有效 cssnano 却无效，真TMD。
          'postcss-loader',
          'sass-loader'
        ],
      }]
    },
    devServer: {
      historyApiFallback: true
    }
  }
}