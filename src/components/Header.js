import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import UserStore from '../stores/user'
var FontAwesome = require('react-fontawesome');

const Header = React.createClass({

  getInitialState: function() {
    return {}
  },

  componentDidMount: function() {
    this.storeSubscription = UserStore.addListener(this.handleUserStoreChanged)
  },

  componentWillUnmount: function() {
    this.storeSubscription.remove();
  },


  handleUserStoreChanged: function() {
    if (UserStore.isUserLoggedIn()) {
      this.setState({
        user: UserStore.getUser()
      })
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

    if (this.state.user) {
      topRight = (
        <div className="nav">
          <ul className="menu">
            <li><Link to="/dashboard">Dashboard</Link></li>
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
