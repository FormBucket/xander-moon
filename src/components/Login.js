import React, { PropTypes } from 'react'
import redirect from '../utils/redirect'
import FontAwesome from 'react-fontawesome'

const Login = React.createClass({
  render () {
    return (
      <div>
        <button onClick={redirect('auth/google')}>
          <FontAwesome name='google' /> Sign Up with Google
        </button>
        <button onClick={redirect('auth/github')}>
          <FontAwesome name='github' /> Sign Up with GitHub
        </button>
      <span> Sign in with your email</span>
      <form method="POST" action="/login">
        <div id="login">
        <label>
          Username:
          <input name="username" type="text" />
        </label>
        <label>
          Password:
          <input name="password" type="password" />
        </label>
        <input type="submit" value="Sign in" />
      </div>
    </form>
    </div>
  )
}
})

export default Login
