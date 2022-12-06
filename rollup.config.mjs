import * as fs from 'fs'
import * as path from 'path'

import { minify as terser } from 'terser'
import { transform as sucrase } from 'sucrase'
import { transformAsync as babel } from '@babel/core'

// TODO: googleClosureCompiler
// import googleClosureCompiler from 'google-closure-compiler'
// const ClosureCompiler = googleClosureCompiler.compiler
// console.log(ClosureCompiler.COMPILER_PATH) // absolute path to the compiler jar
// console.log(ClosureCompiler.CONTRIB_PATH) // absolute path to the contrib folder which contain externs

import rease from 'rollup-plugin-rease'
// import css from 'rollup-plugin-css-only'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
// import livereload from 'rollup-plugin-livereload'

const bs = fs.readFileSync(path.resolve('static/bootstrap.min.css'), 'utf8')

const production = !process.env.ROLLUP_WATCH

// eslint-disable-next-line func-style
// function serve() {
//   let server

//   // eslint-disable-next-line func-style
//   function toExit() {
//     if (server) server.kill(0)
//   }

//   return {
//     writeBundle() {
//       if (server) return
//       server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
//         stdio: ['ignore', 'inherit', 'inherit'],
//         shell: true
//       })

//       process.on('SIGTERM', toExit)
//       process.on('exit', toExit)
//     }
//   }
// }

export default {
  input : 'src/index.rease.tsx',
  output: {
    sourcemap: false,
    format   : 'iife',
    name     : 'app',
    file     : 'app/mathematica.html'
  },
  plugins: [
    {
      transform(code, id) {
        // if (id in temp) return temp[id]
        if (id.endsWith('.svg')) {
          return `export default ${JSON.stringify(encodeURIComponent(code.trim()))}`
        }
        return null
      }
    },
    rease({ env: 'client', debug: true }),
    {
      name: 'sucrase-custom',
      transform(code, id) {
        if (/\.[mc]?tsx?$/.test(id)) {
          try {
            code = sucrase(code, { transforms: ['typescript'] }).code
          } catch (e) {
            console.error('sucrase-custom')
            console.error(e)
          }
          return { code }
        }
        return null
      }
    },
    resolve({
      browser   : true,
      extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json']
    }),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    // !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    // !production && livereload('app'),

    {
      async transform(code) {
        if (production) {
          try {
            code = (await babel(code, {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    corejs     : 3,
                    loose      : true,
                    bugfixes   : true,
                    modules    : false,
                    useBuiltIns: 'entry', // 'entry', 'usage'
                    targets    : '> 1%, not dead, ie 11',
                  }
                ]
              ],
              plugins: ['@babel/plugin-transform-runtime']
            })).code
          } catch (e) {
            console.error('babel-custom')
            console.error(e)
          }
        }
        return { code }
      },
      async renderChunk(code) {
        if (production) {
          try {
            code = (await terser(code, {
              safari10       : true,
              mangle         : true,
              module         : true,
              toplevel       : true,
              compress       : true,
              keep_classnames: false
            })).code
          } catch (e) {
            console.error('terser-custom')
            console.error(e)
          }
        }

        // return '/* eslint-disable */\n' + code
        return `<!DOCTYPE html>
<html lang="en" style="touch-action:pan-down;">

<head>
  <meta charset='utf-8'>
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <meta name="theme-color" content="#333333">

  <title>Happy math</title>

  <style>
  ${bs}
  </style>
</head>

<body>
<script>
/* eslint-disable */
${code}
</script>
</body>

</html>
        `
      }
    }
  ],
  watch: { clearScreen: false }
}
