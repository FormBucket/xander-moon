import React, { PropTypes } from 'react'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'

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
            <button>Sign Up with Google</button>
            <button>Sign Up with GitHub</button>
          </div>
        </div>
      </div>
    )
  }
})

export default Signup
