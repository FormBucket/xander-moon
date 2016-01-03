import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import UserStore from '../stores/user'
var FontAwesome = require('react-fontawesome');

const Header = React.createClass({

  getInitialState: function() {
    return {
      user: UserStore.getUser()
    }
  },

  render () {
    var topRight = (
      <div className="nav">
        <ul className="menu">
          <li><Link to="login">Login</Link></li>
        </ul>
      </div>
    )

    if (UserStore.isUserLoggedIn()) {
      topRight = (
        <div className="nav">
          <ul className="menu">
            <li><Link to="/dashboard">Buckets</Link></li>
            <li><Link to="/account">Account</Link></li>
            <li><a href="/logout">Logout</a></li>
          </ul>
        </div>
      )
    }

    return (
      <div className="header">
        <div className="wrapper">
          <Link to="/">
            <img className="logo" src="/img/logo.svg" alt="FormBucket" />
          </Link>
          {topRight}
        </div>
      </div>
    )
  }
})

export default Header
