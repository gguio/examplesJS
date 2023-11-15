const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: {
        index: "./src/index.js",
        2: "./src/pages/2.js",
        3: "./src/pages/3.js",
        4: "./src/pages/4.js",
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
        new HtmlWebpackPlugin({
            template: "./src/3.html",
            filename: "3.html",
            chunks: ["3"],
        }),
        new HtmlWebpackPlugin({
            template: "./src/4.html",
            filename: "4.html",
            inject: "body",
            chunks: ["4"],
        }),
    ],
};
