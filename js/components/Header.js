import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import FontAwesome from 'react-fontawesome'
import Nav from './Nav'
import UserStore from '../stores/user'

const Header = React.createClass({

  render () {
    return (
      <header className="navigation" role="banner">
        <div className="navigation-wrapper">
          <Link to={UserStore.isUserLoggedIn() ? "/buckets" : "/"} className="logo">
            <img src="/img/purple-logo.svg" alt="FormBucket" />
          </Link>
          <Nav />
        </div>
      </header>
    )
  }
})

export default Header
