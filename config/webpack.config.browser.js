const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
let config = require('./webpack.config.js');

// set entry for browser. Bundle whole React app into browser.js
const hash = Math.random().toString().split('.')[1];
const target = '/public/' + hash + '.browser.js';
config.entry = {
    [target]: './src/entryPoint/browser.js'
};

config.module.rules = [
    ...config.module.rules,
    {
        test: /\.(css|sass|scss)$/,
        use: [
            MiniCssExtractPlugin.loader
        , {
            loader: "css-loader",
            options: {
                url: false,
                minimize: true,
                sourceMap: true
            } // translates CSS into CommonJS
        }, {
            loader: "sass-loader",
            options: {
                sourceMap: true
            } // compiles Sass to CSS
        }]
    }
];

// include browser bundle in the index.html template
config.plugins =  [
    ...config.plugins,
    new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css",
    }),
    new HtmlWebpackPlugin({
        template: 'src/index.html',
        chunks: [target]
    })
];

module.exports = config;