import React, { PropTypes } from 'react'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'
import redirect from '../utils/redirect'
import {COND} from 'functionfoundry'
import {Plans} from 'formbucket-common'

var PaidPlans = Plans.slice(1, 4)

var content = require('../content/example-code.md');

const Welcome = React.createClass({
  render () {
    return (
      <div>
        <div className="hero">
          <div className="wrapper">
            <h1>Powerful form handling for your static sites</h1>
            <h2>No embeds or iframes. Your fields, your CSS. We take care of the rest!</h2>
            <button onClick={redirect('#plans')}>See Plans & Pricing</button>
            <div className="features tour">
              <div className="key-features">
                <div className="feature fade-in one">
                  <img className="icon" src="/img/icon-markup.svg" alt="raw html" />
                  <div className="copy">
                    <h3>Bare Metal Markup</h3>
                    <p>
                      Get raw form HTML with a unique URL endpoint. Drop it right into your project!
                    </p>
                  </div>
                </div>
                <div className="feature fade-in two">
                  <img className="icon" src="/img/icon-rules.svg" alt="raw html" />
                  <div className="copy">
                    <h3>Custom Rules</h3>
                    <p>
                      Redirect users to any URL after your form is submitted and configure unlimited webhooks.
                    </p>
                  </div>
                </div>
                <div className="feature fade-in three">
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
        </div>
        <div className="wrapper">
          <div className="features">
            <h2>Live Demo</h2>
            <div className="editor">
              <div className="left">
                <Markdown
                  source={ content }
                  options={ markdownOptions }
                  />
              </div>
              <div className="right">
                <h3>Try it out!</h3>
                <form action="/f/1234567" method="post">
                  <input type="text" name="name" placeholder="Name"/>
                  <input type="text" name="email" placeholder="Email"/>
                  <textarea name="message" placeholder="Message"></textarea>
                  <button type="submit">Send!</button>
                </form>
              </div>
            </div>
          </div>
          <div id="plans" className="features plans">
            <h2>30-Day Money Back Guarantee on All Plans</h2>

            { PaidPlans.map(plan => (
                <div key={plan.id} className="pricing-plan foo">
                  <p>{plan.displayName}</p>
                  <h3>${plan.monthly_cost}/mo</h3>
                    <ul>
                      <li>
                      { COND(
                          plan.max_forms === Number.POSITIVE_INFINITY,
                          'Unlimited',
                          plan.max_forms )} Forms</li>
                      <li>
                      { COND(
                          plan.max_submissions_per_month === Number.POSITIVE_INFINITY,
                          'Unlimited',
                          plan.max_submissions_per_month )} Submissions</li>
                      <li>Unlimited Custom Rules</li>
                      <li>CSV Export</li>
                      { COND(plan.allow_file_uploads,
                        <li>Up to {plan.max_submissions_mb}MB File Uploads</li>,
                        <li><s>File Uploads</s></li>)
                       }
                    </ul>
                  <button onClick={() => { localStorage.setItem('plan', plan.code); this.props.history.push('/signup') } } className="signup">Sign Up</button>
                </div>
              ))
            }

          </div>
          <div className="features free-plan">
            <p>
              Need just a basic no-frills contact form for your personal site? Check out our <strong><a href="#">Free Plan</a></strong>.
            </p>
          </div>
        </div>
      </div>
    )
  }
})

export default Welcome
