import React, { PropTypes } from 'react'
import {Link} from 'react-router'

const Footer = React.createClass({
  render () {
    return (
      <div className="footer">
        <Link to="faqs">FAQs</Link> | <Link to="api">API</Link>
      </div>
    )
  }
})

export default Footer
