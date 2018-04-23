//@ts-check

const glob = require('glob-all')
const path = require('path')
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const TailwindExtractor = require('./tailwind-extractor')
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = options => ({
  outDir: 'static',
  cleanOutDir: true,
  staticFolder: 'resources/static',
  sourceMap: false,
  html: false,
  css: {
    extract: true
  },
  filename: {
    js: 'js/[name].js',
    css: 'css/[name].css',
    fonts: 'fonts/[name].[ext]',
    images: 'images/[name].[ext]',
    chunk: 'js/[id].chunk.js'
  },
  copy: [
    { from: 'resources/static', to: './' }
  ],
  vue: {
    fullBuild: true
  },
  chainWebpack(config) {
    if (options.mode === 'production') {
      config.plugin('workbox').init(Plugin => new WorkboxPlugin.GenerateSW())
      // config.plugin('purge').use(PurgeCSSPlugin, [
      //   {
      //     paths: glob.sync([
      //       path.join(__dirname, 'layouts/**/*.html'),
      //       path.join(__dirname, 'resources/js/**/*.vue')
      //     ]),
      //     extractors: [
      //       {
      //         extractor: TailwindExtractor,
      //         extensions: ['html', 'js', 'vue']
      //       }
      //     ]
      //   }
      // ])
    }
  }
})
