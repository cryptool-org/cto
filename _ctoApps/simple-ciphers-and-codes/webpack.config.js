const HtmlWebPackPlugin = require("html-webpack-plugin")
const FileIncludePlugin = require("file-include-webpack-plugin")

module.exports = {
    entry: {
        "atbash": "./applications/atbash/index.js"
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name]/index.js"
    },
    devServer: {
        port: 4200
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: ["/node_modules/", "/bin/"],
            use: ["babel-loader"]
        }, {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        }]
    },
    plugins: [
        new HtmlWebPackPlugin({
            templateContent: ({htmlWebpackPlugin}) => `
                <html>
                <head>
                    ${htmlWebpackPlugin.tags.headTags}
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css">
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/font-awesome@5.15.4/css/font-awesome.min.css">
                </head>
                <body>
                    <div id="react-spawnpoint"></div>
                    ${htmlWebpackPlugin.tags.bodyTags}
                </body>
                </html>
            `
        }),
        new FileIncludePlugin({
            source: "./applications"
        })
    ]
}
