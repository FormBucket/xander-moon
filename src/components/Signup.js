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
        </div>
      </div>
    )
  }
})

export default Signup
