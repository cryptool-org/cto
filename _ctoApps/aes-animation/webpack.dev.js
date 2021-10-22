var path = require("path")
const common = require("./webpack.common.js");
const { merge } = require('webpack-merge');
var HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    mode: "development",
    output: {
        filename: "rijndael.bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    devServer: {
        open: true,
        port: 8081,
    },
    plugins: [
      
        new MiniCssExtractPlugin({ }),
   
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: false,
        }),
        new HtmlWebpackPlugin({
            filename: "frame.html",
            template: "./src/frame.html"
        })
    ]
})