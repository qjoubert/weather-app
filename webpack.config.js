const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist/'
	},
	module: {
		rules: [
			{
				test: /\.html$/,
				loader: 'html-loader',
				options: {
					minimize: true,
				}
			},
			{
				test: /\.scss$/,
				use: [
					'style-loader',
					'css-loader',
					'sass-loader',
				]
			},
			{
				test: /\.(jpg|gif|png|svg)$/,
				loader: 'file-loader',
				options: {
					outputPath: 'assets/images',
				}
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: './src/index.html'
		}),
	]
}