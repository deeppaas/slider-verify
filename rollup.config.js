const typescript = require('rollup-plugin-typescript2')
const { terser } = require('rollup-plugin-terser')
const commonjs = require('@rollup/plugin-commonjs')
// const postcss = require('rollup-plugin-postcss')
const styles = require('rollup-plugin-styles')
const path = require('path')
const sass = require('rollup-plugin-sass')

const config = {
  input: path.resolve(__dirname, './src/index.tsx'),
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      sourcemap: true,
      // 不设置，dist文件夹下就会是 /dist/packages/ui 这种
      preserveModulesRoot: 'src',
      // 按需加载
      preserveModules: true,
      // 目前应用就是css资源
      assetFileNames: 'assets/[name][extname]',
    },
  ],
  plugins: [
    sass(),
    styles({
      mode: 'extract',
    }),
    // postcss(),
    commonjs(),
    typescript(),
    terser(),
  ],
  external: ['react', 'classnames'],
}

module.exports = config
