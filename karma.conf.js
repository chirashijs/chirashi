// Karma configuration

module.exports = function (config) {
  config.set({
    plugins: [
      'karma-coverage',
      'karma-mocha',
      require('karma-webpack'),
      'karma-chrome-launcher',
      'karma-firefox-launcher'
    ],

    basePath: './',

    frameworks: ['mocha'],

    files: ['test/**/*.js'],

    reporters: ['coverage'],

    preprocessors: {
      'src/**/*.js': ['webpack', 'coverage'],
      'test/**/*.js': ['webpack', 'coverage']
    },

    webpack: {
      module: {
        loaders: [
          {
            test: /(\.js$)|(\.jsx$)/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
              presets: ['es2015'],
              plugins: ['transform-runtime', 'transform-object-rest-spread']
            }
          }
        ]
      }
    },

    webpackMiddleware: { noInfo: true },

    autoWatch: true,

    browsers: ['Chrome', 'Firefox'],

    coverageReporter: { type: 'lcov', subdir: 'report-lcov' }
  })
}
