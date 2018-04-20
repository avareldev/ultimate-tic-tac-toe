const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
let config = require('./webpack.config.js');

// set entry for browser. Bundle whole React app into bundle.js
config.entry = [
    require.resolve('react-dev-utils/webpackHotDevClient'),
    'react-hot-loader/patch',
    './src/entryPoint/dev.js'
];
config.output.filename = 'bundle.js';

config.module.rules = [
    ...config.module.rules,
    {
        test: /\.(css|sass|scss)$/,
        use: [{
            loader: 'style-loader',
            options: {
                sourceMap: true
            }
        }, {
            loader: "css-loader",
            options: {
                url: false,
                minimize: true,
                sourceMap: true
            }
        }, {
            loader: "sass-loader",
            options: {
                sourceMap: true
            }
        }]
    }
];

config.devServer = {
    historyApiFallback: true,
    hot: true
};

config.plugins =  [
    ...config.plugins,
    new HtmlWebpackPlugin({
        template: 'src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
];

module.exports = config;