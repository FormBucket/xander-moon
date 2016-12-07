import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import {Link} from 'react-router'
import FlashMessage from './FlashMessage'
import {requestProfile, requestUpdateUser, requestDestroyAccount} from '../stores/webutils'
import CreditCardForm from './CreditCardForm'

const Account = React.createClass({
  getInitialState () {
    return {
      show_token: false,
      flash: undefined
    }
  },

  componentDidMount() {
    requestProfile()
    .then((user) => this.setState({ user: user }))
    .catch((error) => {
      localStorage.removeItem('token');
      this.props.history.push('/')
    })
  },

  handleDeleteAccount() {
    if (confirm("Your account and data will be gone forever. Continue?")) {
      requestDestroyAccount()
      .then(n => {
        localStorage.removeItem('token');
        this.props.history.push('/')
      })
    }
  },

  handleSave() {

    this.setState({ saving: true })
    requestUpdateUser({
      id: this.state.user.id,
      name: this.refs.name.value,
//      org: this.refs.org.value,
      email: this.refs.email.value,
      password: this.refs.password.value
    })
    .then(user => {
      this.setState({
        saving: false,
        flash: 'Saved'
      })

      setTimeout(() => this.setState({ flash: undefined }), 2000)

    })
    .catch(error => this.setState({
      saving: false,
      flash: 'Error saving'
    }))

  },

  render () {

    if (!this.state.user || !this.state.user.email) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <FlashMessage text={this.state.flash} />
        <div className="page-heading">
          <div className="wrapper">
            <h1>Account</h1>
          </div>
        </div>
        <div className="wrapper">
          <div className="half-width">
            <label htmlFor="fullName">Full Name</label>
            <input type="text" ref="name" name="displayName" defaultValue={this.state.user.name} placeholder="e.g. Nikola Tesla"/>
            {/*<label htmlFor="orgName">Company / Org</label>
              <in$put type="text" ref="org" defaultValue={this.state.user.org} />*/}
            <label htmlFor="emailAddress">Email Address</label>
            <input type="text" ref="email" name="username" defaultValue={this.state.user.email} placeholder="nikola@altcurrent.com"/>
            <label htmlFor="password"><FontAwesome name='lock' /> Change Password</label>
            <input type="password" ref="password" defaultValue="" />
            <CreditCardForm />
            <button disabled={this.state.saving} className="button secondary" onClick={this.handleSave}>Save Changes</button>
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
          <div className="account-sidebar">
            <p>
              <a onClick={() => {
                  localStorage.removeItem('token');
                  this.props.history.push('/');
                } }>Log Out
              </a>
            </p>
            <p>
              <a onClick={() => {
                  this.props.history.push('/billing');
                } }>Billing History
              </a>
            </p>
            <p>
              <a onClick={() => this.setState({ show_token: !this.state.show_token })}>{this.state.show_token ? 'Hide API Key' : 'Show API Key' }</a>
              <div style={{ display: this.state.show_token ? '' : 'none' }}>
                <p>
                  <a href="/docs/api">(How to use this)</a>
                </p>
                <textarea rows={4} value={this.state.show_token ? localStorage.token : ''} />
              </div>
            </p>
            <p>
              <a onClick={() => {
                  this.props.history.push('/logs');
                } }>View Logs
              </a>
            </p>
            <p>
              <a className="danger" onClick={this.handleDeleteAccount}><FontAwesome name="frown-o" /> Cancel Account</a>
            </p>
          </div>
        </div>
      </div>
      )
    }
  })

  export default Account
