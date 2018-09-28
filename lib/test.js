// lib/test.js

const gulp = require("gulp");
const mocha = require("gulp-mocha");
const args = require("yargs").argv;
const path = require('path');

/**
 * @return {NodeJS.WritableStream}
 */
module.exports = function() {
	const testPath = path.join(__dirname, "../test/**");
	return gulp.src(testPath)
		.pipe(mocha({
			reporter: "progress",
			require: ["ts-node/register"]
		}));
};