const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
	mode: "development",
	watch: true,
	entry: {
		index: "./src/index.js",
		2: "./src/pages/2.js",
	},
	output: {
		filename: "[name].js",
		path: path.resolve(__dirname, "dist"),
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./src/index.html",
			filename: "index.html",
			chunks: ["index"],
		}),
		new HtmlWebpackPlugin({
			template: "./src/1.html",
			inject: false,
			filename: "1.html",
		}),
		new HtmlWebpackPlugin({
			template: "./src/2.html",
			filename: "2.html",
			chunks: ["2"],
		}),
	],
};
