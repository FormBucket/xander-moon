import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'
import {signUp} from '../stores/ActionCreator'

var FontAwesome = require('react-fontawesome');
const Signup = React.createClass({
  getInitialState() {
    return {
      loading: false,
      error: false
    }
  },
  componentDidMount() {
    // ensure user is scrolled to top
    window.scrollTo(0, 0)
  },
  handleClick() {

    this.setState({ loading: true, error: false })
    signUp(
      this.refs.name.value,
      this.refs.org.value,
      this.refs.email.value,
      this.refs.password.value
    )
    .then(
      n => {
        this.props.history.push('/buckets')
      },
      err => {
        this.setState({
          loading: false,
          error: err
        })
      }
    )

  },
  handleKeyUp (event) {
    if (event.keyCode === 13) {
      // enter key pressed
      this.handleClick()
    }

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
            <label htmlFor="fullName">Full Name</label>
            <input onKeyUp={this.handleKeyUp} type="text" ref="name" placeholder="e.g. Nikola Tesla"/>
            <label htmlFor="orgName">Company/Organization Name (Optional)</label>
            <input onKeyUp={this.handleKeyUp} type="text" ref="org" placeholder="e.g. Tesla Electric Co."/>
            <label htmlFor="emailAddress">Email Address</label>
            <input onKeyUp={this.handleKeyUp} type="text" ref="email" name="email" placeholder="nikola@altcurrent.com"/>
            <label htmlFor="createPassword"><FontAwesome name='lock' /> Create Password</label>
            <input onKeyUp={this.handleKeyUp} type="password" ref="password" name="password" />
            <input onClick={this.handleClick} className="button" type="button" value="Sign Up" />
          </div>
        </div>
      </div>
    )
  }
})

export default Signup
