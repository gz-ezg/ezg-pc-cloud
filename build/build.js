'use strict'
require('./check-versions')()
process.env.NODE_ENV = 'production'

if(process.argv.slice(2)[0].split('=')[1] == "build:hash"){
  process.env.OWN_SPACE = "build:hash"
}else if(process.argv.slice(2)[0].split('=')[1] == "build:history"){
  process.env.OWN_SPACE = "build:history"
}else{
  process.env.OWN_SPACE = "jenkins"
}

// const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
// const spinner = ora('building for production...')
// spinner.start()

const webpack = require('webpack');
const config = require('./webpack.prod.conf');

rm(path.join(path.resolve(__dirname, '../dist')), err => {
  if (err) throw err
  webpack(config, (err, stats) => {
    // spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkGroups: false,
      chunkModules: false,
      //  不显示载入的资源
      assets: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
