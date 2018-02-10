var moment = require('moment')
var path = require('path');

module.exports = {
  output: {
    path: path.join(__dirname, 'public', 'assets'),
    filename: '[name]-' + moment().format('YYYY-MM-DD') + '.js',
    publicPath: '/assets/'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
      },
      {
        test: /\.scss$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }]
      }
    ]
  }
};
