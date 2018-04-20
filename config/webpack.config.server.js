let config = require('./webpack.config.js');
const fetch = require('node-fetch');

// set libraryTarget to umd, so we can require it in server.js
config.output.libraryTarget = 'umd';
// set target to node, so we can use it in our express server
config.target = 'node';
// set entry point. Compile only the app without React Dom entry point
config.entry = {
    './app.js': './src/App.js',
    './reducers.js': './src/reducers/index.js'
};

config.module.rules = [
    ...config.module.rules,
    {
        test: /\.(css|sass|scss)$/,
        use: [{
            loader: "css-loader"
        }, {
            loader: "sass-loader"
        }]
    }
];

config.externals = ['react-helmet'];

module.exports = config;