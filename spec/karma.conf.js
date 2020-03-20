var json = require('rollup-plugin-json');
var istanbul = require('rollup-plugin-istanbul');
var alias = require('@rollup/plugin-alias');
var commonjs = require('rollup-plugin-commonjs');
var path = require('path');

// Karma configuration
module.exports = function (config) {

	// 	var libSources = require(__dirname + '/../build/build.js').getFiles();

	var files = [
		"spec/sinon.js",
		"spec/expect.js",


		"src/*.js",


		"node_modules/happen/happen.js",
		// "spec/suites/SpecHelper.js",
		"spec/suites/**/*.js",
		"dist/*.css"
	];

	config.set({
		// base path, that will be used to resolve files and exclude
		basePath: '../',

		plugins: [
			'karma-rollup-preprocessor',
			'karma-mocha',
			'karma-coverage',
			'karma-phantomjs-launcher',
			'karma-chrome-launcher',
			'karma-safari-launcher',
			'karma-firefox-launcher',
			'karma-jasmine',
			'karma-jasmine-ajax',
		],

		// frameworks to use
		frameworks: ['mocha'],

        client: {
          jasmine: {
            random: false
          }
        },

		// list of files / patterns to load in the browser
		files: files,
// 		proxies: {
// 			'/base/dist/images/': 'dist/images/'
// 		},
		exclude: [],

		// Rollup the ES6 Leaflet.markercluster sources into just one file, before tests
		preprocessors: {
			'node_modules/leaflet/dist/leaflet-src.esm.js': ['rollup'],
			'src/*': ['rollup'],
            'spec/suites/*': ['rollup'],
			'spec/after.js': ['rollup']
		},
		rollupPreprocessor: {
			// ...require('../rollup.config'),
			plugins: [
				json(),
				istanbul({exclude: [
                            'spec/suites/*',
                            'node_modules/**/*',
						    'node_modules/leaflet/dist/leaflet-src.esm.js'
                        ]}),
				alias({
					entries: [
						{find: 'leaflet', replacement: path.resolve(__dirname, '../node_modules/leaflet/dist/leaflet-src.esm.js')}
					]
        		}),
				commonjs()
			],
			output: {
				format: 'umd',
				name: 'Leaflet.markercluster'
			},
		},

		// test results reporter to use
		// possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
		reporters: ['dots'],

		// web server port
		port: 9876,

		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_WARN,

		// enable / disable colors in the output (reporters and logs)
		colors: true,

		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: false,

		// Start these browsers, currently available:
		// - Chrome
		// - ChromeCanary
		// - Firefox
		// - Opera
		// - Safari (only Mac)
		// - PhantomJS
		// - IE (only Windows)
		browsers: ['PhantomJS'],

		// If browser does not capture in given timeout [ms], kill it
		captureTimeout: 5000,

		// Workaround for PhantomJS random DISCONNECTED error
		browserDisconnectTimeout: 10000, // default 2000
		browserDisconnectTolerance: 1, // default 0

		// Continuous Integration mode
		// if true, it capture browsers, run tests and exit
		singleRun: true
	});
};
