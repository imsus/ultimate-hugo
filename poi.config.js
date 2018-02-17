//@ts-check

const glob = require('glob-all')
const path = require('path')
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const TailwindExtractor = require('./tailwind-extractor')

module.exports = options => ({
  presets: [
    require('poi-preset-offline')({
      pwa: './resources/pwa.js',
      pluginOptions: {
        externals: ['/index.html'],
        excludes: ['**/.*', '**/_*', '**/*.map', '**/*.gz'],
        ServiceWorker: { credentials: 'omit', mode: 'no-cors' },
        AppCache: false
      }
    })
  ],
  dist: 'static',
  staticFolder: 'resources/static',
  sourceMap: false,
  html: false,
  extractCSS: true,
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
  templateCompiler: true,
  extendWebpack(config) {
    if (options.mode === 'production') {
      config.plugin('purge').use(PurgeCSSPlugin, [
        {
          paths: glob.sync([
            path.join(__dirname, 'layouts/**/*.html'),
            path.join(__dirname, 'resources/js/**/*.vue')
          ]),
          extractors: [
            {
              extractor: TailwindExtractor,
              extensions: ['html', 'js', 'vue']
            }
          ]
        }
      ])
    }
  }
})
