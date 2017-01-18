module.exports = {
  basePath: '../',

  files: ['../test/**/*.js'],

  preprocessors: {
    '../lib/**/*.js': ['webpack'],
    '../test/**/*.js': ['webpack']
  }
}
