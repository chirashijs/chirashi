// Karma configuration

module.exports = function(config) {
    config.set({
        plugins: [
            'karma-mocha',
            require('karma-webpack'),
            'karma-chrome-launcher',
            'karma-firefox-launcher'
        ],

        basePath: './',

        frameworks: ['mocha'],

        files: ['test/**/*.js'],

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
                        loader: 'babel-loader'
                    }
                ]
            }
        },

        webpackMiddleware: { noInfo: true },

        autoWatch: true,

        browsers: ['Chrome', 'Firefox']
    })
}
