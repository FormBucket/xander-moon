import React, { PropTypes } from 'react'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'

var content = require('../content/FAQs.md');

const FAQs = React.createClass({
  render () {
    return (
      <div id="faqs">
        <Markdown
          source={ content }
          options={ markdownOptions }
          />
      </div>
    )
  }
})

export default FAQs
