import React, { PropTypes } from 'react'
import Markdown from 'react-remarkable'
import markdownOptions from '../markdown-options'
import {branch, isEmail} from 'functionfoundry'
import {server} from '../stores/webutils'
import FontAwesome from 'react-fontawesome'
import Modal from 'react-modal'
import { browserHistory } from 'react-router'

window.validateForm = function() {
  var v = true;
  var message = document.getElementsByName('message')[0].value

  if (!message) {
    v = false;
    document.getElementsByName('message')[0].style.border = '1px red solid'
  } else {
    document.getElementsByName('message')[0].style.border = ''
  }

  return v;
}

window.validateForm = function() {
  var v = true;
  var message = document.getElementsByName('message')[0].value

  if (!message) {
    v = false;
    document.getElementsByName('message')[0].style.border = '1px red solid'
  } else {
    document.getElementsByName('message')[0].style.border = ''
  }

  return v;
}

var content = `
<h3>Try it out!</h3>
<form method="post"
  action="${server}/f/homepage"
  onsubmit="return validateForm()">
  <label>Name</label>
  <input type="text" name="name" />
  <label>Email</label>
  <input type="text" name="email" />
  <label>What will you create with magic buckets?</label>
  <textarea name="message"></textarea>
  <button class="secondary" type="submit">Submit</button>
</form>`

const videoModalStyle = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// var content = `<h3>Try it out!</h3>
// <form method="post" action="${server}/f/homepage"
// onsubmit="return validateForm()">
//   <input type="text" name="name" placeholder="Your name">
//   <input type="text" name="email" placeholder="Your email">
//   <textarea name="message" rows="4"
//     placeholder="What will you create with a magic backend?"></textarea>
//   <button class="secondary" type="submit">Send!</button>
// </form>`

const Welcome = React.createClass({
  getInitialState: () => {
    return {
      isAnnual: true,
      showVideo: false,
      ghostTextLength: 0,
      ghostText: ''
    }
  },

  componentDidMount () {

    this.timerId = setInterval( () => {

      this.setState({
        ghostTextLength: this.state.ghostTextLength+1,
        ghostMarkup: content.substring(0, this.state.ghostTextLength+1 ),
        ghostText: '```html\n' + content.substring(0, this.state.ghostTextLength+1 ) + '\n```'
      })

      if (this.state.ghostTextLength+1 > content.length) {
        this.setState({
          ghostText: this.state.ghostText + '\n<span class="blinking-cursor" />'
        })
        clearInterval(this.timerId)
      }
    }, 6)

  },
  componentWillUnmount () {
    clearInterval(this.timerId)
  },

  openVideo() {
    this.setState({ showVideo: true })
  },

  closeVideo() {
    this.setState({ showVideo: false })
  },

  render () {

   return (
      <div>
        <div className="hero">
          <div className="bubbles">
            <div className="wrapper">
              <h1>Capture and automate form submissions</h1>
              <h2>Serverless form collection. Easy, powerful, fast and reliable. Start today!</h2>
              <button type="button"
                onClick={ () => browserHistory.push('/signup')}>
                Get Started
              </button>
              <p>Free 14-Day Trial • No credit card to sign up!</p>
            </div>
          </div>
        </div>
        <div>
          <div className="wrapper">
            <div className="features">
              <div className="editor">
                <div className="left">
                  <div className="typing">
                   <Markdown
                     source={ this.state.ghostText }
                     options={ markdownOptions }
                   />
                  </div>
                </div>
                <div className="right" dangerouslySetInnerHTML={{__html: this.state.ghostMarkup }}>
                </div>
              </div>
            </div>
          </div>
          <div id="features" className="section-block">
            <div className="wrapper">
              <div className="clincher">
                <h2>A Complete Platform for Managing Submissions</h2>
                <p className="blurb">
                  Your clients and coworkers will think you've become a full-stack programmer overnight.
                </p>
              </div>
            </div>
          </div>
          <div className="wrapper">
            <div className="features">
              <div className="feature">
                <div className="icon">
                  <img src="/img/bunny.svg" alt="Magic Endpoints" />
                </div>
                <div className="copy">
                  <h3>Magic Endpoints</h3>
                  <p>
                    Paste our endpoints into your HTML and get a complete backend for handling and automating form submissions.
                  </p>
                </div>
              </div>
              <div className="feature">
                <div className="icon">
                  <img src="/img/laptop.svg" alt="Full Control" />
                </div>
                <div className="copy">
                  <h3>No Embeds or iFrames</h3>
                  <p>
                    Build and style forms with 100% control over your HTML and CSS. No overrides!
                  </p>
                </div>
              </div>
            </div>
            <div className="features">
              <div className="feature">
                <div className="icon">
                  <img src="/img/heart.svg" alt="Full Control" />
                </div>
                <div className="copy">
                  <h3>URL Redirects and AJAX</h3>
                  <p>
                    Redirect form submitters to any URL or use advanced AJAX post options.
                  </p>
                </div>
              </div>
              <div className="feature">
                <div className="icon">
                  <img src="/img/autoresponder.svg" alt="Submissions Manager" />
                </div>
                <div className="copy">
                  <h3>Autoresponders</h3>
                  <p>
                    Automatically send personalized emails to people who submit your form.
                  </p>
                </div>
              </div>
            </div>
            <div className="features">
              <div className="feature">
                <div className="icon">
                  <img src="/img/bell.svg" alt="Notifications" />
                </div>
                <div className="copy">
                  <h3>Notifications</h3>
                  <p>
                    Send customizable real-time notifications to yourself or multiple recipients when new submissions come in.
                  </p>
                </div>
              </div>
              <div className="feature">
                <div className="icon">
                  <img src="/img/shield.svg" alt="Spam Protection" />
                </div>
                <div className="copy">
                  <h3>Spam Protection</h3>
                  <p>
                    Your forms are defended with advanced SPAM detection, filtering and rate limiting as well as Honeypot and ReCAPTCHA support.
                  </p>
                </div>
              </div>
            </div>
            <div className="features">
              <div className="feature">
                <div className="icon">
                  <img src="/img/list.svg" alt="Submissions Manager" />
                </div>
                <div className="copy">
                  <h3>Submissions Manager</h3>
                  <p>
                    Submissions are stored in a secure searchable dashboard with export options.
                  </p>
                </div>
              </div>
              <div className="feature">
                <div className="icon">
                  <img src="/img/robot.svg" alt="Endless Automation" />
                </div>
                <div className="copy">
                  <h3>Limitless Integrations</h3>
                  <p>
                    Capturing submissions is just the beginning. Route form data to other applications with webhooks.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div id="pricing" className="section-block">
            <div className="louder">
              <div className="wrapper">
                <div className="clincher">
                  <h2>Simple Pricing</h2>
                  <p>Unlimited Buckets and Submissions for just <strong>$7/mo.</strong> Free for 14 days, no credit card required and cancel anytime.</p>
                  <button type="button"
                    onClick={ () => browserHistory.push('/signup')}>
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default Welcome
