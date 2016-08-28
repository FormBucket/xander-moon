import React, { PropTypes } from 'react'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'
import {branch, isEmail} from 'functionfoundry'
import {server} from '../stores/webutils'
import UserStore from '../stores/user'

window.checkHomepageForm = function() {
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

var content = `<label>What will you do without a programmer?</label>
<form method="post" action="${server}/f/homepage"
onsubmit="return checkHomepageForm()">
  <textarea name="message" rows="7"></textarea>
  <button class="secondary pull-right" type="submit">Submit</button>
</form>`

const Welcome = React.createClass({
  getInitialState: () => {
    return {
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
  render () {

   return (
      <div>
        <div className="hero">
          <div className="wrapper">
            <h1>A Magic Backend for Web Designers</h1>
	          <h2>Capture and automate form submissions with zero programming</h2>
            { branch( UserStore.isUserLoggedIn(),
                    <button onClick={() => this.props.history.push('/buckets')}>Return to your buckets</button>,
                    <button onClick={() => this.props.history.push('/signup')}>Get Started</button>
             )}
             <p><a href="#how-it-works">How It Works</a></p>
             <div className="features tour">
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
        </div>
        <div className="wrapper">
          <div className="features">
            <img src="/img/dealwithit.svg" alt="Deal with it" />
            <h2>Manage Forms Like a Boss</h2>
            <p>You know HTML and CSS. But programming a backend to handle form submissions? Yikes.</p>
            <p className="lead">With FormBucket, it's a piece of cake. Your clients and coworkers will think you've become a full-stack programmer overnight!</p>
            <div className="feature">
              <div className="icon">
                <img src="/img/bunny.svg" alt="Magic Endpoints" />
              </div>
              <div className="copy">
                <h3>Magic Endpoints</h3>
                <p>
                  Use our magic endpoints in your form and <em>abracadabra</em>...now you've got a complete backend for handling and automating submissions. Say goodbye to terrible embeds and iframes!
                </p>
              </div>
            </div>
            <div className="feature">
              <div className="icon">
                <img src="/img/laptop.svg" alt="Full Control" />
              </div>
              <div className="copy">
                <h3>100% Your HTML and CSS</h3>
                <p>
                  Build and style forms as you normally do, then simply paste in your endpoints. No more maddening CSS overrides!
                </p>
              </div>
            </div>
            <div className="feature">
              <div className="icon">
                <img src="/img/heart.svg" alt="Full Control" />
              </div>
              <div className="copy">
                <h3>Better UX</h3>
                <p>
                  Redirect users to any URL after submitting your form, or use advanced AJAX post options to keep them on the same page. Send email autoresponders with full Markdown formatting.
                </p>
              </div>
            </div>
            <div className="feature">
              <div className="icon">
                <img src="/img/robot.svg" alt="Endless Automation" />
              </div>
              <div className="copy">
                <h3>Limitless Automation</h3>
                <p>
                  Capturing submissions is just the tip of the iceberg! Route form data to any other application with unlimited webhooks.
                </p>
              </div>
            </div>
            <div className="feature">
              <div className="icon">
                <img src="/img/bell.svg" alt="Notifications" />
              </div>
              <div className="copy">
                <h3>Notifications</h3>
                <p>
                  Send customizable email notifications to yourself or multiple recipients when new submissions come in.
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
                  Your forms are defended with advanced Spam detection, filtering and rate limiting.
                </p>
              </div>
            </div>
            <div className="feature">
              <div className="icon">
                <img src="/img/list.svg" alt="Submissions Manager" />
              </div>
              <div className="copy">
                <h3>Submissions Manager</h3>
                <p>
                  Submissions are safely stored in a searchable dashboard with export options.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="wrapper">
          <div className="problems">
            <h2>Now when they say...</h2>
            <div className="problem">
              <div className="person">
                <img src="/img/jane.svg" alt="Jane" />
              </div>
              <div className="quote">
                <p>
                  "We need a new landing page for our upcoming campaign, with a form that collects contact info and notifies Sales when new leads come in."
                </p>
              </div>
            </div>
            <div className="problem">
              <div className="person">
                <img src="/img/dick.svg" alt="Dick" />
              </div>
              <div className="quote">
                <p>
                  "We need to add a form to our support page that will autorespond to customers, create a new ticket in ZenDesk and post to Slack."
                </p>
              </div>
            </div>
            <div className="problem">
              <div className="person">
                <img src="/img/tracy.svg" alt="Tracy" />
              </div>
              <div className="quote">
                <p>
                  "We need a beautiful newsletter subscription box that will automatically add new subscribers to MailChimp and send a thank you email."
                </p>
              </div>
            </div>
            <div className="problem">
              <h2>You can say...</h2>
            </div>
            <div className="problem">
              <div className="quote">
                <p>
                  "No problem."
                </p>
              </div>
              <div className="person">
                <img src="/img/designer.svg" alt="Dick" />
              </div>
            </div>
          </div>
        </div>
        <div className="wrapper">
          <div className="clincher">
            <h2>You're already a great designer</h2>
            <p>Now you can be great at managing forms too!</p>
              { branch( UserStore.isUserLoggedIn(),
                      <button onClick={() => this.props.history.push('/buckets')}>Return to your buckets</button>,
                      <button onClick={() => this.props.history.push('/signup')}>Get Started</button>
               )}
          </div>
        </div>
      </div>
    )
  }
})

export default Welcome
