import React, { PropTypes } from 'react'
import {router, Link} from 'xander'
import Markdown from 'react-remarkable'
import markdownOptions from '../markdown-options'
import {signUp, loadProfile} from '../stores/ActionCreator'
import {isEmail} from 'formula'
import Layout from './Layout'

var FontAwesome = require('react-fontawesome');

class Signup extends React.Component {
  state = {
    loading: false,
    error: false,
    accepted: false,
    optedIn: false
  };

  componentDidMount() {
    // ensure user is scrolled to top
    window.scrollTo(0, 0)
  }

  handleClick = () => {

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

    this.setState({ loading: true, error: false })

    signUp(
      this.refs.name.value,
      this.refs.email.value,
      this.refs.password.value
    )
    .then( loadProfile )
    .then(
      n => {
        router.open('/buckets')
      },
      err => {
        this.setState({
          loading: false,
          error: JSON.parse(err)
        })
      }
    )

  };

  handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      // enter key pressed
      this.handleClick()
    }

  };

  render() {

    return (
      <Layout>
        <div className="page-heading">
          <div className="wrapper">
            <h1>Sign Up</h1>
          </div>
        </div>
        <div className="wrapper">
          <div className="signup-form">
            {this.state.error ? <div className="error-message">{this.state.error.message}</div> : ''}
            <h2>
              Free for 14 days. No credit card required.
            </h2>

            <div className="google-signup">
              <a href={ process.env.FORMBUCKET_API_SERVER + "/connect/google" } alt="Sign in with Google">
                <img src="img/btn_google_signin_dark_normal_web@2x.png" />
              </a>
            </div>

            <div className="signup-divider">
              <div></div>
              <div>or</div>
              <div></div>
            </div>

            <label htmlFor="fullName">Full Name</label>
            <input onKeyUp={this.handleKeyUp} type="text" ref="name" placeholder="e.g. Nikola Tesla"/>
            <label htmlFor="emailAddress">Email Address</label>
            <input onKeyUp={this.handleKeyUp} type="text" ref="email" name="email" placeholder="nikola@altcurrent.com"/>
            <label htmlFor="createPassword"><FontAwesome name='lock' /> Create Password</label>
            <input onKeyUp={this.handleKeyUp} type="password" ref="password" name="password" />
            <input onClick={this.handleClick} className="button" type="button" value="Sign Up" />

            <p className="muted">
              By clicking "SIGN UP" you agree to our <a href="/terms" target="blank">Terms of Service</a> and <a href="/privacy-policy" target="blank">Privacy Policy</a> and also agree to receive news and tips via email.
            </p>

          </div>
          <div className="signup-benefits">
            <div id="pricing" className="wrapper">
              <div className="plan">
                <h3>$7<span className="month">/mo</span></h3>
                <div className="includes">
                  <strong>Includes Unlimited...</strong>
                </div>
                <ul>
                  <li>Buckets</li>
                  <li>Submissions</li>
                  <li>Notifications</li>
                  <li>Spam Protection</li>
                  <li>Autoresponders</li>
                  <li>Webhooks</li>
                  {/* <li><Link to="/compare">Compare FormBucket</Link></li>
                    */}               </ul>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Signup
