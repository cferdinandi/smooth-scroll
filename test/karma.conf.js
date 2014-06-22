module.exports = function (config) {
	config.set({
		basePath : '',
		autoWatch : true,
		frameworks: ['jasmine'],
		browsers : ['PhantomJS'],
		plugins : [
			'karma-spec-reporter',
			'karma-phantomjs-launcher',
			'karma-jasmine',
			'karma-coverage',
			'karma-htmlfile-reporter'
		],
		reporters : ['spec', 'coverage', 'html'],
		preprocessors: {
			'../src/js/**/*.js': 'coverage'
		},
		coverageReporter: {
			type : 'html',
			dir : 'coverage/'
		},
		htmlReporter: {
			outputFile: 'results/unit-tests.html'
		}
	});
};