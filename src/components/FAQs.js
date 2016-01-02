import React, { PropTypes } from 'react'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'

var content = require('../content/FAQs.md');

const FAQs = React.createClass({
  render () {
    return (
      <div>
        <div className="page-heading">
          <div className="wrapper">
            <h1>FAQs</h1>
          </div>
        </div>
        <div className="wrapper">
          <Markdown
            source={ content }
            options={ markdownOptions }
            />
        </div>
      </div>
    )
  }
})

export default FAQs
