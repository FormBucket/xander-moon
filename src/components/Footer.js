import React, { PropTypes } from 'react'
import {Link} from 'react-router'

const Footer = React.createClass({
  render () {
    return (
      <div className="footer">
      <p>
        &copy; 2015 FormBucket <Link to="faqs">FAQs</Link> | <Link to="api">API</Link>
      </p>
      <p>
        Forged in California by <a href="http://functionfoundry.com">FunctionFoundry</a>
      </p>
      </div>
    )
  }
})

export default Footer
