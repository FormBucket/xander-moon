import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'
import {signUp} from '../stores/ActionCreator'

var FontAwesome = require('react-fontawesome');
const Signup = React.createClass({
  getInitialState() {
    return {
      error: false
    }
  },
  handleClick() {

    signUp(
      this.refs.name.value,
      this.refs.org.value,
      this.refs.email.value,
      this.refs.password.value
    )
    .then(
      n => {
        this.props.history.push('/billing')
      },
      err => {
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
            <h1>Sign Up</h1>
          </div>
        </div>
        <div className="wrapper">
          <h2>Let's make some forms!</h2>
          <div className="half-width">
            <div style={{ padding: 10, marginBottom: 10, background: 'red', color: 'white', display: this.state.error ? '' : 'none'}}>
              {this.state.error ? this.state.error.message : ''}
            </div>
            <label for="fullName">Full Name</label>
            <input type="text" ref="name" placeholder="e.g. Nikola Tesla"/>
            <label for="orgName">Company/Organization Name (Optional)</label>
            <input type="text" ref="org" placeholder="e.g. Tesla Electric Co."/>
            <label for="emailAddress">Email Address</label>
            <input type="text" ref="email" name="email" placeholder="nikola@altcurrent.com"/>
            <label for="createPassword"><FontAwesome name='lock' /> Create Password</label>
            <input type="password" ref="password" name="password" />
            <input onClick={this.handleClick} className="button" type="button" value="Sign Up" />
          </div>
        </div>
      </div>
    )
  }
})

export default Signup
