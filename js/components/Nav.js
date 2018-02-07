import React, { PropTypes } from 'react'
import UserStore from '../stores/user'
import {Link} from 'xander'


class Nav extends React.Component {
  state = {
    show: false
  }
  render() {
    let {state} = this;

    if (UserStore.isUserLoggedIn()) {
      return (
        <nav role="navigation">
          <a href="#" className="navigation-menu-button" onClick={(event) => this.setState({ show: !state.show })}>MENU</a>
          <ul className={"navigation-menu" + (state.show ? ' show' : ' hide')}>
            <li className="nav-link">
               <Link to="/guides">Guides</Link>
            </li>
            <li className="nav-link">
              <Link to="/buckets">Buckets</Link>
            </li>
            <li className="nav-link">
              <Link to="/account">Account</Link>
            </li>
          </ul>
        </nav>
      )
    }

    return (
      <nav role="navigation">
        <a href="#" className="navigation-menu-button" onClick={(event) => this.setState({ show: !state.show })}>MENU</a>
        <ul id="js-navigation-menu" className={"navigation-menu" + (state.show ? ' show' : ' hide')}>
          <li className="nav-link">
             <Link to="/guides">Guides</Link>
          </li>
          <li className="nav-link">
            <Link to="/signup">Sign Up</Link>
          </li>
          <li className="nav-link">
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>
    )

  }
}

export default Nav
