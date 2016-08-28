var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

let load = (module) => ['webpack-hot-middleware/client', './js/' + module]

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  externals: {
    'highlight.js': 'hljs',
    'history': 'History',
    'react-router': 'ReactRouter',
    'react': 'React',
    'react-dom': 'ReactDOM',
    'remarkable': 'Remarkable',
    'moment': 'moment'
  },
  entry: {
    formbucket: load('index'),
    nav: load('nav'),
    styles: load('styles')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/assets/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        'FORMBUCKET_API_SERVER': JSON.stringify('https://api-dev.formbucket.com')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'js')
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
