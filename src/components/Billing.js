import React, { PropTypes } from 'react'
import Markdown from 'react-remarkable'
import markdownOptions from './markdown-options'
import moment from 'moment'
import {COND} from 'functionfoundry'
import {loadSubscriptionPlans, subscribe} from '../stores/ActionCreator'
import {requestStripePubKey} from '../stores/webutils'
import CreditCardForm from './CreditCardForm'
import FontAwesome from 'react-fontawesome'

const Billing = React.createClass({
  getInitialState() {
    var planCode =  UserStore.getPlan() || localStorage.getItem('plan') || 'fb-pro'
    return {
      plans: [],
      selectedPlanCode: planCode,
      selectedPlan: { amount: 0 },
      nowrap: true,
      saving: false
    }
  },

  handleSave() {
    console.log('handle save', this)

    var cardNumber = this.refs.credit_card_form.refs.cardNumber.value
    var cvc = this.refs.credit_card_form.refs.cvc.value
    var exp = this.refs.credit_card_form.refs.exp.value

    this.setState({ saving: true })

    requestStripePubKey().then(
      key => Promise.resolve(Stripe.setPublishableKey(key))
    )
    .then(() => {
      console.log('foo')

      if (!Stripe.card.validateCardNumber(cardNumber)) {
        this.setState({
          error: {
            message: "Invalid card number."
          },
          saving: false
        })
        return
      }

      if (!Stripe.card.validateCVC(cvc)) {
        this.setState({
          error: {
            message: "Invalid cvc number."
          },
          saving: false
        })
        return
      }

      if (!Stripe.card.validateExpiry(exp)) {
        this.setState({
          error: {
            message: "Invalid exp date. Must be MM/YY or MM/YYYY"
          },
          saving: false
        })
        return
      }

      Stripe.card.createToken({
        number: cardNumber,
        cvc: cvc,
        exp: exp,
      }, (status, response) => {

        if (status !== 200) {
          // got back error from Stripe
          console.log('error', status, response.error )
          this.setState({ error: response.error, saving: false })
          return
        }

        // reset error state
        this.setState({ error: undefined, saving: false })

        // got back response from Stripe
        console.log('got token', response.id, 'will now subscribe to', this.state.selectedPlanCode)

        // Subscribe user to Plan
        subscribe(response.id, this.state.selectedPlanCode)
        .then((result) =>{
          console.log( 'User', result.stripe_customer_id, 'is now subscribed to', result.stripe_subscription_id )

          // FIXME: What to do after user subscription is saved?
          this.props.history.push(this.props.redirect || '/buckets')

        })

      })

    })


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

    let PlanSelector = (
      <div key="PlanSelector">
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
      </div>
    )


    return wrap(
       <div className="wrapper">
          <h2>You can upgrade or downgrade your plan at any time.</h2>
          {/* <p>Pssst...want to get a month free? See <a href="#">annual pricing</a>.</p> */}
          <div className="billing-details">
            {PlanSelector}
            <div key="PaymentDetails">
              <hr/>
              <div>
                <h3><FontAwesome name='lock' /> Payment Details</h3>
                <div style={{ display: this.state.error ? '' : 'none', color: 'red', backgroundColor: 'white', padding: 10, marginBottom: 10 }}>
                  { this.state.error ? this.state.error.message : null }
                </div>
                <CreditCardForm ref="credit_card_form" />
                <p>Your card will be charged ${this.state.selectedPlan.amount / 100}.00 on the {moment().format('Do')} of each month.</p>
              </div>
          </div>

            <input onClick={this.handleSave} disabled={this.state.saving} className="button" type="button" value="Save and Finish" />
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
