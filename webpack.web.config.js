const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const production = process.argv.indexOf('-p') !== -1;

const serverUrl = "http://localhost:3000";
const imageUrl = "http://image.tmdb.org/t/p";
const nodeEnv = process.env.NODE_ENV || "development";

const serverVariables = {
    "process.env": {
        NODE_ENV: JSON.stringify(nodeEnv)
    },
    SERVER_URL: JSON.stringify(serverUrl),
    IMAGE_URL: JSON.stringify(imageUrl)
};

const plugins = [
	new HtmlWebpackPlugin({
		template: './web/index.ejs',
		filename: 'index.html',
		inject: true
	}),
	new ExtractTextPlugin("app.[contenthash].css"),
    new webpack.DefinePlugin(serverVariables),
    new webpack.ProvidePlugin({
        jQuery: 'jquery',
        $: 'jquery',
        jquery: 'jquery'
    }),
    // new CleanWebpackPlugin([production ? './dist' : './build']),
];

module.exports = {
	plugins: plugins,
	entry: "./web/app.tsx",
	output: {
		filename: production ? "app.[hash].js" : "app.js",
		path: __dirname + (production ? "/dist" : "/build"),
		publicPath: '/'
	},
	devtool: production ? '' : "source-map",
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"]
	},
	module: {
		rules: [
			{ test: /\.tsx?$/, loader: "awesome-typescript-loader" },
			{ enforce: "pre", test: /\.js$/, loader: ["source-map-loader"] },
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: "css-loader"
				})
			},
			{
				test: /\.png$/,
				loader: "url-loader",
				options: {
					limit: 100000
				}
			},
			{
				test: /\.jpg$/,
				loader: "file-loader"
			},
			{
				test: /\.gif$/,
				loader: "file-loader"
			},
			{
				test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url-loader',
				options: {
					limit: 100000,
					mimeType: 'application/font-woff'
				}
			},
			{
				test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url-loader',
				options: {
					limit: 100000,
					mimeType: 'application/octet-stream'
				}
			},
			{
				test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'file-loader'
			},
			{
				test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
				loader: 'url-loader',
				options: {
					limit: 100000,
					mimeType: 'image/svg+xml'
				}
			}
		]
	},

	devServer: {
		hot: true,
		contentBase: [path.resolve(__dirname, 'build'), path.resolve(__dirname, 'assets')],
		publicPath: '/',
		historyApiFallback: true,
	}
};

