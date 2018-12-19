/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import hljs from "highlight.js/lib/highlight.js"; // https://highlightjs.org/
import xml from "highlight.js/lib/languages/xml.js"; // https://highlightjs.org/
import js from "highlight.js/lib/languages/javascript.js"; // https://highlightjs.org/
import "highlight.js/styles/solarized-light.css"; // https://highlightjs.org/

hljs.registerLanguage("xml", xml);
hljs.registerLanguage("javascript", js);

export default {
  html: true,
  highlight: function(str, lang) {
    lang = lang || "html";

    try {
      // Custom hack for homepage
      var tweaked = hljs
        .highlight(lang, str)
        .value.replace(
          '<span class="hljs-string">"' +
            process.env.FORMBUCKET_API_SERVER +
            '/f/homepage"</span>',
          '<span class="hljs-string">"<span class="hljs-highlight">' +
            process.env.FORMBUCKET_API_SERVER +
            '/f/homepage</span>"</span>'
        );

      return tweaked;
    } catch (err) {}

    return ""; // use external default escaping
  }
};
