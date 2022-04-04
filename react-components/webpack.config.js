/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

'use strict';
const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const paths = {
	BUILD: path.resolve(__dirname, 'build'),
	PUBLIC: path.resolve(__dirname, 'public'),
	SRC: path.resolve(__dirname, 'src')
};

const appOptions = {
	appName: 'React Components',
	mainPath: 'ReactComponents',
};

module.exports = (env, options) => {

	const nodeEnv = options && options.mode ? options.mode : env && env.NODE_ENV ? env.NODE_ENV : 'production';
	const isDev = nodeEnv === 'development';
	const isProd = !isDev;

	const processEnv = {
		NODE_ENV: JSON.stringify(nodeEnv),
		APP_NAME: JSON.stringify(appOptions.appName),
		MAIN_PATH: JSON.stringify(`/${appOptions.mainPath}`),
	};

	if (isProd) {
		processEnv.ROUTE_PREFIX = JSON.stringify(appOptions.mainPath ? `/${appOptions.mainPath}` : '');
	}

	const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

	const cssLoaders = extra => {
		const loaders = [
			{
				loader: MiniCssExtractPlugin.loader,
				options: {
					hmr: isDev,
					reloadAll: true
				},
			},
			'css-loader'
		];

		if (extra) {
			loaders.push(extra);
		}

		return loaders;
	};

	const plugins = () => {
		const base = [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				template: './public/index.html',
				favicon: './public/favicon.ico',
				filename: './index.html',
				cache: false,
				minify: { collapseWhitespace: isProd }
			}),
			new MiniCssExtractPlugin({
				filename: filename('css')
			}),
			new CopyWebpackPlugin([
				{
					from: paths.PUBLIC + '/locales',
					to: paths.BUILD + '/locales'
				}
			]),
			new webpack.DefinePlugin({ 'process.env': processEnv }),
			//new webpack.IgnorePlugin(/\.\/locale$/)
		];

		return base;
	};

	const config = {
		entry: ['babel-polyfill', path.join(paths.SRC, 'index.tsx'),],
		output: {
			path: paths.BUILD,
			publicPath: appOptions.mainPath && appOptions.mainPath.length > 0 ? `/${appOptions.mainPath}/` : '/',
			filename: filename('js'),
		},
		devtool: isDev ? 'source-map' : '',
		plugins: plugins(),
		node: { fs: 'empty', },
		resolve: {
			extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
			plugins: [
				new TsconfigPathsPlugin({
					configFile: path.resolve(__dirname, './tsconfig.json'),
					extensions: ['.ts', '.tsx', '.js', '.jsx'],
				})
			],
			alias: {
				NodeModules: path.resolve('./node_modules')
			}
		},
		module: {
			rules: [
				{
					test: /\.css$/,
					exclude: /node_modules/,
					use: cssLoaders(),
					sideEffects: true,
				},
				{
					test: /\.s[ac]ss$/,
					exclude: /node_modules/,
					use: cssLoaders('sass-loader')
				},
				{
					test: /\.html$/,
					exclude: /node_modules/,
					use: [
						{
							loader: 'html-loader',
							options: { minimize: isProd },
						},
					],
				},
				{
					test: /\.(png|jpg|svg|gif|otf|ttf|woff|woff2|eot)$/,
					exclude: /node_modules/,
					use: ['file-loader']
				},
				{
					test: /\.(jsx?)$/,
					exclude: /node_modules/,
					use: ['babel-loader'],
				},
				{
					test: /\.tsx?$/,
					exclude: [/node_modules/],
					use: [
						{
							loader: 'babel-loader'
						},
						{
							loader: 'ts-loader',
							options: {
								configFile: 'tsconfig.json',
							}
						}
					],
				},
			],
		},
	};

	if (isDev) {
		config.devServer = {
			contentBase: paths.SRC,
			openPage: `${appOptions.mainPath}/`,
			host: '0.0.0.0',
			port: 3005,
			historyApiFallback: { index: appOptions.mainPath && appOptions.mainPath.length > 0 ? `/${appOptions.mainPath}/` : '/', },
			open: false,
			hot: true,
			stats: 'errors-only',
			overlay: {
				warnings: true,
				errors: true,
			},
		};
	}
	else {
		config.devServer = {
			compress: true,
		};
		config.optimization = {
			minimize: true,
			minimizer: [new TerserWebpackPlugin()],
			runtimeChunk: 'single',
			splitChunks: {
				chunks: 'all',
				maxInitialRequests: Infinity,
				minSize: 0,
				cacheGroups: {
					'vendor-react': {
						test: /\\node_modules\\react.*\\/,
						name: "vendor-react"
					},
					'vendor-materialUi': {
						test: /\\node_modules\\@material-ui\\/,
						name: 'vendor-materialUi'
					},
					'vendor-utility': {
						test: /\\node_modules\\(mobx|axios|lodash|i18next|date-fns)\\/,
						name: 'vendor-utility'
					},
					'vendor': {
						test: /\\node_modules\\((?!react|@material-ui|mobx|axios|lodash|i18next|date-fns).)*\\/,
						name: 'vendor'
					},
				},
			}
		};
	}

	return config;
};

