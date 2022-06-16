import * as fs from 'fs'
import * as path from 'path'

import rease from 'rollup-plugin-rease'
import babel from '@rollup/plugin-babel'
// import css from 'rollup-plugin-css-only'
import sucrase from '@rollup/plugin-sucrase'
import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
// import livereload from 'rollup-plugin-livereload'

const bs = fs.readFileSync(path.resolve('src/bootstrap.min.css'), 'utf8')

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

    // we'll extract any component CSS out into
    // a separate file - better for performance
    // css({ output: 'bundle.css' }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser   : true,
      dedupe    : ['svelte', 'rease'],
      extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json']
    }),
    sucrase({ exclude: ['node_modules/**'], transforms: ['typescript'] }),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    // !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    // !production && livereload('app'),

    production && babel({
      babelHelpers: 'bundled',
      // babelrc: false,
      presets     : [
        [
          '@babel/preset-env',
          {
            corejs     : 3,
            loose      : true,
            bugfixes   : true,
            modules    : false,
            useBuiltIns: 'entry', // 'entry', 'usage'
            targets    : '> 1%, not dead'
          }
        ]
      ]
    }),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser(),
    {
      renderChunk(code) {
        // return '/* eslint-disable */\n' + code
        return `<!DOCTYPE html>
<html lang="en">

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
