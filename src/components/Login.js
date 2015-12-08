import React, { PropTypes } from 'react'

const Login = React.createClass({
  render () {
    return (
      <div id="login">
        <label>
          Username:
          <input type="text" />
        </label>
        <label>
          Password:
          <input type="password" />
        </label>
      </div>
    )
  }
})

export default Login
