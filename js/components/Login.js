import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import {signIn, getToken, loadProfile} from '../stores/ActionCreator'
import {branch} from 'functionfoundry'
import { browserHistory } from 'react-router'

const Login = React.createClass({
  getInitialState() {
    return {
      loading: false,
      error: false
    }
  },

  componentDidMount() {
    if (this.props.location.query.code) {
      getToken(this.props.location.query.code)
      .then(
        () => browserHistory.push('/buckets'),
        err => {
          this.setState({
            loading: false,
            error: JSON.parse(err)
          })
        }
      )
    }
  },

  handleClick() {
    this.setState({ loading: true, error: false })
    signIn(
      this.refs.email.value,
      this.refs.password.value
    )
    .then( loadProfile )
    .then(
      () => browserHistory.push('/buckets'),
      err => {
        this.setState({
          loading: false,
          error: JSON.parse(err)
        })
      }
    )

  },

  handleClickReset() {
    browserHistory.push('/password_reset')
  },

  handleKeyPress (event) {
    if (event.keyCode === 13) {
      // enter key pressed
      this.handleClick()
    }

  },
  render () {
    if (this.props.location.query.code) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <div className="page-heading">
          <div className="wrapper">
            <h1>Login</h1>
          </div>
        </div>
        <div className="wrapper">
          <div id="login-wrapper">

            <div style={{ padding: 10, marginBottom: 10, background: 'red', color: 'white', display: this.state.error ? '' : 'none'}}>
              {this.state.error ? this.state.error.message : ''}
            </div>

            <div className="google-login">
              <a href={ process.env.FORMBUCKET_API_SERVER + "/connect/google" } alt="Sign in with Google">
                <img src="img/btn_google_signin_dark_normal_web@2x.png" />
              </a>
            </div>

            <div className="login-divider">
              <div></div>
              <div>or</div>
              <div></div>
            </div>

            <div className="login-form">
              <label>
                Email:
                <input name="email" ref="email" type="email" onKeyUp={this.handleKeyPress} />
              </label>
              <label>
                Password:
                <input name="password" ref="password" type="password" onKeyUp={this.handleKeyPress} />
              </label>
              <input onClick={this.handleClick} type="button" value="Login" disabled={this.state.loading} />

              <a className="pull-right" href="javascript:void(0)" onClick={this.handleClickReset}>Forgot your password?</a>
              {
                branch(this.state.loading,
                  <p><FontAwesome name="fa fa-spinner" /> Logging in</p>
                )
              }


            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default Login
