import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import AccountMenu from './AccountMenu'
import UserStore from '../stores/user'
import {deleteAccount, updateProfile} from '../stores/ActionCreator'
import {IF} from 'functionfoundry'
import {Link} from 'react-router'

const Account = React.createClass({
  getInitialState () {
    return {
      show_token: false,
      user: UserStore.getState(),
      active: UserStore.getPlan() && UserStore.getPlan().length > 0
    }
  },

  componentDidMount() {
    this.token = UserStore.addListener(this.handleUserChanged)
  },

  componentWillUnmount() {
    this.token.remove()
  },

  handleUserChanged() {
    this.setState({
      user: UserStore.getState(),
      active: UserStore.getPlan() && UserStore.getPlan().length > 0
    })
  },

  handleDelete() {
    deleteAccount()
    .then(n => {
      this.setState({ active: false })
    })
  },

  handleSave() {
    updateProfile()
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
            <div className="section">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" refs="fullName" name="displayName" value={this.state.user.name} placeholder="e.g. Nikola Tesla"/>
              <label htmlFor="orgName">Company / Org</label>
              <input type="text" refs="orgName" />
              <label htmlFor="emailAddress">Email Address</label>
              <input type="text" refs="emailAddress" name="username" value={this.state.user.email} placeholder="nikola@altcurrent.com"/>
            </div>
            <div className="section">
              <h4><FontAwesome name='lock' />  Change Password</h4>
              <label htmlFor="currentPassword">Current Password</label>
              <input type="password" refs="currentPassword" name="password" />
              <label htmlFor="newPassword">New Password</label>
              <input type="password" refs="newPassword" name="password" />
              <button className="button secondary" onClick={this.handleSave}>Save Changes</button>
            </div>
            <label>Remove local security token</label>
            <button className="button secondary" onClick={() => {
                localStorage.removeItem('token');
                this.props.history.push('/');
              } }>Log out</button>

            <hr />
            <label>Security token <button className="button secondary" onClick={() => this.setState({ show_token: !this.state.show_token })}>{this.state.show_token ? 'hide' : 'show' }</button></label>
            <textarea rows={4} value={this.state.show_token ? localStorage.token : ''} style={{ display: this.state.show_token ? '' : 'none' }} />

            { /*IF(this.state.active,
              <div>
                <hr />
                <label>Stop billing and unsubscribe from this service</label>
                <button className="button secondary" onClick={this.handleDelete}>Cancel Subscription</button>
              </div>,
              <div>
                <hr />
                Subscription is not active. <Link to="account/billing">Activate Subscription</Link>
              </div>
            ) */}
            {/* <hr />
            <label>Download account archive</label>
            <button className="button secondary" onClick={() => alert('tbd')}>Download Archive</button> */}
          </div>
        </div>
      </div>
    )
  }
})

  export default Account
