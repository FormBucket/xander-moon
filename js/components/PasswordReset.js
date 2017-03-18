import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import {requestPasswordReset, requestPasswordResetUpdate} from '../stores/webutils'
import {branch, isEmail} from 'functionfoundry'
import { browserHistory } from 'react-router'

const Login = React.createClass({
  getInitialState() {
    return {
      loading: false,
      error: false,
      sent: false
    }
  },
  handleClick() {
    var email = this.refs.email.value

    if (email.length === 0 || !isEmail(email)) {
      this.setState({ error: { message:  'Please enter a valid email' }})
      return
    }

    this.setState({ loading: true, error: false, email: email })
    requestPasswordReset(
      email
    )
    .then(
      () => this.setState({ loading: false, sent: true })
    )
    .catch(
      (error) => this.setState({ loading: false, error: JSON.parse(error) })
    )
  },

  handleClickUpdate() {
    var email = this.state.email,
    temp_password = this.refs.temp_password.value,
    password = this.refs.password.value

    requestPasswordResetUpdate( email, temp_password, password )
    .then(
      () => {
        this.setState({ loading: false, sent: true })
        browserHistory.push('/login')
      }
    )
    .catch(
      (error) => this.setState({ loading: false, error: JSON.parse(error) })
    )
  },

  handleKeyPress (event) {
    if (event.keyCode === 13) {
      // enter key pressed
      this.handleClick()
    }
  },

  render () {
    // console.log(this.state)

    return (
      <div>
        <div className="page-heading">
          <div className="wrapper">
            <h1>Password Reset</h1>
          </div>
        </div>
        <div className="wrapper">
          <div className="half-width">

            <div style={{ padding: 10, marginBottom: 10, background: 'red', color: 'white', display: this.state.error ? '' : 'none'}}>
              {this.state.error ? this.state.error.message : ''}
            </div>


            {
              branch(!this.state.sent,
                (<div className="email-signup">
                  <label>
                    Email:
                    <input ref="email" type="email" onKeyUp={this.handleKeyPress} />
                  </label>
                  <input onClick={this.handleClick} type="button" value="Reset" disabled={this.state.loading} />
                  {
                    branch(this.state.loading,
                      <p><FontAwesome name="fa fa-spinner" /> Reset Password</p>
                    )
                  }
                </div>),
                (
                  <div className="email-signup">
                    We sent you an email with a temporary password.
                    <label>
                      Temporary password:
                      <input ref="temp_password" type="password" onKeyUp={this.handleKeyPress} />
                    </label>
                    <label>
                      New password:
                      <input ref="password" type="password" onKeyUp={this.handleKeyPress} />
                    </label>
                    <input onClick={this.handleClickUpdate} type="button" value="Reset" disabled={this.state.loading} />
                    {
                      branch(this.state.loading,
                        <p><FontAwesome name="fa fa-spinner" /> Save</p>
                      )
                    }
                  </div>
                )
              )
            }
          </div>
        </div>
      </div>
    )
  }
})

export default Login
