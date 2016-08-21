import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'
import {signUp} from '../stores/ActionCreator'
import {isEmail} from 'functionfoundry'

var FontAwesome = require('react-fontawesome');
const Signup = React.createClass({
  getInitialState() {
    return {
      loading: false,
      error: false,
      accepted: false,
      enforce_accepted: false
    }
  },
  componentDidMount() {
    // ensure user is scrolled to top
    window.scrollTo(0, 0)
  },
  handleClick() {

    if (this.refs.name.value.length === 0) {
      this.setState({ error: { message: 'Must provide name'} })
      return;
    }

    if (this.refs.email.value.length === 0) {
      this.setState({ error: { message: 'Must provide email'} })
      return;
    }

    if (!isEmail(this.refs.email.value)) {
      this.setState({ error: { message: 'Must provide valid email'} })
      return;
    }

    if (this.refs.password.value.length === 0) {
      this.setState({ error: { message: 'Must provide password'} })
      return;
    }

    if (this.state.accepted === false) {
      this.setState({ error: { message: 'Must accept terms'}, enforce_accepted: true })
      return;
    }

    this.setState({ loading: true, error: false })
    signUp(
      this.refs.name.value,
      this.refs.org.value,
      this.refs.email.value,
      this.refs.password.value,
      this.state.accepted,
      this.state.optedin
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
            <label style={{ display: 'none' }} htmlFor="orgName">Company/Organization Name (Optional)</label>
            <input style={{ display: 'none' }} onKeyUp={this.handleKeyUp} type="text" ref="org" placeholder="e.g. Tesla Electric Co."/>
            <label htmlFor="emailAddress">Email Address</label>
            <input onKeyUp={this.handleKeyUp} type="text" ref="email" name="email" placeholder="nikola@altcurrent.com"/>
            <label htmlFor="createPassword"><FontAwesome name='lock' /> Create Password</label>
            <input onKeyUp={this.handleKeyUp} type="password" ref="password" name="password" />
            <input onClick={this.handleClick} className="button" type="button" value="Sign Up" />
            <p className="muted">
              By clicking "SIGN UP" you agree to our <a href="/terms" target="blank">Terms of Service</a> and <a href="/privacy-policy" target="blank">Privacy Policy</a>, and also agree to receive occasional updates from us by email.
            </p>
          </div>
        </div>
      </div>
    )
  }
})

export default Signup
