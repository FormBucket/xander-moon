import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import AccountMenu from './AccountMenu'

const Account = React.createClass({
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
            <AccountMenu active="profile" />
          </div>
        </div>
        <div className="wrapper">
          <div className="half-width">
            <form method="post" action="/signup">
              <label for="fullName">Full Name</label>
              <input type="text" refs="fullName" name="displayName" value="Sean King" placeholder="e.g. Nikola Tesla"/>
              <label for="emailAddress">Email Address</label>
              <input type="text" refs="emailAddress" name="username" value="sean@functionfoundry.com" placeholder="nikola@altcurrent.com"/>
              <div className="callout">
                <h4><FontAwesome name='lock' />  Change Password</h4>
                <label for="currentPassword">Current Password</label>
                <input type="password" refs="currentPassword" name="password" />
                <label for="newPassword">New Password</label>
                <input type="password" refs="newPassword" name="password" />
              </div>
              <button className="button secondary" type="submit">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
})

export default Account
