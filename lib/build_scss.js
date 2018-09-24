// lib/build_scss.js

const gulp = require("gulp");
const sass = require("gulp-sass");

/**
 * @param {{
	 *   source: string,
	 *   target: string
	 * }} paths
 * @return {NodeJS.WritableStream}
 */
module.exports = function(paths) {
	return gulp.src(paths.source)
		.pipe(sass())
		.pipe(gulp.dest(paths.target));
};