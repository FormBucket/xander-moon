import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import AccountMenu from './AccountMenu'

const Account = React.createClass({
  getInitialState () {
    return {
      show_token: false
    }
  },
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

            <div className="callout">
              <label for="fullName">Full Name</label>
              <input type="text" refs="fullName" name="displayName" value="Sean King" placeholder="e.g. Nikola Tesla"/>
              <label for="orgName">Company / Org</label>
              <input type="text" refs="orgName" />
              <label for="emailAddress">Email Address</label>
              <input type="text" refs="emailAddress" name="username" value="sean@functionfoundry.com" placeholder="nikola@altcurrent.com"/>
              <h4><FontAwesome name='lock' />  Change Password</h4>
              <label for="currentPassword">Current Password</label>
              <input type="password" refs="currentPassword" name="password" />
              <label for="newPassword">New Password</label>
              <input type="password" refs="newPassword" name="password" />
              <button className="button secondary" type="submit">Save Changes</button>
            </div>
            <hr />
            <label>Remove local security token</label>
            <button className="button secondary" onClick={() => {
                localStorage.removeItem('token');
                this.props.history.push('/');
              } }>Log out</button>

            <hr />
            <label>Security token <button className="button secondary" onClick={() => this.setState({ show_token: !this.state.show_token })}>{this.state.show_token ? 'hide' : 'show' }</button></label>
            <textarea rows={4} value={this.state.show_token ? localStorage.token : ''} style={{ display: this.state.show_token ? '' : 'none' }} />

            <hr />
            <label>Delete your account and data</label>
            <button className="button secondary" onClick={() => alert('tbd')}>Delete Profile</button>
            <hr />
            <label>Download account archive</label>
            <button className="button secondary" onClick={() => alert('tbd')}>Download Archive</button>
          </div>
        </div>
      </div>
    )
  }
})

  export default Account
