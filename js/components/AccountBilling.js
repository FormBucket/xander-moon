import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import FontAwesome from 'react-fontawesome'
import Billing from './Billing'

const AccountBilling = React.createClass({
  render () {
    return (
      <div>
        <div className="page-heading">
          <div className="wrapper">
            <h1>Account</h1>
          </div>
        </div>
        <Billing nowrap={true} history={this.props.history} redirect={false} hideHeading={true} />
      </div>
    )
  }
})

export default AccountBilling
