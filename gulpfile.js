// Gulp Packages
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var clean = require('gulp-clean');
var lazypipe = require('lazypipe');
var rename = require('gulp-rename');
var flatten = require('gulp-flatten');
var tap = require('gulp-tap');
var header = require('gulp-header');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-ruby-sass');
var prefix = require('gulp-autoprefixer');
var minify = require('gulp-minify-css');
var karma = require('gulp-karma');
var package = require('./package.json');

// Paths to project folders
var paths = {
	output : 'dist/',
	scripts : {
		input : [ 'src/js/*' ],
		output : 'dist/js/'
	},
	styles : {
		input : 'src/sass/**/*.scss',
		output : 'dist/css/'
	},
	static : 'src/static/**',
	test : {
		spec : [ 'test/spec/**/*.js' ],
		coverage: 'test/coverage/',
		results: 'test/results/'
	}
};

// Template for banner to add to file headers
var banner = {
	full :
		'/**\n' +
		' * <%= package.name %> v<%= package.version %>\n' +
		' * <%= package.description %>, by <%= package.author.name %>.\n' +
		' * <%= package.repository.url %>\n' +
		' * \n' +
		' * Free to use under the MIT License.\n' +
		' * http://gomakethings.com/mit/\n' +
		' */\n\n',
	min :
		'/**' +
		' <%= package.name %> v<%= package.version %>, by Chris Ferdinandi' +
		' | <%= package.repository.url %>' +
		' | Licensed under MIT: http://gomakethings.com/mit/' +
		' */\n'
};

// Lint, minify, and concatenate scripts
gulp.task('scripts', ['clean'], function() {

	var jsTasks = lazypipe()
		.pipe(header, banner.full, { package : package })
		.pipe(gulp.dest, paths.scripts.output)
		.pipe(rename, { suffix: '.min' })
		.pipe(uglify)
		.pipe(header, banner.min, { package : package })
		.pipe(gulp.dest, paths.scripts.output);

	return gulp.src(paths.scripts.input)
		.pipe(plumber())
		.pipe(flatten())
		.pipe(tap(function (file, t) {
			if ( file.stat.isDirectory() ) {
				var name = file.relative + '.js';
				return gulp.src(file.path + '/*.js')
					.pipe(concat(name))
					.pipe(jsTasks());
			}
		}))
		.pipe(jsTasks());
});

// Process, lint, and minify Sass files
gulp.task('styles', ['clean'], function() {
	return gulp.src(paths.styles.input)
		.pipe(plumber())
		.pipe(sass({style: 'expanded', noCache: true}))
		.pipe(flatten())
		.pipe(prefix('last 2 version', '> 1%'))
		.pipe(header(banner.full, { package : package }))
		.pipe(gulp.dest(paths.styles.output))
		.pipe(rename({ suffix: '.min' }))
		.pipe(minify())
		.pipe(header(banner.min, { package : package }))
		.pipe(gulp.dest(paths.styles.output));
});

// Copy static files into output folder
gulp.task('static', ['clean'], function() {
	return gulp.src(paths.static)
		.pipe(plumber())
		.pipe(gulp.dest(paths.output));
});

// Lint scripts
gulp.task('lint', function () {
	return gulp.src(paths.scripts.input)
		.pipe(plumber())
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));
});

// Remove prexisting content from output and test folders
gulp.task('clean', function () {
	return gulp.src([
			paths.output,
			paths.test.coverage,
			paths.test.results
		], { read: false })
		.pipe(plumber())
		.pipe(clean());
});

// Run unit tests
gulp.task('test', function() {
	return gulp.src([paths.scripts.input + '/../**/*.js'].concat(paths.test.spec))
		.pipe(plumber())
		.pipe(karma({ configFile: 'test/karma.conf.js' }))
		.on('error', function(err) { throw err; });
});

// Combine tasks into runner
gulp.task('default', [
	'lint',
	'clean',
	'static',
	'scripts',
	'styles',
	'test'
]);