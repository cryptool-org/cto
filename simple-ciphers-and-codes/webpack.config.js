const HtmlWebPackPlugin = require("html-webpack-plugin")
const FileIncludePlugin = require("file-include-webpack-plugin")

module.exports = (env, argv) => {

    let config =  {

        // add an entry for every new application here
        entry: {
            "atbash": "./applications/atbash/index.js",
            "railfence": "./applications/railfence/index.js"
        },

        // everything will be built to "dist/<appname>"
        output: {
            clean: true,
            path: __dirname + "/dist",
            filename: "[name]/index.js"
        },

        // `npm run serve` starts a dev server
        devServer: {
            port: 4200
        },

        // compile js/jsx and css
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

        // exclude react for bundle size
        // (react can be provided by CTO or CDN)
        externals: {
            "react": "React",
            "react-dom": "ReactDOM",
            "react-dom/client": "ReactDOM"
        },

        // 
        plugins: [
            new FileIncludePlugin({
                source: "./applications"
            })
        ]

    }

    // create index.html files in memory for when running `npm run serve`
    // (makes the app bundles available at http://localhost:4200/<appname>)
    if(env.WEBPACK_SERVE) config.plugins.push(new HtmlWebPackPlugin({
        filename: "[name]/index.html",
        templateContent: ({htmlWebpackPlugin}) => `
            <html>
            <head>

                <!-- embed bootstrap v5 and font-awesome v6 -->
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css">
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>

                <!-- embed react v18 and react-dom (so we can exclude it from our bundles) -->
                <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
                <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
                    
                <style>html,body{background: #222}</style>
            </head>
            <body>
                <div class="container"><div id="react-spawnpoint"></div></div>
            </body>
            </html>
        `
    }))

    return config

}
