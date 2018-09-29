const gulp = require("gulp");
const fs = require("fs");
const requireDir = require("require-dir");
const lib = requireDir("./lib");

gulp.task("test", (cb) => lib.test(cb));