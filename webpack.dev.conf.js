
// --mode development

let webpack = require('webpack')
let merge = require('webpack-merge')
let baseWebpackConfig = require('./webpack.base.conf')

let devWebpackConfig = merge(baseWebpackConfig, {
  devtool: 'cheap-module-eval-source-map',
  mode: 'development',
  devServer:{
    contentBase: baseWebpackConfig.externals.paths.dist,
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors:true
    }
  },
  module:{
		rules: [
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file-loader',
				options: {
					name: `${PATHS.assets}fonts/[name].[ext]`
				}
			},
			{
				test: /\.(mp3|mp4|webp)(\?v=\d+\.\d+\.\d+)(\?.*)?$/,
				use: [{
					loader: 'file-loader'
				}]
			},
			{
				test: /\.module\.css$/i,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							modules: true,
						},
					},
				],
			},
			{
				test: /\.css|styl$/,
				//test: /\.(sa|sc|c)ss|styl$/,
				exclude: '/node_modules/',
				use:[
					'style-loader',
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							import: true,
							sourceMap: true,
							importLoaders: 2,
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							config: {
								path: `${PATHS.src}/js/postcss.config.js`
							}
						}
					},
					{
						loader: 'stylus-loader',
					},
				]
			},

		]
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    }),
  ]
})
module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig)
})