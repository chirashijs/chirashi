// Karma configuration
module.exports = function (config) {
  config.set({
    plugins: [
      'karma-spec-reporter',
      'karma-coverage',
      'karma-mocha',
      require('karma-webpack'),
      'karma-phantomjs-launcher',
      'karma-firefox-launcher'
    ],

    basePath: './',

    frameworks: ['mocha'],

    files: ['test/**/*.js'],

    reporters: ['spec', 'coverage'],

    preprocessors: {
      'src/**/*.js': ['webpack'],
      'test/**/*.js': ['webpack']
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
              plugins: ['istanbul', 'transform-runtime', 'transform-object-rest-spread']
            }
          }
        ]
      }
    },

    webpackMiddleware: { noInfo: true },

    autoWatch: true,

    browsers: ['PhantomJS', 'Firefox'],

    coverageReporter: {
      type: 'lcov',
      subdir: 'report-lcov'
    },

    specReporter: {
      maxLogLines: 5,
      suppressErrorSummary: true,
      suppressFailed: false,
      suppressPassed: false,
      suppressSkipped: true,
      showSpecTiming: false
    }
  })
}
