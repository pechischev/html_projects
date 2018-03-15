'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
const gulpSequence = require('gulp-sequence');

const fs = require("fs");
const browserify = require("browserify");
const babelify = require("babelify");
const source = require('vinyl-source-stream');
const gutil = require('gulp-util');

const notify = require('gulp-notify');
const tsify = require("tsify");
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');
const tslint = require("gulp-tslint");
const mocha = require('gulp-mocha');

const sassFile = 'css/styles.scss';
const mainPath = "./src/main.tsx";

const paths = {
	build: {
		css: './build/css/',
		js: './build/js/'
	},
	src: './src/**'
};

const onError = (err) => {
    notify.onError({
        title:    "Error",
        message:  "<%= error %>",
    })(err);
    this.emit('end');
};

gulp.task("build_ts", () => {
	return browserify({ debug: true })
		.transform(babelify.configure({ presets : ["es2015"] }))
		.require(mainPath, { entry: true })
		.transform("babelify")
		.plugin(tsify)
		.bundle()
		.on('error', gutil.log)
		.pipe(source('main.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init({loadMaps: true}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(paths.build.js));
});

gulp.task("tslint", () =>
	gulp.src(paths.src)
		.pipe(tslint({
			formatter: "verbose"
		}))
		.pipe(tslint.report())
);

gulp.task('compile_css', () => {
    gulp.src(sassFile)
        .pipe(sass())
        .pipe(gulp.dest(paths.build.css));
});

gulp.task('build_js', (cb) => {
    gulpSequence('tslint', 'build_ts', cb);
});

gulp.task('test', () => {
	return gulp.src('test/**')
		.pipe(mocha({
			reporter: 'progress',
			require: ['ts-node/register']
		}));
});

gulp.task('build', ['compile_css', 'build_js', 'test']);

gulp.task('watch', () => {
    gulp.watch(sassFile, gulpSequence('compile_css'));
    gulp.watch(paths.src, ['build_js']);
});