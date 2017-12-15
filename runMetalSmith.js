var Metalsmith  = require('metalsmith')
var markdown    = require('metalsmith-remarkable')
var layouts     = require('metalsmith-layouts')
var inPlace     = require('metalsmith-in-place')
var permalinks  = require('metalsmith-permalinks')
var hljs        = require('highlight.js')
var moment      = require('moment')

var s = new Date()
console.log('Metalsmith go')
Metalsmith(__dirname)
  .metadata({
    title: "My Static Site & Blog",
    description: "It's about saying »Hello« to the World.",
    generator: "Metalsmith",
    url: "http://www.metalsmith.io/",
    entropy: require('./package.json').entropy,
    __ts__: moment().format("YYYY-MM-DD-HH-MM")
  })
  .source('./pages')
  .destination('./public')
  .clean(false)
  .use(markdown({
    html: true,
    highlight: function (str, lang) {
      try {
        return hljs.highlightAuto(str).value;
      } catch (err) {}
    }
  }))
  .use(permalinks())
  .use(layouts({
    engine: 'handlebars'
  }))
  .use(inPlace({
    engine: 'handlebars'
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });
console.log('Metalsmith out in', (new Date() - s) + 'ms')
