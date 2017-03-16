import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import {signIn, getToken, loadProfile} from '../stores/ActionCreator'
import {branch} from 'functionfoundry'

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
        () => this.props.history.push('/buckets'),
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
      () => this.props.history.push('/buckets'),
      err => {
        this.setState({
          loading: false,
          error: JSON.parse(err)
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
          <div>

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
              &nbsp;&nbsp;Or sign up with:&nbsp;&nbsp;
              <a href={ process.env.FORMBUCKET_API_SERVER + "/connect/google" } alt="Sign in with Google">
                <FontAwesome size="2x" name="google" />
              </a>&nbsp;&nbsp;
              <a href={ process.env.FORMBUCKET_API_SERVER + "/connect/github" } alt="Sign in with Github">
                <FontAwesome size="2x" name="github" />
              </a>&nbsp;&nbsp;
              <a href={ process.env.FORMBUCKET_API_SERVER + "/connect/twitter" } alt="Sign in with Twitter">
                <FontAwesome size="2x" name="twitter" />
              </a>
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
