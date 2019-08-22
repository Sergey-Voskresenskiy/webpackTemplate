
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
				test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
				exclude: `${baseWebpackConfig.externals.paths.fonts}`,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: `[name].[ext]`,
							outputPath: `${baseWebpackConfig.externals.paths.assets}img`,
							useRelativePath: true,
						},
					},
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: false,
							},
							optipng: {
								enabled: false,
							},
						},
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