import React, { PropTypes } from 'react'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'

var content = require('../content/FAQs.md');

const FAQs = React.createClass({
  componentDidMount() {
    // ensure user is scrolled to top
    window.scrollTo(0, 0)
  },
  render () {
    return (
      <div>
        <div className="page-heading">
          <div className="wrapper">
            <h1>FAQs</h1>
          </div>
        </div>
        <div className="wrapper">
          <div className="two-thirds">
            <Markdown
              source={ content }
              options={ markdownOptions }
              />
          </div>
        </div>
      </div>
    )
  }
})

export default FAQs
