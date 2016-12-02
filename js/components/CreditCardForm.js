var FontAwesome = require('react-fontawesome');
import React, { PropTypes } from 'react'

const CreditCardForm = React.createClass({

  handleKeyUp (event) {
    if (event.keyCode === 13) {
      this.props.onSubmit(event)
    }
  },

  render () {
    return (
      <div className="payment-info">
        <div className="payment-meta">
          <div className="security-info">
            <p><FontAwesome name='lock' /> All transactions are secure and encrypted.</p>
          </div>
          <img className="stripe-badge" src="/img/stripe.svg" />
        </div>
        <div className="card-details">
          <div className="cardNumber">
            <label htmlFor="cardNumber">Card Number</label>
            <input name="number" onKeyUp={this.handleKeyUp} type="text" ref="cardNumber" data-stripe="number"/>
          </div>
          <div className="exp">
            <label htmlFor="exp">Exp</label>
            <input name="expiry" onKeyUp={this.handleKeyUp} type="text" ref="exp" data-stripe="exp" placeholder="MM/YYYY"/>
          </div>
          <div className="cvc">
            <label htmlFor="cvc">CVC</label>
            <input name="csv" onKeyUp={this.handleKeyUp} type="text" ref="cvc" data-stripe="cvc"/>
          </div>
        </div>
      </div>
    )
  }
})

export default CreditCardForm
