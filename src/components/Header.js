import React, { PropTypes } from 'react'
import {Link} from 'react-router'

const Header = React.createClass({
  render () {
    return (
      <div id="header">
        FormBucket
        <Link style={{float: 'right', marginRight: 40, color: 'white' }} to="login">
          Login
        </Link>
      </div>
    )
  }
})

export default Header
