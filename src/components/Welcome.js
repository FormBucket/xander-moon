import React, { PropTypes } from 'react'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'

var content = require('../content/example-code.md');

const Welcome = React.createClass({
  render () {
    return (
      <div>
        <div className="hero">
          <div className="wrapper">
            <h1>Powerful form handling for your static sites</h1>
            <h2>No embeds or iframes. Your fields, your CSS. We take care of the rest!</h2>
          </div>
          <div className="features tour">
            <div className="key-features">
              <div className="feature">
                <img className="icon" src="/img/icon-markup.svg" alt="raw html" />
                <div className="copy">
                  <h3>Bare Metal Markup</h3>
                  <p>
                    Get raw form HTML with a unique URL endpoint. Drop it right into your project!
                  </p>
                </div>
              </div>
              <div className="feature">
                <img className="icon" src="/img/icon-rules.svg" alt="raw html" />
                <div className="copy">
                  <h3>Custom Rules</h3>
                  <p>
                    Redirect users to any URL after your form is submitted and configure unlimited webhooks.
                  </p>
                </div>
              </div>
              <div className="feature">
                <img className="icon" src="/img/icon-submissions.svg" alt="raw html" />
                <div className="copy">
                  <h3>Submissions Manager</h3>
                  <p>
                    Submissions get delivered to your inbox and stored in a searchable dashboard.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="wrapper">
          <div className="features">
            <div className="editor">
              <div className="left">
                <Markdown
                  source={ content }
                  options={ markdownOptions }
                  />
              </div>
              <div className="right">
                <h3>Try it out!</h3>
                <form action="https://formbucket.com/f/ff4fu3" method="post">
                  <input type="text" name="name" placeholder="Name"/>
                  <input type="text" name="email" placeholder="Email"/>
                  <textarea name="message" placeholder="Message"></textarea>
                  <button type="submit">Send!</button>
                </form>
              </div>
            </div>
          </div>
          <div className="features">
            <h2>30-Day Free Trial on All Plans</h2>
            <div className="pricing-plan">
              <p>Personal</p>
              <h3>$5/mo</h3>
              <button className="signup">Sign Up</button>
            </div>
            <div className="pricing-plan">
              <p>Startup</p>
              <h3>$12/mo</h3>
              <button className="signup">Sign Up</button>
            </div>
            <div className="pricing-plan">
              <p>Enterprise</p>
              <h3>$24/mo</h3>
              <button className="signup">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
})

export default Welcome
