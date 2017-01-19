var path = require('path')
var webpack = require('webpack')

var webpackConfig = {
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
        use: ['babel']
      }
    ]
  }
}

module.exports = {
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
