import React, { PropTypes } from 'react'
import Markdown from 'react-remarkable'
import markdownOptions from '../markdown-options'
import {branch, isEmail} from 'formula'
import {server} from '../stores/webutils'
import FontAwesome from 'react-fontawesome'
import { location } from 'xander'
import routes from '../routes'
import Layout from './Layout'

// var content = `<h3>Try it out!</h3>
// <form method="post" action="${server}/f/homepage"
// onsubmit="return validateForm()">
//   <input type="text" name="name" placeholder="Your name">
//   <input type="text" name="email" placeholder="Your email">
//   <textarea name="message" rows="4"
//     placeholder="What will you create with a magic backend?"></textarea>
//   <button class="secondary" type="submit">Send!</button>
// </form>`

class Welcome extends React.Component {
  state = {
    BelowTheFold: () => null
  };

  componentDidMount() {
    System.import('./WelcomeBelowFold')
    .then((module) => {
      console.log('got module for below fold', module)
      this.setState({ BelowTheFold: module.default })
    })
  }

  render() {
   let {BelowTheFold} = this.state
   return (
      <Layout>
        <div className="hero">
          <div className="bubbles">
            <div className="wrapper">
              <h1>Endpoints are just the beginning</h1>
              <h2>Form collection made easy. No programming required.</h2>
              <button type="button"
                onClick={ () => location.open('/signup')}>
                Get Started
              </button>
              <p>Free 14-Day Trial • No credit card to sign up!</p>
            </div>
          </div>
        </div>

        <div className="wrapper">
          <BelowTheFold />
        </div>
      </Layout>
    )
  }
}

export default Welcome
