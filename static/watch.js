// handle rebuilding static site
var chokidar = require('chokidar');
var {run} = require('./run-metal-smith')

var watcher = chokidar.watch('./(pages|layouts)/**/*.(html|md)', {
  ignored: /[\/\\]\./, persistent: true
});

// 'add', 'addDir' and 'change' events also receive stat() results as second
// argument when available: http://nodejs.org/api/fs.html#fs_class_fs_stats
watcher.on('change', function(path, stats) {
  if (stats) console.log('File', path, 'changed size to', stats.size);
  run()
});

console.log('watching...')
