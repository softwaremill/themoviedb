const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const production = process.argv.indexOf('-p') !== -1;

const plugins = [
];

module.exports = {
	entry: "./server/server.ts",
	target: "node",
	externals: [nodeExternals()],
	node: {
		__dirname: false,
		__filename: false,
	},
	output: {
		filename: "server.js",
		path: __dirname + (production ? "/dist" : "/build")
	},
	devtool: production ? '' : "source-map",
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".json"]
	},
	module: {
		rules: [
			{ test: /\.tsx?$/, loader: "awesome-typescript-loader" },
			{ enforce: "pre", test: /\.js$/, loader: ["source-map-loader"] }
		]
	},
	plugins: plugins
};
