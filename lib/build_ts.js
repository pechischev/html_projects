// lib/build_ts.js

const gulp = require('gulp');
const browserify = require("browserify");
const babelify = require("babelify");
const source = require('vinyl-source-stream');
const gutil = require('gulp-util');
const args = require('yargs').argv;

const tsify = require("tsify");
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');

const tslint = require("gulp-tslint");
const jsmin = require('gulp-jsmin');

/**
 * Function includes debug mode with the --debug argument/
 *
 * @param {{
 *    source: string,
 *    output: string
 * }} paths
 * @return {NodeJS.WritableStream}
 */
module.exports = function(paths) {
	const isDebug = !!args.debug;

	const build = browserify({ debug: isDebug })
		.transform(babelify.configure({presets: ["es2015", "react"], plugins: ['babel-polyfill']}))
		.require(paths.source, { entry: true })
		.transform("babelify")
		.plugin(tsify)
		.bundle()
		.on('error', gutil.log)
		.pipe(source('main.js'))
		.pipe(gulp.dest(paths.output))
		.on('end', () => {
			if (isDebug)
			{
				build
					.pipe(buffer())
					.pipe(sourcemaps.init({loadMaps: true}))
					.pipe(sourcemaps.write('./'))
					.pipe(gulp.dest(paths.output));
			}
			else
			{
				gulp.src(paths.output + 'main.js')
					.pipe(jsmin())
					.pipe(gulp.dest(paths.output))
			}
		});
	return build;
};

/**
 * @param {string} path
 * @return {NodeJS.WritableStream}
 */
module.exports.tslint = function (path) {
	return gulp.src(path)
		.pipe(tslint({
			formatter: "stylish"
		}))
		.on('error', gutil.log)
		.pipe(tslint.report({
			emitError: false
		}));
};
