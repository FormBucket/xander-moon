var Metalsmith  = require('metalsmith');
var markdown    = require('metalsmith-remarkable');
var layouts     = require('metalsmith-layouts');
var permalinks  = require('metalsmith-permalinks');

var s = new Date()
console.log('Metalsmith go')
Metalsmith(__dirname)
  .metadata({
    title: "My Static Site & Blog",
    description: "It's about saying »Hello« to the World.",
    generator: "Metalsmith",
    url: "http://www.metalsmith.io/"
  })
  .source('./pages')
  .destination('./public')
  .clean(false)
  .use(markdown(require('./markdown-options')))
  .use(permalinks())
  .use(layouts({
    engine: 'handlebars'
  }))
  .build(function(err, files) {
    if (err) { throw err; }
  });
console.log('Metalsmith out in', (new Date() - s) + 'ms')
