// lib/test.js

const gulp = require('gulp');
const mocha = require('gulp-mocha');
const args = require('yargs').argv;

/**
 * With the argument --path you can specify the path for the file with the test
 *
 * @return {NodeJS.WritableStream}
 */
module.exports = function() {
	const path = (args.path) ? args.path : 'test/**';

	return gulp.src(path)
		.pipe(mocha({
			reporter: 'progress',
			require: ['ts-node/register']
		}));
};