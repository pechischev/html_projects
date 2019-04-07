// lib/build_ts.js

const gulp = require("gulp");
const gutil = require("gulp-util");
const webpack  = require("webpack");
const args = require("yargs").argv;
const tslint = require("gulp-tslint");


/**
 * @param {string} path
 */
function tsLint(path) {
	gulp.src(path)
		.pipe(tslint({
			formatter: "stylish"
		}))
		.on("error", gutil.log)
		.pipe(tslint.report({
			emitError: false
		}));
}

/**
 * Function includes debug mode with the --debug argument
 *
 * @param {Object} config
 * @param {Function} cb
 * @return {NodeJS.WritableStream}
 */
module.exports = (config, cb) => {

	// tsLint(config.sourcePath);

	const isDebug = !!args.debug;

	return webpack(config.getJsConfig(isDebug), (err, stats) => {
		if(err)
		{
			throw new gutil.PluginError("webpack", err);
		}
		gutil.log("--compile\t", stats.toString({
			colors: true,
			progress: true
		}));
		cb();
	});
};
