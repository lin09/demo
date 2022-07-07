const config = require('./config/config')

module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: config.pxToRemRootValue,
      // 必需要写 propList
      propList: ['*']
    },
    autoprefixer: { browsers: ['last 2 versions', 'iOS >= 8'] },
    cssnano: {},
  }
}