'use strict';

const gulp = require('gulp');
const fs = require("fs");
const requireDir = require('require-dir');
const lib = requireDir("../../lib");

const config = require('./config.js');

gulp.task('compile_css', () => {
	return lib.build_scss(config.stylesPaths);
});

gulp.task("build_js", (cb) => {
	return lib.build_ts(config, cb);
});

gulp.task('build_kanban', ['compile_css', 'build_js']);