import React, { PropTypes } from 'react'
import Markdown from 'react-remarkable'
import markdownOptions from '../markdown-options'
import {branch, isEmail} from 'formula'
import {server} from '../stores/webutils'
import FontAwesome from 'react-fontawesome'
import { router } from 'xander'
import routes from '../routes'
import Header from './Header'
import Footer from './Footer'


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
      <div>
        <Header />
        <div className="hero">
          <div className="bubbles">
            <div className="wrapper">
              <h1>Endpoints are just the beginning</h1>
              <h2>Capture and automate form submissions with magic endpoints</h2>
              {
                branch(
                  this.props.user && this.props.user.account_id,
                  <div>
                    <button type="button"
                      onClick={ () => router.open('/buckets')}>
                      Return to buckets
                    </button>
                  </div>,
                  <div>
                    <button type="button"
                      onClick={ () => router.open('/signup')}>
                      Get Started
                    </button>
                    <p>Free 14-Day Trial • No credit card to sign up!</p>
                  </div>
                )
              }

            </div>
          </div>
        </div>
       <BelowTheFold {...this.props}/>
       <Footer />
    </div>
    )
  }
}

export default Welcome
