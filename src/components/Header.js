import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import UserStore from '../stores/user'
import Menu from './Menu'
import FontAwesome from 'react-fontawesome'

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
          <Menu items={[{
            text: 'Bucket List',
            href: '/bucket-list',
            onClick: (item, event) => {
              console.log()
              this.props.history.push(item.href)
            }
          }, {
            text: 'Account',
            href: '/account',
            onClick: (item, event) => this.props.history.push(item.href)
          }, {
            text: 'Profile',
            href: '/bucket-list',
            onClick: (item, event) => console.log(this, item, event),
            items: [{
              text: 'Setting',
              href: '/profile',
              onClick: (item, event) => this.props.history.push(item.href)
            }, {
              text: 'Logout',
              href: '/logout',
              onClick: (item, event) => this.props.history.push(item.href)
            }]
          }]} />
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
