import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import version from '../version'

const Footer = React.createClass({
  render () {
    return (
      <div className="footer">
      <p>
        &copy; 2015-2016 FormBucket.com
      </p>
      <div id="version">
        Version {version}
      </div>
      </div>
    )
  }
})

export default Footer
