var koa = require("koa");
var app = koa();
var serveViews = require("koa-front-matter-views");
var serve = require("koa-static");
var send = require("koa-send");
var accesslog = require("koa-accesslog");
var _ = require("koa-route");
var moment = require("moment");

app.use(accesslog());

if (+process.env.SERVE_HMR) {
  console.log("serve assets from webpack.");
  var webpack = require("webpack");
  var webpackConfig = require("./webpack.config.dev.js");
  var compiler = webpack(webpackConfig);
  var hotMiddleware = require("webpack-hot-middleware")(compiler);

  var webpackMiddleware = require("koa-webpack-dev-middleware");
  app.use(
    webpackMiddleware(compiler, {
      noInfo: false,
      lazy: false,
      publicPath: webpackConfig.output.publicPath
    })
  );

  app.use(function*(next) {
    yield hotMiddleware.bind(null, this.req, this.res);
    yield next;
  });
}

if (process.env.SERVE_STATIC) {
  console.log("serve generated views.");
  // serve generate pages
  app.use(
    serveViews({
      defaults: {
        __DEV__: true,
        __ts__: moment().format("YYYY-MM-DD")
      }
    })
  );

  // serve static assets
  app.use(serve("."));

  // serve the index.html page
  app.use(function*() {
    yield this.serveView("index");
  });
} else {
  // serve static assets
  app.use(serve("public"));

  // serve the index.html page
  app.use(function*() {
    yield send(this, "./public/index.html");
  });
}

app.listen(3000, process.env.BIND_IP);

console.log(`Listening to ${process.env.BIND_IP}:3000.`);
