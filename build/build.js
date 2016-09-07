var fs = require('fs')
var zlib = require('zlib')
var rollup = require('rollup')
var uglify = require('uglify-js')
var babel = require('rollup-plugin-babel')
var replace = require('rollup-plugin-replace')
var version = process.env.VERSION || require('../package.json').version

var banner =
  '/*!\n' +
  ' * Chirashi.js v' + version + '\n' +
  ' * (c) ' + new Date().getFullYear() + ' Alex Toudic\n' +
  ' * Released under the MIT License.\n' +
  ' */'

// update main file
var main = fs
  .readFileSync('src/index.js', 'utf-8')
  .replace(/Chirashi\.version = '[\d\.]+'/, "Chirashi.version = '" + version + "'")
fs.writeFileSync('src/index.js', main)

// CommonJS build.
// this is used as the "main" field in package.json
// and used by bundlers like Webpack and Browserify.
rollup.rollup({
  entry: 'src/index.js',
  plugins: [
    babel({
      runtimeHelpers: true,
      presets: [
        [
            'es2015-rollup'
          ]
        ],
      plugins: ['transform-object-rest-spread']
    })
  ]
})
.then(function (bundle) {
  return write('dist/chirashi.common.js', bundle.generate({
    globals: {
      raf: 'raf'
    },
    format: 'cjs',
    banner: banner
  }).code)
})
// Standalone Dev Build
.then(function () {
  return rollup.rollup({
    entry: 'src/index.js',
    plugins: [
      replace({
        'process.env.NODE_ENV': "'development'"
      }),
      babel({
        runtimeHelpers: true,
        presets: [
          [
            'es2015-rollup'
          ]
        ],
        plugins: ['transform-object-rest-spread']
      })
    ]
  })
  .then(function (bundle) {
    return write('dist/chirashi.js', bundle.generate({
      globals: {
        raf: 'raf'
      },
      format: 'umd',
      banner: banner,
      moduleName: 'Chirashi'
    }).code)
  })
})
.then(function () {
  // Standalone Production Build
  return rollup.rollup({
    entry: 'src/index.js',
    plugins: [
      replace({
        'process.env.NODE_ENV': "'production'"
      }),
      babel({
        runtimeHelpers: true,
        presets: [
          [
            'es2015-rollup'
          ]
        ],
        plugins: ['transform-object-rest-spread']
      })
    ]
  })
  .then(function (bundle) {
    var code = bundle.generate({
      format: 'umd',
      moduleName: 'Chirashi'
    }).code
    var minified = banner + '\n' + uglify.minify(code, {
      fromString: true,
      output: {
        ascii_only: true
      }
    }).code
    return write('dist/chirashi.min.js', minified)
  })
  .then(zip)
})
.catch(logError)

function write (dest, code) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(dest, code, function (err) {
      if (err) return reject(err)
      console.log(blue(dest) + ' ' + getSize(code))
      resolve()
    })
  })
}

function zip () {
  return new Promise(function (resolve, reject) {
    fs.readFile('dist/chirashi.min.js', function (err, buf) {
      if (err) return reject(err)
      zlib.gzip(buf, function (err, buf) {
        if (err) return reject(err)
        write('dist/chirashi.min.js.gz', buf).then(resolve)
      })
    })
  })
}

function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function logError (e) {
  console.log(e)
}

function blue (str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}
