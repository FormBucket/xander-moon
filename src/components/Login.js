import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import {signIn} from '../stores/ActionCreator'
import {branch} from 'functionfoundry'

const Login = React.createClass({
  getInitialState() {
    return {
      loading: false,
      error: false
    }
  },
  handleClick() {
    this.setState({ loading: true, error: false })
    signIn(
      this.refs.email.value,
      this.refs.password.value
    )
    .then(
      n => {
        loadProfile()
        .then(() => this.props.history.push('/buckets'))
      },
      err => {
        this.setState({
          loading: false,
          error: err
        })
      }
    )

  },

  handleClickReset() {
    this.props.history.push('/password_reset')
  },

  handleKeyPress (event) {
    if (event.keyCode === 13) {
      // enter key pressed
      this.handleClick()
    }

  },
  render () {
    return (
      <div>
        <div className="page-heading">
          <div className="wrapper">
            <h1>Login</h1>
          </div>
        </div>
        <div className="wrapper">
          <div className="half-width">

            <h2>Welcome back!</h2>

            <div style={{ padding: 10, marginBottom: 10, background: 'red', color: 'white', display: this.state.error ? '' : 'none'}}>
              {this.state.error ? this.state.error.message : ''}
            </div>

            <div className="email-signup">
              <label>
                Email:
                <input name="email" ref="email" type="email" onKeyUp={this.handleKeyPress} />
              </label>
              <label>
                Password:
                <input name="password" ref="password" type="password" onKeyUp={this.handleKeyPress} />
              </label>
              <input onClick={this.handleClick} type="button" value="Login" disabled={this.state.loading} />
              {
                branch(this.state.loading,
                  <p><FontAwesome name="fa fa-spinner" /> Logging in</p>
                )
              }
            </div>

            <a href="javascript:void(0)" onClick={this.handleClickReset} type="button">Reset password</a>
          </div>
        </div>
      </div>
    )
  }
})

export default Login
