var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: false,
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.min.js',
    publicPath: '/static/'
  },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
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
  ],
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
