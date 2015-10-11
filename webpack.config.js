var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new webpack.DefinePlugin({
          'process.env': {
              NODE_ENV: JSON.stringify('development')
          }})
  ],
    module: {
        loaders: [
            {test: /\.js$/,
             loaders: ['babel?stage=1'],
             include: path.join(__dirname, 'src')}
            ,{test: /\.scss$/,
              loaders: ['style', 'css', 'sass'],
              include: path.join(__dirname, 'scss')
            }
        ]
  }
};
