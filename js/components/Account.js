import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import {Link} from 'react-router'
import FlashMessage from './FlashMessage'
import { requestUpdateUser, requestDestroyAccount, requestStripePubKey, requestCreditCards} from '../stores/webutils'
import { loadProfile, subscribe } from '../stores/ActionCreator'
import CreditCardForm from './CreditCardForm'
import {branch} from 'functionfoundry'
import UserStore from '../stores/user'

const plan = 'plan_mo_7_14'

function subscribeUser({ account_id, number, cvc, exp}) {

  return new Promise((resolve, reject) => {

    if (!Stripe.card.validateCardNumber(number)) {
      reject("Invalid card number.")
      return
    }

    if (!Stripe.card.validateCVC(cvc)) {
      reject("Invalid cvc number.")
      return
    }

    if (!Stripe.card.validateExpiry(exp)) {
      reject("Invalid exp date. Must be MM/YY or MM/YYYY")
      return
    }

    Stripe.card.createToken({
      number: number,
      cvc: cvc,
      exp: exp,
    }, (status, response) => {

      if (status !== 200) {
        reject(response.error)
        return
      }

      // got back response from Stripe
      console.log('got token', response.id)

      // Subscribe user to Plan
      subscribe(account_id,  response.id, plan)
      .then((result) =>{
        console.log( result )
        resolve(result)
      })

    })
  })
}

const Account = React.createClass({
  getInitialState () {
    return {
      show_token: false,
      flash: undefined,
      user: null,
      cards: []
    }
  },

  componentDidMount() {

    Promise.all([
      requestStripePubKey(),
      loadProfile()
    ])
    .then(
      values => {
        console.log(values)
        Stripe.setPublishableKey(values[0].key)
        this.setState({ user: values[1] })
        return Promise.resolve(values[1])
      }
    )
    .then( (user) => requestCreditCards(user.account_id) )
    .then( cards => this.setState({ cards }))
    .catch((error) => {
      localStorage.removeItem('token');
      this.props.history.push('/')
    })
  },

  handleDeleteAccount() {
    if (confirm("Your account and data will be gone forever. Continue?")) {
      requestDestroyAccount()
      .then(n => {
        localStorage.removeItem('token');
        this.props.history.push('/')
      })
    }
  },



  handleSave() {

    // TBD: Subscribe the user.
    // 1. Exchange credit card info for source id.
    // 2. Subscribe user with plan and source id.

    this.setState({ saving: true })

    if (false) {

    }

    var values = this.refs.credit_card_form.getValues()
    values.account_id = this.state.user.account_id

    var next = values.number ? subscribeUser(values) : Promise.resolve()


    //subscribeUser()
    next
    .then( () => requestUpdateUser({
      id: this.state.user.id,
      name: this.refs.name.value,
      email: this.refs.email.value,
      password: this.refs.password.value
    }))
    .then(user => {
      this.setState({
        saving: false,
        flash: 'Saved'
      })

      setTimeout(() => this.setState({ flash: undefined }), 2000)

    })
    .catch(error => this.setState({
      saving: false,
      flash: 'Error saving',
      error: error
    }))

  },

  render () {


    if (!this.state.user || !this.state.user.email) {
      return <div>Loading...</div>
    }


    var {status, valid_until, trial_end, plan_amount} = this.state.user
    var {cards} = this.state

    valid_until = new Date(valid_until)
    trial_end = new Date(trial_end)
    // status = 'active'

    console.log('render', this.state, cards)

    return (
      <div>
        <FlashMessage text={this.state.flash} />
        <div className="page-heading">
          <div className="wrapper">
            <h1>Account</h1>
          </div>
        </div>
        <div className="wrapper">
          <div className="half-width">
            <label htmlFor="fullName">Full Name</label>
            <input type="text" ref="name" name="displayName" defaultValue={this.state.user.name} placeholder="e.g. Nikola Tesla"/>
            {/*<label htmlFor="orgName">Company / Org</label>
              <in$put type="text" ref="org" defaultValue={this.state.user.org} />*/}
            <label htmlFor="emailAddress">Email Address</label>
            <input type="text" ref="email" name="username" defaultValue={this.state.user.email} placeholder="nikola@altcurrent.com"/>
            <label htmlFor="password">Change Password</label>
            <input type="password" ref="password" defaultValue="" />
            {
              branch(
                status === 'trialing',
                <div className="inline-info">
                  <span>Your free trial ends on { (trial_end.getMonth()+1) + '/' + trial_end.getDate() + '/' + trial_end.getFullYear()}</span>
                </div>,
                status === 'active',
                <div className="inline-info">
                  <span>Your next billing date is { (valid_until.getMonth()+1) + '/' + valid_until.getDate() + '/' + valid_until.getFullYear()} for ${(plan_amount/100)}</span>
                </div>,
                status === 'past_due',
                <div className="inline-error">
                  <span>Please update your billing details</span>
                </div>,
                status === 'canceled',
                <div className="inline-error">
                  <span>Please update your billing details</span>
                </div>
              )
            }
            <CreditCardForm ref="credit_card_form"
              ref="credit_card_form"
              number={ cards.length > 0  ? `#### #### #### ${cards[0].last4}` : ''}
              exp_year="2017" exp_month="09"
              handleSubmit={this.handleSave} />
            {/*
            <label className="annual">
              <input type="checkbox" class="checkbox" name="checkboxes" value="check_1" />

              {
                branch(
                status === 'trialing',
                'Pay $60 annually and save 50% over the monthly plan!',
                status === 'active',
                'Switch to annual billing and save 50%',
                status === 'past_due',
                'Pay $60 annually and save 50% over the monthly plan!',
                status === 'canceled',
                'Pay $60 annually and save 50% over the monthly plan!'
                )
              }
            </label>
            */}
            <button disabled={this.state.saving} className="button secondary" onClick={this.handleSave}>Save Changes</button>
            { /*IF(this.state.active,
              <div>
              <hr />
              <label>Stop billing and unsubscribe from this service</label>
              <button className="button secondary" onClick={this.handleDelete}>Cancel Subscription</button>
              </div>,
              <div>
              <hr />
              Subscription is not active. <Link to="account/billing">Activate Subscription</Link>
              </div>
              ) */}
              {/* <hr />
              <label>Download account archive</label>
              <button className="button secondary" onClick={() => alert('tbd')}>Download Archive</button> */}
          </div>
          <div className="account-sidebar">
            <p>
              <a onClick={() => {
                  localStorage.removeItem('token');
                  this.props.history.push('/');
                } }>Log Out
              </a>
            </p>
            <p>
              <a onClick={() => this.setState({ show_token: !this.state.show_token })}>{this.state.show_token ? 'Hide API Key' : 'Show API Key' }</a>
              <span style={{ display: this.state.show_token ? '' : 'none' }}>
                <br />
                <span>
                  <a href="/docs/api">(How to use this)</a>
                </span>
                <textarea rows={4} value={this.state.show_token ? localStorage.token : ''} />
              </span>
            </p>
            <p>
              <a onClick={() => {
                  this.props.history.push('/logs');
                } }>View Logs
              </a>
            </p>
            <p>
              <a className="danger" onClick={this.handleDeleteAccount}>Cancel Account</a> <FontAwesome className="danger" name="frown-o" />
            </p>
          </div>
        </div>
      </div>
      )
    }
  })

  export default Account
