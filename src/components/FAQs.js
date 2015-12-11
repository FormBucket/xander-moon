import React, { PropTypes } from 'react'
import Markdown from 'react-remarkable'
import hljs from 'highlight.js' // https://highlightjs.org/

var content = require('../content/FAQs.md');

const FAQs = React.createClass({
  render () {
    return (
      <div id="faqs">
        <Markdown
          source={ content }
          options={ {
            highlight: function (str, lang) {
              console.log(str, lang)
              if (lang && hljs.getLanguage(lang)) {
                try {
                  return hljs.highlight(lang, str).value;
                } catch (err) {}
              }

              try {
                return hljs.highlightAuto(str).value;
              } catch (err) {}

              return ''; // use external default escaping
            }
          }}
          />
      </div>
    )
  }
})

export default FAQs
