import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import version from '../version'

const Footer = React.createClass({
  render () {
    return (
      <div className="footer">
      <p>
        &copy; 2015-2016 <a href="https://websitehq.com">WebsiteHQ, LLC</a>
      </p>
      <div>
       <a href="/contact-us">Contact us</a> | <a href="/terms">Terms</a> | <a href="/privacy-policy">Privacy Policy</a>
      </div>
      <div id="version">
        Version {version}
      </div>
      </div>
    )
  }
})

export default Footer
