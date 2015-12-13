import React, { PropTypes } from 'react'
import {Link} from 'react-router'

const Header = React.createClass({
  render () {
    return (
      <div className="header">
        <div className="wrapper">
          <Link to="/">
            FormBucket
          </Link>
          <Link style={{float: 'right', color: 'white' }} to="login">
            Login
          </Link>
        </div>
      </div>
    )
  }
})

export default Header
