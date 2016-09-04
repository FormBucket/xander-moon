import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import Markdown from 'react-remarkable'
import markdownOptions from '../markdown-options'
import moment from 'moment'
import {branch, isBlank} from 'functionfoundry'
import {loadSubscriptionPlans, subscribe, cancelSubscription} from '../stores/ActionCreator'
import {requestStripePubKey, requestProfile, requestCreditCards} from '../stores/webutils'
import CreditCardForm from './CreditCardForm'
import FontAwesome from 'react-fontawesome'
import UserStore from '../stores/user'

const Billing = React.createClass({
  getInitialState() {
    var planCode =  UserStore.getPlan() || localStorage.getItem('plan') || 'fb-pro'
    return {
      plans: [],
      selectedPlan: { amount: 0 },
      nowrap: true,
      saving: false
    }
  },

  handleSave() {


    var {selectedPlan, plans} = this.state

    this.setState({ saving: true })

    requestStripePubKey().then(
      key => Promise.resolve(Stripe.setPublishableKey(key))
    )
    .then(() => {

      if (this.state.editCC) {
        var cardNumber = this.refs.credit_card_form.refs.cardNumber.value
        var cvc = this.refs.credit_card_form.refs.cvc.value
        var exp = this.refs.credit_card_form.refs.exp.value

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
            // console.log('error', status, response.error )
            this.setState({ error: response.error, saving: false })
            return
          }

          // reset error state
          this.setState({ error: undefined, editCC: false, cards: [response.card], saving: false })

          // got back response from Stripe
          console.log('got token', response.id)

          // Subscribe user to Plan
          subscribe(response.id, selectedPlan.id)
          .then((result) =>{
            console.log( 'User', result, 'is now subscribed to', result.plan)

            this.setState({
              active: true,
              saving: false,
              editCC: false,
              selectedPlan: result.plan,
              enrolledPlan: result.plan
            })

          })

        })
      } else {
        // Subscribe user to Plan
        subscribe(null, selectedPlan.id)
        .then((result) =>{
          console.log( 'Result', result )

          this.setState({
            active: true,
            saving: false,
            editCC: false,
            selectedPlan: result.plan,
            enrolledPlan: result.plan
          })
        })
      }

    })


  },

  componentDidMount() {

    Promise.all([
      requestProfile(),
      loadSubscriptionPlans(),
      requestCreditCards()
    ])
    .then( values => {
      console.log('got values', values)
      this.setState({
        user: values[0],
        plans: values[1],
        active: (values[0].plan || '').length > 0,
        selectedPlan: values[1].filter(d => d.id === values[0].plan)[0] || values[1][0],
        enrolledPlan: values[1].filter(d => d.id === values[0].plan)[0],
        cards: values[2],
        editCC: values[2].length === 0
      })
    })
  },

  componentWillUnmount() {
    this.token()
  },


  handlePlanClick(planCode, event) {
    //console.log( this, planCode )
    localStorage.setItem('plan', planCode )
    this.setState({
      selectedPlan: this.state.plans.filter( n=> n.id === planCode)[0]
    })
  },

  handleCancelSubscription() {
    cancelSubscription()
    .then(n => {
      this.setState({
        enrolledPlan: null,
        selectedPlan: this.state.plans[0],
        editCC: false,
        active: false
      })
    })
  },

  render () {

    let cmp = this
    console.log('render', this, this.state.plans)

    var {active, valid_until, user, plans, error, selectedPlan, enrolledPlan} = this.state

    enrolledPlan = enrolledPlan || {}

    console.log('enrolledPlan', enrolledPlan)

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

    if (plans.length === 0) {
      return wrap(
        <div className="wrapper">
          Loading...
        </div>)
    }

    let PlanSelector = (
      <div key="PlanSelector">
        <h3>Plan</h3>
        { branch(
          !active,
          () =>
          <div>
            Upgrade your account to use our premium features.
          </div>
        )}
        { plans.map( plan => branch(
          enrolledPlan.id === plan.id,
          () => <div key={plan.id} className="selected-plan" onClick={this.handlePlanClick.bind(cmp, plan.id )}>
            <label>
              <input type="radio" className="radio" name="radio_button" value="radio_1" checked={selectedPlan.id===plan.id}/> {plan.name}
                <span className="pill">Enrolled!</span>
            </label>
          </div>,
          selectedPlan.id === plan.id,
          () => <div key={plan.id} className="billing-plan">
            <label>
              <input type="radio" className="radio" name="radio_button" value="radio_1" checked={selectedPlan.id===plan.id}/> {plan.name}
                <span className="pill">Selected!</span>
            </label>
          </div>,
          () => <div key={plan.id} className="billing-plan" onClick={this.handlePlanClick.bind(cmp, plan.id )}>
            <label>
              <input type="radio" className="radio" name="radio_button" value="radio_2"/> {plan.name}
            </label>
          </div>
        ))}
        <br />
        { branch(active && !this.state.editCC &&  selectedPlan.id !== enrolledPlan.id,
          <input onClick={this.handleSave} disabled={this.state.saving} className="button" type="button" value="Switch Plan" />
        )}
      </div>
    )


    return wrap(
       <div className="wrapper">
          { branch(this.props.hideHeading,
            undefined,
            <h2>You can upgrade or downgrade your plan at any time.</h2>)}


          {/* <p>Pssst...want to get a month free? See <a href="#">annual pricing</a>.</p> */}
          <div className="billing-details">
            {PlanSelector}
            <div key="PaymentDetails">
              <hr/>
              <div>
                <h3><FontAwesome name='lock' /> Payment Details</h3>
                <div style={{ display: error ? '' : 'none', color: 'red', backgroundColor: 'white', padding: 10, marginBottom: 10 }}>
                  { error ? error.message : null }
                </div>
                {branch(
                  this.state.cards.length > 0 && !this.state.editCC,
                  () => <div>
                    {this.state.cards[0].brand}
                    <div>#### #### #### {this.state.cards[0].last4}</div>
                    <div>Expires {this.state.cards[0].exp_month}/{this.state.cards[0].exp_year}</div>
                    <button onClick={() => this.setState({ editCC: true })}>Edit Card</button>
                  </div>,
                  <CreditCardForm ref="credit_card_form" handleSubmit={this.handleSave} />
                )}
              </div>
          </div>

            {branch(this.state.editCC, <input onClick={this.handleSave} disabled={this.state.saving} className="button" type="button" value="Save and finish" />)}
            {branch(this.state.saving, <div>Saving....</div>, undefined)}

            {branch(active, () => <p>Your card will be charged ${selectedPlan.amount / 100}.00 on the {moment().format('Do')} of each month.</p>)}

            { branch(this.props.hideHeading && this.state.active,
              <div>
                <hr />
                <label>Stop billing and unsubscribe from this service.</label>
                <button className="button secondary" onClick={this.handleCancelSubscription}>Cancel Subscription</button>
                <i>Your service will continue until {moment(valid_until).format('MMM Do')}.</i>
              </div>,
              undefined
            )}
          </div>
          <div className="pricing-plan checkout">

            {branch(!isBlank(selectedPlan), () => (
            <div>
              <p>{selectedPlan.name}</p>
              <h3>${selectedPlan.amount / 100}/mo</h3>
                <ul>
                  <li>
                    { branch(
                        selectedPlan.max_buckets === Number.POSITIVE_INFINITY,
                        'Unlimited',
                        selectedPlan.max_buckets )} Buckets</li>
                  <li>
                  { branch(
                      selectedPlan.max_submissions_per_month === Number.POSITIVE_INFINITY,
                      'Unlimited',
                      selectedPlan.max_submissions_per_month )} Submissions</li>
                  <li>Unlimited Custom Rules</li>
                  { branch(selectedPlan.allow_csv_export,
                    <li>CSV Export</li>,
                    <li><s>CSV Export</s></li>)
                   }
                  {/* branch(selectedPlan.allow_file_uploads,
                    <li>Up to {selectedPlan.max_submissions_mb}MB File Uploads</li>,
                    <li><s>File Uploads</s></li>)
                   */}
                </ul>
            </div>))}

          </div>
        </div>
    )
  }
})

export default Billing
