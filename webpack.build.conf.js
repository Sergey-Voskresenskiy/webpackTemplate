// --mode production

let webpack = require('webpack')
let merge = require('webpack-merge')
let baseWebpackConfig = require('./webpack.base.conf')

let buildWebpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module:{
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
        exclude: `${baseWebpackConfig.externals.paths.fonts}`, 
        use: [
          {
            loader: 'file-loader',
            options: {
              name: `[name].[ext]?[hash]`,
              outputPath: `${baseWebpackConfig.externals.paths.assets}img`,
              useRelativePath: true,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 60
              },
              optipng: {
                enabled: true,
                optimizationLevel: 7
              },
            },
          },
        ]
      },
    ]
  },
})

module.exports = new Promise((resolve, reject) => {
  resolve(buildWebpackConfig)
})