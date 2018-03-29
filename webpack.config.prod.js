var path = require("path");
var webpack = require("webpack");
var moment = require("moment");

let load = module => [
  "babel-polyfill",
  "es6-promise",
  "whatwg-fetch",
  "./js/" + module
];

module.exports = {
  devtool: "source-map",
  entry: {
    app: load("app")
  },
  externals: {
    //'formula': 'Formula',
    "highlight.js": "hljs",
    moment: "moment",
    remarkable: "Remarkable"
  },
  // 'resolve': {
  //    'alias': {
  //     'react': 'preact-compat',
  //     'react-dom': 'preact-compat'
  //   }
  // },
  output: {
    path: path.join(__dirname, "public", "assets"),
    filename: "[name]-" + moment().format("YYYY-MM-DD-HH-mm") + ".js",
    publicPath: "/assets/"
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
        FORMBUCKET_API_SERVER: JSON.stringify("https://api.formbucket.com")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ["babel-loader"],
        include: path.join(__dirname, "js")
      },
      {
        test: /\.scss$/,
        loaders: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.md$/,
        loader: "raw-loader"
      }
    ]
  }
};
