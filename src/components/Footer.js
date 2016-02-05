import React, { PropTypes } from 'react'
import {Link} from 'react-router'

const Footer = React.createClass({
  render () {
    return (
      <div className="footer">
      <p>
        &copy; 2015-2016 FormBucket.com <Link to="faqs">FAQs</Link> | <Link to="api">API</Link> | <Link to="affiliates">Affiliates</Link> | <Link to="support">Support</Link>
      </p>
      <div id="version">
        v0.1.0
      </div>
      </div>
    )
  }
})

export default Footer
