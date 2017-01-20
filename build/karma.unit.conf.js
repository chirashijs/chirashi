const base = require('./karma.base.conf.js')

module.exports = function (config) {
  config.set(Object.assign(base, {
    browsers: ['Chrome', 'Firefox', 'Safari'],
    reporters: ['progress'],
    singleRun: true
  }))
}
