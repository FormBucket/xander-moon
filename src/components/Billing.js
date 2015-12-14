import React, { PropTypes } from 'react'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'
import redirect from '../utils/redirect'

var FontAwesome = require('react-fontawesome');
const Billing = React.createClass({
  render () {
    return (
      <div>
        <div className="page-heading">
          <div className="wrapper">
            <h1>Billing</h1>
          </div>
        </div>
        <div className="wrapper">
          <h2>You can upgrade or downgrade your plan at any time.</h2>
          <div className="billing-details">
            <form action="post" method="">
              <h3>Plan</h3>
              <div className="selected-plan">
                <label>
                  <input type="radio" class="radio" name="radio_button" value="radio_1" checked/> Free
                    <span className="pill">Selected!</span>
                </label>
              </div>
              <div className="billing-plan">
                <label>
                  <input type="radio" class="radio" name="radio_button" value="radio_2"/> Pro
                </label>
              </div>
              <div className="billing-plan">
                <label>
                  <input type="radio" class="radio" name="radio_button" value="radio_3"/> Startup
                </label>
              </div>
              <div className="billing-plan">
                <label>
                  <input type="radio" class="radio" name="radio_button" value="radio_4"/> Enterprise
                </label>
              </div>
              <hr/>
              <h3><FontAwesome name='lock' /> Payment Details</h3>
                <div className="payment-info">
                  <div className="cardNumber">
                    <label for="cardNumber">Card Number</label>
                    <input type="text" id="cardNumber" data-stripe="number"/>
                  </div>
                  <div className="cvc">
                    <label for="cvc">CVC</label>
                    <input type="text" id="cvc" data-stripe="cvc"/>
                  </div>
                  <div className="exp">
                    <label for="exp">Exp</label>
                    <input type="text" id="exp" data-stripe="exp" placeholder="MM/YYYY"/>
                  </div>
                </div>
                <p>Your card will be charged $[plan amount] on the [day] of each month.</p>
                <input className="button" type="submit" value="Create My Account" />
            </form>
          </div>
        </div>
      </div>
    )
  }
})

export default Billing
