import React, { PropTypes } from 'react'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'
import {branch} from 'functionfoundry'
import UserStore from '../stores/user'

var content = `<h3>What's on your mind?</h3>
<form action="https://api.formbucket.com/f/homepage" method="post">
  <input type="text" name="name" placeholder="Your name"/>
  <input type="text" name="email" placeholder="Your email"/>
  <textarea name="message" placeholder="Share your feedback, comments or issues"></textarea>
  <button type="submit">Send!</button>
</form>`

const Welcome = React.createClass({
  render () {
    return (
      <div>
        <div className="hero">
          <div className="wrapper">
            <h1>Endpoints are Just the Beginning</h1>
	    <h2>Groovy Form Handling and Automation for Static Sites</h2>
            { branch( UserStore.isUserLoggedIn(),
                    <button onClick={() => this.props.history.push('/buckets')}>Return to your buckets</button>,
                    <button onClick={() => this.props.history.push('/signup')}>Sign up for free</button>
             )}
             <div className="features tour">
               <div className="editor">
                 <div className="left">
                   <div className="typing">
                     <Markdown
                       source={ '```html\n' + content + '```' }
                       options={ markdownOptions }
                       />

                   </div>
                 </div>
                 <div className="right" dangerouslySetInnerHTML={{__html: content }}>
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
