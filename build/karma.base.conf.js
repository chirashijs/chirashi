const path = require('path')

const webpackConfig = {
  resolve: {
    alias: {
      chirashi: path.resolve(__dirname, '../lib')
    }
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  }
}

module.exports = {
  frameworks: ['mocha'],

  files: [
    '../test/**/*.js'
  ],

  preprocessors: {
    '../lib/**/*.js': ['webpack'],
    '../test/**/*.js': ['webpack']
  },

  webpack: webpackConfig,

  webpackMiddleware: {
    noInfo: true
  }
}
