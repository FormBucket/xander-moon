import React, { PropTypes } from 'react'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'
import redirect from '../utils/redirect'

var FontAwesome = require('react-fontawesome');
const Billing = React.createClass({
  render () {
    return (
      <div>
        <div className="page-heading">
          <div className="wrapper">
            <h1>Billing</h1>
          </div>
        </div>
        <div className="wrapper">
          <h2>You can upgrade or downgrade your plan at any time.</h2>
          <div className="email-signup">
            <p>Plan</p>
            <form action="post" method="/signup">
              <label for="fullName">Full Name</label>
              <input type="text" id="fullName" name="displayName" placeholder="e.g. Nikola Tesla"/>
              <label for="emailAddress">Email Address</label>
              <input type="text" id="emailAddress" name="username" placeholder="nikola@altcurrent.com"/>
              <label for="createPassword"><FontAwesome name='lock' /> Create Password</label>
              <input type="password" id="createPassword" name="password" />
              <label for="confirmPassword"><FontAwesome name='lock' /> Confirm Password</label>
              <input type="password" id="confirmPasswordB"/>
              <input className="button" type="submit" value="Create Account" />
            </form>
          </div>
        </div>
      </div>
    )
  }
})

export default Billing
