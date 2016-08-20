import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import FontAwesome from 'react-fontawesome'
import Nav from './Nav'

const Header = React.createClass({

  render () {
    return (
      <header className="navigation" role="banner">
        <div className="navigation-wrapper">
          <Link to="/" className="logo">
            <img src="/img/logo.svg" alt="FormBucket" />
          </Link>
          <Nav />
        </div>
      </header>
    )
  }
})

export default Header
