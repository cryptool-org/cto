var path = require("path")
const common = require("./webpack.common");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { merge } = require('webpack-merge');
var HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    mode: "production",
    output: {
        //filename: "[name].[chunkhash].js", 
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            //filename: "[name].[contenthash].css",
            filename: "[name].css",
            chunkFilename: "[id].css",
          }),
     
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: false,
        }),
        new HtmlWebpackPlugin({
            filename: "frame.html",
            template: "./src/frame.html"
        }),
      
    ],
    optimization: {
           splitChunks: {
             cacheGroups: {
              vendor: {
               name: "node_vendors", // part of the bundle name and
                 // can be used in chunks array of HtmlWebpackPlugin
                 test: /[\\/]node_modules[\\/]/,
                chunks: "all",
               },
             },
           },
         },
   

}) 