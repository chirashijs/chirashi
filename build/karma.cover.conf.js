const base = require('./karma.base.conf.js')

module.exports = function (config) {
  var options = Object.assign(base, {
    browsers: ['PhantomJS'],
    reporters: ['progress', 'coverage'],
    coverageReporter: {
      reporters: [
        {
          type: 'lcov',
          dir: '../coverage',
          subdir: 'report-lcov'
        }
      ]
    },
    singleRun: true
  })

  options.files.push('./matches-polyfill.js')

  options.frameworks.push('es6-shim')

  config.set(options)
}
