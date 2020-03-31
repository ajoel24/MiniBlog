const path = require("path");

module.exports = {
	entry: {
		app: ["@babel/polyfill", "./src/js/index.js"]
	},
	output: {
		path: path.resolve(__dirname, "build"),
		filename: "index.bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				query: {
					presets: ["@babel/preset-env"]
				}
			}
		]
	}
};
