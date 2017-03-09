const fs = require('fs')
const mkdirp = require('mkdirp')
const rollup = require('rollup')
const localResolve = require('rollup-plugin-local-resolve')
const babel = require('rollup-plugin-babel')
const babelrc = require('babelrc-rollup').default
const uglify = require('uglify-js')
const gzipSize = require('gzip-size')

const pkg = require('../package.json')
const version = process.env.VERSION || pkg.version
const external = Object.keys(pkg.dependencies)

const moduleName = toPascalCase(pkg.name)
const path = pkg.main.split('/').slice(0, -1).join('/')

const config = {
  entry: 'lib/index.js',
  plugins: [
    localResolve(),
    babel(babelrc())
  ],
  external: external
}

const banner =
  `/**\n` +
  ` * ${moduleName}.js v${version}\n` +
  ` * (c) ${new Date().getFullYear()} ${pkg.author.name}\n` +
  ` * Released under MIT License.\n` +
  ` **/\n`

const targets = [
  {
    file: pkg.main,
    options: {
      banner,
      format: 'cjs'
    }
  },
  {
    file: pkg.module,
    options: {
      banner,
      format: 'es'
    }
  },
  {
    file: `${path}/${pkg.name}.js`,
    options: {
      banner,
      format: 'umd',
      moduleName: moduleName
    },
    then (file, code) {
      file = file.split('.')
      file.splice(-1, 0, 'min')
      file = file.join('.')

      const minified = banner + '\n' + uglify.minify(code, {
        fromString: true,
        output: {
          screw_ie8: true,
          ascii_only: true
        }
      }).code

      const minifiedFile = file.split('/').pop()
      console.log(`${blue(minifiedFile)} ${green(`${getSize(minified)}kb`)}`)
      console.log(`${blue(minifiedFile + '.gz')} ${green(`${(gzipSize.sync(minified) / 1000).toFixed(2)}kb`)}`)

      fs.writeFileSync(file, minified)
    }
  }
]

mkdirp.sync(path)

rollup
  .rollup(config)
  .then(bundle => {
    for (const target of targets) {
      const result = bundle.generate(target.options)

      const file = target.file

      console.log(`${blue(file.split('/').pop())} ${green(`${getSize(result.code)}kb`)}`)

      fs.writeFileSync(target.file, result.code)

      if (target.then) target.then(target.file, result.code)
    }
  })

function toPascalCase (input) {
  const kebabRegex = /(^|-)([a-z])/g

  let ouput = `${input}`
  let match
  while ((match = kebabRegex.exec(input))) {
    const fullMatch = match[0]
    const letter = match[2]

    ouput = ouput.replace(new RegExp(fullMatch, 'g'), letter.toUpperCase())
  }

  return ouput
}

function getSize (code) {
  return (code.length / 1024).toFixed(2)
}

function blue (str) {
  return '\x1b[1m\x1b[34m' + str + '\x1b[39m\x1b[22m'
}

function green (str) {
  return '\x1b[1m\x1b[32m' + str + '\x1b[39m\x1b[22m'
}
