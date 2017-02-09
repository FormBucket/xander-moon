import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import version from '../version'

const Footer = React.createClass({
  render () {
    return (
      <div className="footer">
        <Link to="/" className="logo">
          <img src="/img/logo-purple.svg" alt="FormBucket" />
        </Link>
        <p>
          &copy; 2015-2017 <a href="https://formbucket.com">FormBucket, LLC</a>
      </p>
      <div>
        <a href="/about">About</a> | <a href="/contact">Contact</a> | <a href="/terms">Terms</a> | <a href="/privacy-policy">Privacy Policy</a>
      </div>
    </div>
    )
  }
})

export default Footer
