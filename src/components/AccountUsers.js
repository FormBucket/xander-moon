import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import FontAwesome from 'react-fontawesome'

const AccountUsers = React.createClass({
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
            <ul className="page-nav">
              <li><Link to="account">Profile</Link></li>
              <li className="active">Users</li>
              <li><Link to="/account/integrations">Integrations</Link></li>
              <li><Link to="/account/billing">Billing</Link></li>
            </ul>
          </div>
        </div>
        <div className="wrapper">
          <div className="callout">
            <button onClick={this.handleNewUser}><FontAwesome name='plus' /> New User</button>
            <p>You have 4 out of 5 available active users in <Link to="account/billing">your plan</Link>.</p>
          </div>
          <div className="half-width">
            <form method="post" action="">

              <button className="button secondary" type="submit">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
})

export default AccountUsers
