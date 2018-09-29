const path = require("path");

const config = {
	mode: "development",
	resolve: {
		modules: [path.resolve(__dirname, "../test"), path.resolve(__dirname, "../src"), "node_modules"],
		extensions: [ ".ts", ".js"]
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["es2015"]
					}
				}
			},
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: {
					loader: "ts-loader"
				}
			}
		]
	},
	performance: {
		hints: false
	}
};

module.exports = () => config;