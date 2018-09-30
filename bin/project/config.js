const path = require("path");
const commonConfig = require("../../lib/webpack.common");


module.exports.sourcePath = ["../../src/**", "./src/*.ts"];

module.exports.stylesPaths = {
	source: "./style/styles.scss",
	target: "./build/css/"
};

module.exports.getJsConfig = (debugOption) => {
	const config = {
		entry: "./src/main.ts",
		output: {
			filename: "main.js",
			path: path.resolve(__dirname, "build/js")
		}
	};

	return Object.assign(commonConfig(debugOption), config);
};