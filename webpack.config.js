// https://thesoftwaresimpleton.com/blog/2019/03/15/ts-code-splitting

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = (env) => {
	const isProduction = env === 'production';

	return {
		entry: ['@babel/polyfill', './src/app.js'],
		output: {
			path: path.join(__dirname, 'dist'),
			filename: isProduction
				? '[name].[contenthash:8].chunk.js'
				: '[name].chunk.js',
			chunkFilename: isProduction
				? '[name].[contenthash:8].chunk.js'
				: '[name].chunk.js',
			// add this line alongside with dev-server.historyApiFallback = true
			// to make dev-server reload when on nested root
			// see https://github.com/ReactTraining/react-router/issues/676#issuecomment-174073981
			publicPath: isProduction ? '' : '/',
		},
		module: {
			rules: [
				{
					loader: 'babel-loader',
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
				},
				{
					test: /\.(scss|css)$/,
					use: [
						// 'css-hot-loader',
						{
							loader: MiniCssExtractPlugin.loader,
							options: {
								hmr: !isProduction,
								sourceMap: true,
							},
						},
						{
							loader: 'css-loader',
							options: {
								sourceMap: true,
							},
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: true,
							},
						},
					],
				},
				{
					test: /\.(ttf|otf|eot|svg|woff|woff2)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								outputPath: 'fonts/',
							},
						},
					],
				},
				{
					test: /\.(jpg|png|gif)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
								outputPath: 'images/',
							},
						},
					],
				},
			],
		},
		plugins: (isProduction
			? []
			: [ /* new BundleAnalyzerPlugin() */ ]
		).concat([
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: 'public/index.html',
				favicon: 'public/images/favicon.png',
			}),
			new HtmlWebpackPlugin({
				filename: '404.html',
				template: 'public/404.html',
				inject: false,
			}),
			new MiniCssExtractPlugin({
				filename: isProduction
					? '[name].[contenthash:8].chunk.css'
					: '[name].chunk.css',
				chunkFilename: isProduction
					? '[name].[contenthash:8].chunk.css'
					: '[name].chunk.css',
			}),
			new CopyWebpackPlugin([{ from: 'public/resume.pdf', to: 'documents/' }]),
		]),
		devtool: isProduction ? 'source-map' : 'inline-source-map',
		devServer: {
			// contentBase: path.join(__dirname, 'dist'),
			// watchContentBase: true, // A workaround to be able to watch for html file changes
			historyApiFallback: true,
		},
		mode: 'development',
		resolve: {
			extensions: ['.js', '.jsx'],
		},
	};
};
