import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import FontAwesome from 'react-fontawesome'
import AccountMenu from './AccountMenu'

const AccountBilling = React.createClass({
  render () {
    return (
      <div>
        <div className="page-heading">
          <div className="wrapper">
            <h1>Account</h1>
          </div>
        </div>
        <div className="page-nav-container">
          <div className="wrapper">
            <AccountMenu active="Integrations" />
          </div>
        </div>
        <div className="wrapper">
          <div className="half-width">
            To come....
          </div>
        </div>
      </div>
    )
  }
})

export default AccountBilling
