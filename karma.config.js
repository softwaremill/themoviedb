const webpack = require('./webpack.web.config.js');
const path = require('path');

module.exports = function(config) {
	config.set({
		logLevel: config.LOG_DEBUG,
		basePath: '',
		frameworks: ['jasmine-ajax', 'jasmine'],
		client: {
			clearContext: false
		},
		files: [
			path.join(__dirname, 'node_modules', 'es6-promise', 'dist', 'es6-promise.min.js'),
			'karma.tests.js'
		],
		preprocessors: {
			'./web/**/*.(ts|js|tsx)': ['sourcemap'],
			'karma.tests.js': ['webpack', 'sourcemap']
		},
		mime: {
			'text/x-typescript': ['ts', 'tsx']
		},
		port: 9876,
		colors: true,
		autoWatch: false,
		browsers: ['PhantomJS2'],
		singleRun: true,
		webpack: webpack
	});
};
