// lib/test.js

const fs = require("fs");
const gulp = require("gulp");
const mocha = require("gulp-mocha");
const gutil = require("gulp-util");

const webpack  = require("webpack");
const path = require('path');
const testConfig = require("./webpack.test");

const buildTestPath = path.resolve(__dirname, "../build/build_test");

function getFiles(dir, paths = []){
	var files = fs.readdirSync(dir);
	for (var i in files){
		var name = `${dir}\\${files[i]}`;
		if (fs.statSync(name).isDirectory()){
			getFiles(name, paths);
		} else {
			paths.push(name);
		}
	}
	return paths;
}

/**
 * @param {Function} cb
 * @return {NodeJS.WritableStream}
 */
module.exports = function(cb) {
	const testPath = path.join(__dirname, "../test");

	const paths = getFiles(testPath).map((path) => path.replace(/\\{1}/g, "/"));

	let entry = {};

	paths.forEach((filePath) => {
		const filename = filePath.substring(filePath.lastIndexOf('/') + 1);
		entry = Object.assign({[filename.replace(".ts", "")]: filePath}, entry); // TODO: реализовать уникальное имя файла
	});

	webpack(
		Object.assign(
			testConfig(),
			{
				entry,
				output: {
					filename: "[name].js",
					path: buildTestPath
				}
			}
		),
		() => {
			gutil.log("build successful test code");
			cb();
			gulp.src(buildTestPath + "**/*.js")
				.pipe(mocha({
					reporter: "spec"
				}))
				.on("error", () => gutil.log("Test failed"));
		}
	);
};