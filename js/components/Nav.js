import React, { PropTypes } from 'react'
import UserStore from '../stores/user'
import {Link} from 'react-router'

const Nav = React.createClass({

  getInitialState: function() {
    return {
      show: false
    }
  },

  handleLinkClick() {
    this.setState({ show: false })
  },

  render () {

    if (UserStore.isUserLoggedIn()) {
      return (
        <nav role="navigation">
          <a href="#" className="navigation-menu-button" onClick={(event) => this.setState({ show: !this.state.show })}>MENU</a>
          <ul className={"navigation-menu" + (this.state.show ? ' show' : ' hide')}>
            <li className="nav-link">
               <a href="/guides">Guides</a>
            </li>
            <li className="nav-link">
              <Link to="/buckets" onClick={this.handleLinkClick}>Buckets</Link>
            </li>
            <li className="nav-link">
              <Link to="/account" onClick={this.handleLinkClick}>Account</Link>
            </li>
          </ul>
        </nav>
      )
    }

    return (
      <nav role="navigation">
        <a href="#" className="navigation-menu-button" onClick={(event) => this.setState({ show: !this.state.show })}>MENU</a>
        <ul id="js-navigation-menu" className={"navigation-menu" + (this.state.show ? ' show' : ' hide')}>
          <li className="nav-link">
             <a href="/guides">Guides</a>
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

  }
})

export default Nav
