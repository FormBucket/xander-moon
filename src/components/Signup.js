import React, { PropTypes } from 'react'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'
import redirect from '../utils/redirect'

var FontAwesome = require('react-fontawesome');
const Signup = React.createClass({
  render () {
    return (
      <div>
        <div className="page-heading">
          <div className="wrapper">
            <h1>Sign Up</h1>
          </div>
        </div>
        <div className="wrapper">
          <h2>Let's make some forms!</h2>
          <div className="chooser">
            <button onClick={redirect('auth/google')}><FontAwesome name='google' /> Sign Up with Google</button>
            <button onClick={redirect('auth/github')}><FontAwesome name='github' /> Sign Up with GitHub</button>
          </div>
          <div className="or">
            <p>OR</p>
          </div>
          <div className="email-signup">
            <p>Sign up with Email</p>
            <form method="post" action="/signup">
              <label for="fullName">Full Name</label>
              <input type="text" id="fullName" name="displayName" placeholder="e.g. Nikola Tesla"/>
              <label for="emailAddress">Email Address</label>
              <input type="text" id="emailAddress" name="username" placeholder="nikola@altcurrent.com"/>
              <label for="createPassword"><FontAwesome name='lock' /> Create Password</label>
              <input type="password" id="createPassword" name="password" />
              <label for="confirmPassword"><FontAwesome name='lock' /> Confirm Password</label>
              <input type="password" id="confirmPasswordB"/>
              <input className="button" type="submit" value="Sign Up" />
            </form>
          </div>
        </div>
      </div>
    )
  }
})

export default Signup
