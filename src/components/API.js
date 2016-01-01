import React, { PropTypes } from 'react'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'

var content = require('../content/api.md');

// API Documentation
const API = React.createClass({
  render () {
    return (
      <div>
        <div className="page-heading">
          <div className="wrapper">
            <h1>API</h1>
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

export default API
