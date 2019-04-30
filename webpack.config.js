const path = require("path");

module.exports = {
  devServer: {
    index: "index.html",
    historyApiFallback: {
      index: "index.html"
    },
    host: "10.8.0.41",
    useLocalIp: false,
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    disableHostCheck: true,
    port: 1234,
    hot: true
  },
  output: {
    publicPath: "/"
  },
  resolve: {
    alias: {
      react: "preact-compat",
      "react-dom": "preact-compat",
      // Not necessary unless you consume a module using `createClass`
      "create-react-class": "preact-compat/lib/create-react-class",
      // Not necessary unless you consume a module requiring `react-dom-factories`
      "react-dom-factories": "preact-compat/lib/react-dom-factories"
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: "images/[hash]-[name].[ext]"
            }
          }
        ]
      }
    ]
  }
};
