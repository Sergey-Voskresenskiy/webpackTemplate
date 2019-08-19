const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const glob = require('glob');
const DashboardPlugin = require("webpack-dashboard/plugin");
const { UnusedFilesWebpackPlugin } = require('unused-files-webpack-plugin');
const { DuplicatesPlugin } = require('inspectpack/plugin');


const PATHS = {
	src: path.join(__dirname, './src'),
	dist: path.join(__dirname, './dist'),
	fonts: path.join(__dirname,'./src/fonts'),
	assets: 'assets/',
}

module.exports = {
	externals: {
		paths: PATHS
	},
	entry: {
		app: PATHS.src
	},
	output: {
		path: PATHS.dist,
		filename: `${PATHS.assets}js/[name].[hash].js`,
		publicPath: '/'
	},
	module:{
		rules: [
			{
				test: /\.m?js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							'@babel/preset-env', {
								"exclude": ["transform-async-to-generator", "transform-regenerator"],

							}
						],
						plugins: [
							['@babel/plugin-proposal-optional-chaining'],
							['@babel/plugin-proposal-nullish-coalescing-operator'],
							["module:fast-async", { "spec": true }]
						]
					}
				},
				exclude: '/node_modules/'
			},
			{
				test: /\.html$/,
				use: [{
					loader: 'html-loader',
					options: {
						attrs: ['img:src','img:data-src'],
						minimize: false,
						interpolate: true,
					}
				}]
			},
			{
				test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file-loader',
				options: {
					name: `${PATHS.assets}fonts/[name].[hash].[ext]`
				}
			},
			{
				test: /\.(mp3|mp4|webp)(\?v=\d+\.\d+\.\d+)(\?.*)?$/,
				use: [{
					loader: 'file-loader'
				}]
			},
			{
				test: /\.(sa|sc|c)ss|styl$/,
				exclude: '/node_modules/',
				use:[
					'style-loader',
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader?sourceMap'
					},
					{
						loader: 'postcss-loader',
						options: {config: { path: `${PATHS.src}/js/postcss.config.js` } }
					},
					{
						loader: 'stylus-loader',
					},
				]
			},

		]
	},
	plugins: [
		new DashboardPlugin(),
		new UnusedFilesWebpackPlugin(),
		new DuplicatesPlugin(),
		new CleanWebpackPlugin(`${PATHS.dist}`,[{verbose: true}]),
		new MiniCssExtractPlugin({
			filename: `${PATHS.assets}css/[name].[hash].css`,
		}),
		...glob.sync(`${PATHS.src}/*.html`).map(htmlFile => {
			return new HtmlWebpackPlugin({
				filename: path.basename(htmlFile),
				template: htmlFile
			});
		}),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		}),
	],
	optimization: {
		minimizer: [
			new TerserPlugin({
				test: /\.js(\?.*)?$/i,
				parallel: true,
				sourceMap: true,
				terserOptions: {
					ie8: true,
					safari10: true,
					comments: false,
				},
				extractComments: {
					condition: /^\**!|@preserve|@license|@cc_on/i,
					filename: (file) => {
						return `${file}.LICENSE`;
					},
					banner: (licenseFile) => {
						return ``;
					},
				},
			})
		],
		splitChunks: {
			cacheGroups: {
				vendor: {
					name: 'vendors',
					test: /node_modules/,
					chunks: 'all',
					enforce: true
				}
			}
		}
	}
};