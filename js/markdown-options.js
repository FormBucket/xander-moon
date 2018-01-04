import hljs from 'highlight.js' // https://highlightjs.org/
require('highlight.js/lib/languages/xml.js') // https://highlightjs.org/
require('highlight.js/lib/languages/javascript.js') // https://highlightjs.org/

export default {
  html: true,
  highlight: function (str, lang) {

    lang = lang || "html";

    try {
      // Custom hack for homepage
      var tweaked = hljs.highlight(lang, str).value.replace(
        '<span class="hljs-string">"' + process.env.FORMBUCKET_API_SERVER + '/f/homepage"</span>',
        '<span class="hljs-string">"<span class="hljs-highlight">' + process.env.FORMBUCKET_API_SERVER + '/f/homepage</span>"</span>' );

        return tweaked;
      } catch (err) {}

      return ''; // use external default escaping
    }
  }
