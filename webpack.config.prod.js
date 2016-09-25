var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var moment = require('moment')

let load = (module) => ['es6-promise', 'whatwg-fetch', './js/' + module]

module.exports = {
  entry: {
    app: load('index'),
    nav: load('nav'),
    styles: load('styles')
  },
  externals: {
    'highlight.js': 'hljs',
    'history': 'History',
    'moment': 'moment',
    'react-router': 'ReactRouter',
    'react': 'React',
    'react-dom': 'ReactDOM',
    'remarkable': 'Remarkable'
  },
  output: {
    path: path.join(__dirname, 'public', 'assets'),
    filename: '[name]-' + moment().format('YYYY-MM-DD') + '.js',
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        // 'FORMBUCKET_API_SERVER': JSON.stringify('https://api.formbucket.com')
        'FORMBUCKET_API_SERVER': JSON.stringify('https://api.formbucket.com')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
   }),
    new ExtractTextPlugin('app-' + moment().format('YYYY-MM-DD') + '.css')
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
