import React, { PropTypes } from 'react'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'

var content = require('../content/api.md');

// API Documentation
const API = React.createClass({
  render () {
    return (
      <div id="api">
        <Markdown
          source={ content }
          options={ markdownOptions }
          />
      </div>
    )
  }
})

export default API
