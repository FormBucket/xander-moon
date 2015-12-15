import React, { PropTypes } from 'react'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'
import FontAwesome from 'react-fontawesome'
import redirect from '../utils/redirect'
import Common from 'formbucket-common'
import moment from 'moment'
import {COND} from 'functionfoundry'
import {Plans} from 'formbucket-common'

const Billing = React.createClass({
  getInitialState: () => {
    var planCode = localStorage.getItem('plan') || 'free'
    return {
      selectedPlanCode: planCode,
      selectedPlan: Plans.filter( n=> n.code === planCode)[0]
    }
  },

  handlePlanClick: function(planCode, event) {
    console.log( this, planCode )
    this.setState({
      selectedPlanCode: planCode,
      selectedPlan: Plans.filter( n=> n.code === planCode)[0]
    })
  },

  render () {
    let cmp = this,
    PaymentDetails = (
      <div>
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
          <p>Your card will be charged ${this.state.selectedPlan.monthly_cost}.00 on the {moment().format('Do')} of each month.</p>
      </div>
    )

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

              <h3>Plan</h3>
              { Plans.map( plan => COND(
                this.state.selectedPlanCode === plan.code,
                <div key={plan.id} className="selected-plan">
                  <label>
                    <input type="radio" class="radio" name="radio_button" value="radio_1" checked/> {plan.displayName}
                      <span className="pill">Selected!</span>
                  </label>
                </div>,
                <div key={plan.id} className="billing-plan" onClick={this.handlePlanClick.bind(cmp, plan.code)}>
                  <label>
                    <input type="radio" class="radio" name="radio_button" value="radio_2"/> {plan.displayName}
                  </label>
                </div>
              ))}

              {COND(
                this.state.selectedPlanCode !== 'free',
                PaymentDetails,
                undefined
              )}

              <input className="button" type="submit" value="Create My Account" />

          </div>
          <div>

            <div className="pricing-plan checkout">
              <p>{this.state.selectedPlan.displayName}</p>
              <h3>${this.state.selectedPlan.monthly_cost}/mo</h3>
                <ul>
                  <li>{this.state.selectedPlan.max_forms} Forms</li>
                  <li>{this.state.selectedPlan.max_submissions_per_month} Submissions</li>
                  <li>Unlimited Custom Rules</li>
                  { COND(this.state.selectedPlan.allow_csv_export,
                    <li>CSV Export</li>,
                    <li><s>CSV Export</s></li>)
                   }
                  { COND(this.state.selectedPlan.allow_file_uploads,
                    <li>Up to {this.state.selectedPlan.max_submissions_mb}MB File Uploads</li>,
                    <li><s>File Uploads</s></li>)
                   }
                </ul>
            </div>

          </div>
        </div>
      </div>
    )
  }
})

export default Billing
