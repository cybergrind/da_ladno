'use strict';

let path = require('path');
let webpack = require('webpack');


let ENV = process.env;
let PRODUCTION = ENV.NODE_ENV == 'production';


let devtool = PRODUCTION ? false : 'eval';
let entry, plugins;

if (PRODUCTION){
    entry = ['./src/index'];
    plugins = [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(ENV.NODE_ENV)
            }}),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compressor: {
                warnings: false,
                drop_console: true,
                screw_ie8: true
            }
        })
    ];
} else {
    entry = [
        'webpack-hot-middleware/client',
        './src/index'
    ];
    plugins = [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(ENV.NODE_ENV)
            }})
    ];
}

module.exports = {
    devtool, entry, plugins,
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    module: {
        loaders: [
            {test: /\.jsx?$/,
             loaders: ['babel?stage=1'],
             include: path.join(__dirname, 'src')}
            ,{test: /\.scss$/,
              loaders: ['style', 'css', 'sass'],
              include: path.join(__dirname, 'scss')
            }
        ]
  }
};
