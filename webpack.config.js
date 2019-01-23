const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');


const DIST_DIR = path.resolve(__dirname, "dist");
const SRC_DIR = path.resolve(__dirname, "src");

const config = {
    // the first file the webpack should start with to do the bundling
    entry: SRC_DIR + "/app/app.js",

    // where to put the bundle
    output: {
        path: DIST_DIR,
        filename: "bundle.[hash].js"
    },

    // webpack-dev-server settings
    devServer: {
        contentBase: DIST_DIR,
        port: 3300
    },

    // what modules to use and their settings
    module: {
        rules: [
            {
                // process all files ending with .js in SRC_DIR folder, but ignore node_modules
                // folder using babel-loader, for details re babel presets and plugins see .babelrc
                test: /\.js?/,
                exclude: /node_modules/,
                include: SRC_DIR,
                loader: "babel-loader",
                // alternativly presets and plugins could be setup using "query" key below
                // query: {
                //     presets: ["@babel/preset-react", "@babel/preset-env"]
                // }
            }
        ],

    },

    // Webpack plugins
    plugins: [
        new HTMLWebpackPlugin({
            // use index.html to "generate" a new index.html with appended
            // "bundle.[hash].js" to the body tag
            template: path.join(__dirname, 'src/index.html')
        }),
        // use this plugin to add 'async' to the script tag which contains
        // "bundle.[hash].js"
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'async'
        })
    ]
};

module.exports = config;