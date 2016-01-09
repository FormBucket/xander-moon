import hljs from 'highlight.js' // https://highlightjs.org/

export default {
  html: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        // Custom hack for homepage
        var tweaked = hljs.highlight(lang, str).value.replace(
          '<span class="hljs-string">"https://formbucket.com/f/ff4fu3"</span>',
          '<span class="hljs-string">"<span class="hljs-highlight">https://formbucket.com/f/ff4fu3</span>"</span>' );

        return tweaked;
      } catch (err) {}
    }

    try {
      return hljs.highlightAuto(str).value;
    } catch (err) {}

    return ''; // use external default escaping
  }
}
