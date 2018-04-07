'use strict';

const gulp = require('gulp');
const watch = require('gulp-watch');
const gulpSequence = require('gulp-sequence');

const fs = require("fs");
const requireDir = require('require-dir');
const lib = requireDir("../../lib");

const paths = {
	build: {
		css: './build/css/',
		js: './build/js/'
	},
	src: '../../src/**',
	main: './src/main.ts',
	style: 'style/styles.scss',
};

gulp.task("tslint", () => lib.build_ts.tslint(paths.src));

gulp.task('compile_css', () => {
	return lib.build_scss({ source: paths.style, output: paths.build.css});
});

gulp.task("build_ts", () => {
	return lib.build_ts({
		source: paths.main,
		output: paths.build.js,
	});
});

gulp.task('build_js', (cb) => gulpSequence('tslint', 'build_ts', cb));

gulp.task('build_kanban', ['compile_css', 'build_js', 'test']);

gulp.task('watch', () => {
    gulp.watch(paths.style, gulpSequence('compile_css'));
    gulp.watch(paths.src, ['build_js']);
});