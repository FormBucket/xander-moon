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

  handleSeePlans() {
    this.props.history.push('/subscribe')
  },

  render () {

    var topRight = (
      <nav role="navigation">
        <a href="#" className="navigation-menu-button" id="js-mobile-menu">MENU</a>
        <ul id="js-navigation-menu" className="navigation-menu show">
          <li className="nav-link"><a href="#" onClick={this.handleSeePlans}>Sign Up</a></li>
          <li className="nav-link"><Link to="login">Login</Link></li>
        </ul>
      </nav>
    )

    if (UserStore.isUserLoggedIn()) {
      topRight = (
        <nav role="navigation">
          <a href="#" className="navigation-menu-button" onClick={(event) => this.setState({ show: !this.state.show })}>MENU</a>
          <ul className={"navigation-menu" + (this.state.show ? ' show' : ' hide')}>
            <li className="nav-link"><Link to="/buckets">Buckets</Link></li>
            <li className="nav-link"><Link to="/account/profile">Account</Link></li>
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
