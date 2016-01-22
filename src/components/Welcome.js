import React, { PropTypes } from 'react'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'
import {COND, ISBLANK} from 'functionfoundry'
import UserStore from '../stores/user'
import SubscriptionStore from '../stores/subscription'

var content = `<h3>Try it out!</h3>
<form action="https://formbucket.com/f/ff4fu3" method="post">
  <input type="text" name="name" placeholder="Name"/>
  <input type="text" name="email" placeholder="Email"/>
  <textarea name="message" placeholder="Message"></textarea>
  <button type="submit">Send!</button>
</form>`

const Welcome = React.createClass({
  getInitialState: () => {
    return {
      plans: SubscriptionStore.getPlans(),
      ghostTextLength: 0,
      ghostText: ''
    }
  },
  componentDidMount() {
    console.log('test')
    var cmp = this

    this.token = SubscriptionStore.addListener(this.handleSubscriptionChanged)

    this.timerId = setInterval( () => {

      this.setState({
        ghostTextLength: this.state.ghostTextLength+2,
        ghostMarkup: content.substring(0, this.state.ghostTextLength+2 ),
        ghostText: '```html\n' + content.substring(0, this.state.ghostTextLength+2 ) + '\n```'
      })

      if (this.state.ghostTextLength+2 > content.length) {
        this.setState({
          ghostText: this.state.ghostText + '\n<span class="blinking-cursor" />'
        })
        clearInterval(this.timerId)
      }
    }, 40)

  },
  componentWillUnmount () {
    this.token.remove()
    clearInterval(this.timerId)
  },

  handleSubscriptionChanged() {
    this.setState({ plans: SubscriptionStore.getPlans() })
  },

  handleSeePlans () {
    let currentPos = window.scrollY
    let scrollTo = document.getElementById('plans').offsetTop
    let below = currentPos >= scrollTo
    let timerId = setInterval(() => {
      if ((below && currentPos <= scrollTo) ||
          (currentPos >= scrollTo)) {
        clearInterval(timerId)
      }
      currentPos += 40
      window.scrollTo( 0, currentPos )
    }, 10)
  },
  render () {
    return (
      <div>
        <div className="hero">
          <div className="wrapper">
            <h1>Endpoints are Just the Beginning</h1>
            <h2>Turbocharged Form Handling and Automation</h2>
            { COND( UserStore.isUserLoggedIn(),
                    <button onClick={() => this.props.history.push('/buckets')}>Return to your buckets</button>,
                    <button onClick={this.handleSeePlans}>See Plans & Pricing</button>
             )}
            <div className="features tour">
              <div className="key-features">
                <div className="feature fade-in one">
                  <img className="icon" src="/img/icon-markup.svg" alt="raw html" />
                  <div className="copy">
                    <h3>Bare Metal Markup</h3>
                    <p>
                      Hosted endpoints for your forms.
                      Your markup, your CSS. We take care of the rest.
                    </p>
                  </div>
                </div>
                <div className="feature fade-in two">
                  <img className="icon" src="/img/icon-rules.svg" alt="raw html" />
                  <div className="copy">
                    <h3>Custom Automation</h3>
                    <p>
                      Redirect users to any URL, send autoresponder emails and add unlimited webhooks.
                    </p>
                  </div>
                </div>
                <div className="feature fade-in three">
                  <img className="icon" src="/img/icon-submissions.svg" alt="raw html" />
                  <div className="copy">
                    <h3>Submissions Manager</h3>
                    <p>
                      Submissions get delivered to your inbox and stored in a dashboard with export options.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
              <div className="right" dangerouslySetInnerHTML={{__html: this.state.ghostMarkup}}>
              </div>
            </div>
          </div>
          <div id="plans" className="features plans">
            <h2>30-Day Money Back Guarantee on All Plans</h2>

            { ISBLANK(this.state.plans) ? "Loading plans..." : this.state.plans.map(plan => (
                <div key={plan.id} className="pricing-plan">
                  <p>{plan.displayName}</p>
                  <h3>${plan.amount / 100}/mo</h3>
                    <ul>
                      <li>
                      { COND(
                          plan.max_buckets === Number.POSITIVE_INFINITY,
                          'Unlimited',
                          plan.max_buckets )} Buckets</li>
                      <li>
                      { COND(
                          plan.max_submissions_per_month === Number.POSITIVE_INFINITY,
                          'Unlimited',
                          plan.max_submissions_per_month )} Submissions per Bucket</li>
                      <li>Unlimited Custom Rules</li>
                      <li>CSV Export</li>
                      {/* COND(plan.allow_file_uploads,
                        <li>Up to {plan.max_submissions_mb}MB File Uploads</li>,
                        <li><s>File Uploads</s></li>)
                       */}
                    </ul>
                    { COND( UserStore.isUserLoggedIn(),
                            '',
                            <button onClick={() => { localStorage.setItem('plan', plan.id); this.props.history.push('/signup') } } className="signup">Sign Up</button>
                           ) }

                </div>
              ))
            }

          </div>
        </div>
      </div>
    )
  }
})

export default Welcome
