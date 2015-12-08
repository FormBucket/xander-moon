import React, { PropTypes } from 'react'
import Markdown from 'react-remarkable'

const FAQs = React.createClass({
  render () {
    return (
      <div id="faqs">
        <Markdown source={ "content" } />
      </div>
    )
  }
})

export default FAQs
