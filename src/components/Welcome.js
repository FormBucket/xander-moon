import React, { PropTypes } from 'react'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'
import {branch, isEmail} from 'functionfoundry'
import {server} from '../stores/webutils'

window.checkHomepageForm = function() {
  var v = true;
  var name = document.getElementsByName('name')[0].value
  var email = document.getElementsByName('email')[0].value
  var message = document.getElementsByName('message')[0].value

  if (!name) {
    v = false;
    document.getElementsByName('name')[0].style.border = '1px red solid'
  } else {
    document.getElementsByName('name')[0].style.border = ''
  }

  if (!email || !isEmail(email)) {
    v = false;
    document.getElementsByName('email')[0].style.border = '1px red solid'
  } else {
    document.getElementsByName('email')[0].style.border = ''
  }

  if (!message) {
    v = false;
    document.getElementsByName('message')[0].style.border = '1px red solid'
  } else {
    document.getElementsByName('message')[0].style.border = ''
  }

  return v;
}

var content = `<h3>Tell us something...</h3>
<form method="post" action="${server}/f/homepage" onsubmit="return checkHomepageForm()">
  <input type="text" name="name" placeholder="Your name"/>
  <input type="text" name="email" placeholder="Your email"/>
  <textarea name="message" placeholder="What’s your biggest frustration with form handling and automation?"></textarea>
  <button type="submit">Send!</button>
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
            <h1>Endpoints are Just the Beginning</h1>
	          <h2>Simple Form Handling and Automation for Static Sites</h2>
            { branch( localStorage.hasOwnProperty('token'),
                    <button onClick={() => this.props.history.push('/buckets')}>Return to your buckets</button>,
                    <button onClick={() => this.props.history.push('/signup')}>Sign up today</button>
             )}
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
    )
  }
})

export default Welcome
