var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  externals: {
    'highlight.js': 'hljs',
    'react': 'React',
    'react-dom': 'ReactDOM',
    'remarkable': 'Remarkable',
    'moment': 'moment'
  },
  entry: {
    formbucket: ['webpack-hot-middleware/client', './src/index'],
    nav: ['webpack-hot-middleware/client', './src/nav']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
        test: /\.md$/,
        loader: 'raw'
    }]
  }
};
