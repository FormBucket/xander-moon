// import hljs from 'highlight.js' // https://highlightjs.org/
//
// export default {
//   html: true,
//   highlight: function (str, lang) {
//     if (lang && hljs.getLanguage(lang)) {
//       try {
//         // Custom hack for homepage
//         var tweaked = hljs.highlight(lang, str).value.replace(
//           '<span class="hljs-string">"' + process.env.FORMBUCKET_API_SERVER + '/f/homepage"</span>',
//           '<span class="hljs-string">"<span class="hljs-highlight">' + process.env.FORMBUCKET_API_SERVER + '/f/homepage</span>"</span>' );
//
//         return tweaked;
//       } catch (err) {}
//     }
//
//     try {
//       return hljs.highlightAuto(str).value;
//     } catch (err) {}
//
//     return ''; // use external default escaping
//   }
// }

'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _highlight = require('highlight.js');

var _highlight2 = _interopRequireDefault(_highlight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// https://highlightjs.org/

exports.default = {
  html: true,
  highlight: function highlight(str, lang) {
    if (lang && _highlight2.default.getLanguage(lang)) {
      try {
        // Custom hack for homepage
        var tweaked = _highlight2.default.highlight(lang, str).value.replace('<span class="hljs-string">"' + process.env.FORMBUCKET_API_SERVER + '/f/homepage"</span>', '<span class="hljs-string">"<span class="hljs-highlight">' + process.env.FORMBUCKET_API_SERVER + '/f/homepage</span>"</span>');

        return tweaked;
      } catch (err) {}
    }

    try {
      return _highlight2.default.highlightAuto(str).value;
    } catch (err) {}

    return ''; // use external default escaping
  }
};
