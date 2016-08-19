import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import UserStore from '../stores/user'
import FontAwesome from 'react-fontawesome'

const Header = React.createClass({

  getInitialState: function() {
    return {
      user: UserStore.getUser(),
      show: false
    }
  },

  handleLinkClick() {
    this.setState({ show: false })
  },

  render () {

    var topRight = (
      <nav role="navigation">
        <a href="#" className="navigation-menu-button" onClick={(event) => this.setState({ show: !this.state.show })}>MENU</a>
        <ul id="js-navigation-menu" className={"navigation-menu" + (this.state.show ? ' show' : ' hide')}>
          <li className="nav-link">
	           <Link to="/api" onClick={this.handleLinkClick}>API</Link>
          </li>
          <li className="nav-link">
            <Link to="/signup" onClick={this.handleLinkClick}>Sign Up</Link>
          </li>
          <li className="nav-link">
            <Link to="/login" onClick={this.handleLinkClick}>Login</Link>
          </li>
        </ul>
      </nav>
    )

    if (UserStore.isUserLoggedIn()) {
      topRight = (
        <nav role="navigation">
          <a href="#" className="navigation-menu-button" onClick={(event) => this.setState({ show: !this.state.show })}>MENU</a>
          <ul className={"navigation-menu" + (this.state.show ? ' show' : ' hide')}>
            <li className="nav-link">
               <Link to="/api" onClick={this.handleLinkClick}>API</Link>
            </li>
            <li className="nav-link">
              <Link to="/buckets" onClick={this.handleLinkClick}>Buckets</Link>
            </li>
            <li className="nav-link">
              <Link to="/account/profile" onClick={this.handleLinkClick}>Account</Link>
            </li>
          </ul>
        </nav>
      )
    }

    return (
      <header className="navigation" role="banner">
        <div className="navigation-wrapper">
          <Link to="/" className="logo">
            <img src="/img/logo.svg" alt="FormBucket" />
          </Link>
          {topRight}
        </div>
      </header>
    )
  }
})

export default Header
