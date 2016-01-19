import React, { PropTypes } from 'react'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'
import FontAwesome from 'react-fontawesome'
import moment from 'moment'
import {COND} from 'functionfoundry'
import {loadSubscriptionPlans} from '../stores/ActionCreator'

const Billing = React.createClass({
  getInitialState() {
    var planCode =  UserStore.getPlan() || localStorage.getItem('plan') || 'fb-pro'
    return {
      plans: [],
      selectedPlanCode: planCode,
      selectedPlan: { amount: 0 },
      nowrap: true
    }
  },

  componentDidMount() {
    var cmp = this
    //console.log(this, cmp)
    loadSubscriptionPlans()
    .then( plans => {
      console.log('got plans', plans, cmp, this)
      cmp.setState({
        plans: plans,
        selectedPlan: plans.filter( n=> n.id === this.state.selectedPlanCode )[0]
      })
    })
  },

  handlePlanClick(planCode, event) {
    //console.log( this, planCode )
    localStorage.setItem('plan', planCode )
    this.setState({
      selectedPlanCode: planCode,
      selectedPlan: this.state.plans.filter( n=> n.id === planCode)[0]
    })
  },

  render () {

    let cmp = this
    console.log('render', this)

    function wrap(el) {
      if (cmp.props.nowrap) { return el }
      return (
       <div>
        <div className="page-heading">
          <div className="wrapper">
            <h1>{cmp.props.title || 'Billing'}</h1>
          </div>
        </div>
        {el}
      </div>
      )
    }

    if (this.state.plans.length === 0) {
      return wrap(
        <div className="wrapper">
          Loading...
        </div>)
    }

    let PaymentDetails = (
      <div>
        <hr/>
        <h3><FontAwesome name='lock' /> Payment Details</h3>
          <div className="payment-info">
            <div className="cardNumber">
              <label htmlFor="cardNumber">Card Number</label>
              <input type="text" id="cardNumber" data-stripe="number"/>
            </div>
            <div className="cvc">
              <label htmlFor="cvc">CVC</label>
              <input type="text" id="cvc" data-stripe="cvc"/>
            </div>
            <div className="exp">
              <label htmlFor="exp">Exp</label>
              <input type="text" id="exp" data-stripe="exp" placeholder="MM/YYYY"/>
            </div>
          </div>
          <p>Your card will be charged ${this.state.selectedPlan.amount / 100}.00 on the {moment().format('Do')} of each month.</p>
      </div>
    )


    return wrap(
       <div className="wrapper">
          <h2>You can upgrade or downgrade your plan at any time.</h2>
          {/* <p>Pssst...want to get a month free? See <a href="#">annual pricing</a>.</p> */}
          <div className="billing-details">
              <h3>Plan</h3>
              { this.state.plans.map( plan => COND(
                this.state.selectedPlanCode === plan.id,
                <div key={plan.id} className="selected-plan">
                  <label>
                    <input type="radio" class="radio" name="radio_button" value="radio_1" checked/> {plan.displayName}
                      <span className="pill">Selected!</span>
                  </label>
                </div>,
                <div key={plan.id} className="billing-plan" onClick={this.handlePlanClick.bind(cmp, plan.id )}>
                  <label>
                    <input type="radio" className="radio" name="radio_button" value="radio_2"/> {plan.displayName}
                  </label>
                </div>
              ))}

              {COND(
                              this.state.selectedPlanCode !== 'free',
                              PaymentDetails,
                              undefined
                            )}

              <input className="button" type="submit" value="Save and Finish" />

          </div>
          <div>

            <div className="pricing-plan checkout">
              <p>{this.state.selectedPlan.displayName}</p>
              <h3>${this.state.selectedPlan.amount / 100}/mo</h3>
                <ul>
                  <li>
                    { COND(
                        this.state.selectedPlan.max_buckets === Number.POSITIVE_INFINITY,
                        'Unlimited',
                        this.state.selectedPlan.max_buckets )} Buckets</li>
                  <li>
                  { COND(
                      this.state.selectedPlan.max_submissions_per_month === Number.POSITIVE_INFINITY,
                      'Unlimited',
                      this.state.selectedPlan.max_submissions_per_month )} Submissions</li>
                  <li>Unlimited Custom Rules</li>
                  { COND(this.state.selectedPlan.allow_csv_export,
                    <li>CSV Export</li>,
                    <li><s>CSV Export</s></li>)
                   }
                  {/* COND(this.state.selectedPlan.allow_file_uploads,
                    <li>Up to {this.state.selectedPlan.max_submissions_mb}MB File Uploads</li>,
                    <li><s>File Uploads</s></li>)
                   */}
                </ul>
            </div>

          </div>
        </div>
    )
  }
})

export default Billing
