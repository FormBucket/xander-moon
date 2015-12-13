import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import UserStore from '../stores/user'

const Header = React.createClass({

  getInitialState: function() {
    return {}
  },

  componentWillMount: function() {
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
      <Link style={{float: 'right', color: 'white' }} to="login">
        Login
      </Link>
    )

    if (this.state.user) {
      topRight = (
        <div style={{float: 'right', color: 'white' }} >
          <Link to="/dashboard">Dashboard</Link> Welcome, {this.state.user.displayName} <a href="/logout">Logout</a>
        </div>
      )
    }

    return (
      <div className="header">
        <div className="wrapper">
          <Link to="/">
            FormBucket
          </Link>
          {topRight}
        </div>
      </div>
    )
  }
})

export default Header
