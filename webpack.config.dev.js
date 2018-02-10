var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var moment = require('moment')

let load = (module) => ['webpack-hot-middleware/client', './js/' + module]

module.exports = {
  devtool: 'source-map',
  entry: {
    app: load('app')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-' + moment().format('YYYY-MM-DD') + '.js',
    publicPath: '/assets/'
  },
  // 'resolve': {
  //  'alias': {
  //    'react': 'preact-compat',
  //    'react-dom': 'p  react-compat'
  //  }
  // },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        'FORMBUCKET_API_SERVER': JSON.stringify(process.env.API_URI||'https://api-dev.formbucket.com')
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      include: path.join(__dirname, 'js')
    }, {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
        test: /\.md$/,
        loader: 'raw-loader'
    }]
  }
};
