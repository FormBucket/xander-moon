import React, { PropTypes } from 'react'
import redirect from '../utils/redirect'
import FontAwesome from 'react-fontawesome'

const Login = React.createClass({
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
          <div className="chooser">
            <button onClick={redirect('auth/google')}>
              <FontAwesome name='google' /> Login with Google
            </button>
            <button onClick={redirect('auth/github')}>
              <FontAwesome name='github' /> Login with GitHub
            </button>
          </div>
          <div className="or">
            <p>OR</p>
          </div>
          <div className="email-signup">
            <p> Login with your email</p>
            <form method="POST" action="/login">
              <label>
                Username:
                <input name="username" type="text" />
              </label>
              <label>
                Password:
                <input name="password" type="password" />
              </label>
              <input type="submit" value="Login" />
          </form>
        </div>
      </div>
    </div>
  )
}
})

export default Login
