const path = require('path');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

/*
    Basic webpack config to compile a react app.
    Inputs are added in the browser and server config.
*/
module.exports = {
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name]'
    },
    module:{
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            }]
        },{
            test: /\.(png|jpg|gif)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    publicPath: '/public/images/',
                    outputPath: 'public/images/',
                    context: ''
                }  
            }]
        }]
    },
    devtool: 'source-map',
    plugins: []
}