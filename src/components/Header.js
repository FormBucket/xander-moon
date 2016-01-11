import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import UserStore from '../stores/user'
import FontAwesome from 'react-fontawesome'
import {Animate} from 'react-set-animate'

const Header = React.createClass({

  getInitialState: function() {
    return {
      user: UserStore.getUser(),
      show: false
    }
  },

  render () {
    var topRight = (
      <nav role="navigation">
        <a href="#" className="navigation-menu-button" id="js-mobile-menu">MENU</a>
        <ul id="js-navigation-menu" className="navigation-menu show">
          <li className="nav-link"><Link to="login">Login</Link></li>
        </ul>
      </nav>
    )

    if (UserStore.isUserLoggedIn()) {
      topRight = (
        <nav role="navigation">
          <a href="#" className="navigation-menu-button" onClick={(event) => this.setState({ show: !this.state.show })}>MENU</a>
          <ul className={"navigation-menu" + (this.state.show ? ' show' : ' hide')}>
            <li className="nav-link more"><Link to="/">Function Foundry</Link>
              <ul className="submenu">
                <li><Link to="/">UXTalent</Link></li>
                <li><Link to="/">PennyMac</Link></li>
              </ul>
            </li>
            <li className="nav-link"><Link to="/forms">Forms</Link></li>
            <li className="nav-link"><Link to="/endpoints">Endpoints</Link></li>
            <li className="nav-link"><Link to="/buckets">Buckets</Link></li>
            <li className="nav-link"><Link to="/account/profile">Account</Link></li>
            <li className="nav-link"><a onClick={() => {
              localStorage.removeItem('token')
              this.props.history.push('/')
            }}>Logout</a></li>
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
