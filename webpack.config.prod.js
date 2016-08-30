var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    formbucket: './js/index',
    nav: './js/nav',
    styles: './js/styles'
  },
  externals: {
    'highlight.js': 'hljs',
    'history': 'History',
    'react-router': 'ReactRouter',
    'react': 'React',
    'react-dom': 'ReactDOM',
    'react-renpm markable': 'ReactRemarkable',
    'remarkable': 'Remarkable',
    'moment': 'moment'
  },
  output: {
    path: path.join(__dirname, 'public', 'assets'),
    filename: '[name].js',
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        'FORMBUCKET_API_SERVER': JSON.stringify('https://api.formbucket.com')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
   }),
    new ExtractTextPlugin('formbucket.css')
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'js')
    }, {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract(
        "style",
        "css!sass")
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
        test: /\.md$/,
        loader: 'raw'
    }]
  }
};
