import React, { PropTypes } from 'react'
import redirect from '../utils/redirect'
import FontAwesome from 'react-fontawesome'
import {signIn} from '../stores/ActionCreator'

const Login = React.createClass({
  getInitialState() {
    return {
      error: false
    }
  },
  handleClick() {

    signIn(
      this.refs.email.value,
      this.refs.password.value
    )
    .then(
      n => {
        console.log('foo')
        this.props.history.push('/buckets')
      },
      err => {
        console.log('bar')

        this.setState({
          error: err
        })
      }
    )

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
          <h2>Welcome back!</h2>

          <div style={{ padding: 10, marginBottom: 10, background: 'red', color: 'white', display: this.state.error ? '' : 'none'}}>
            {this.state.error ? this.state.error.message : ''}
          </div>

          <div className="email-signup">
            <p> Login with your email</p>
            <label>
              Email:
              <input name="email" ref="email" type="email" />
            </label>
            <label>
              Password:
              <input name="password" ref="password" type="password" />
            </label>
            <input onClick={this.handleClick} type="button" value="Login" />
        </div>
      </div>
    </div>
  )
}
})

export default Login
