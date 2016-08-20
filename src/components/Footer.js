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
        <a href="/about">About</a> | <a href="/contact">Contact</a> | <a href="/terms">Terms</a> | <a href="/privacy-policy">Privacy Policy</a>
      </div>
    </div>
    )
  }
})

export default Footer
