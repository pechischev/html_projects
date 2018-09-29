const path = require("path");

const config = {
	resolve: {
		modules: [path.resolve(__dirname, "../src"), "node_modules"],
		extensions: [ ".tsx", ".ts", ".js"]
	},
	plugins: [],
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
			test: /\.tsx?$/,
			exclude: /node_modules/,
			use: {
				loader: "ts-loader"
			}
		}]
	},
	performance: {
		hints: false
	},
};

module.exports = (debugOption) => {
	config.mode = debugOption ? "development" : "production";
	return config;
};