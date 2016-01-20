import React, { PropTypes } from 'react'
import {ISFUNCTION} from 'functionfoundry'

const CreditCardForm = React.createClass({
  handleChange(event) {
    if (ISFUNCTION(this.props.onChange)) {
      return this.props.onChange(event)
    }
  },
  render () {
    return (
      <div className="payment-info">
        <div className="cardNumber">
          <label htmlFor="cardNumber">Card Number</label>
          <input name="number" onChange={this.handleChange} type="text" ref="cardNumber" data-stripe="number"/>
        </div>
        <div className="exp">
          <label htmlFor="exp">Exp</label>
          <input name="expiry" type="text" ref="exp" data-stripe="exp" placeholder="MM/YYYY"/>
        </div>
        <div className="cvc">
          <label htmlFor="cvc">CVC</label>
          <input name="csv" type="text" ref="cvc" data-stripe="cvc"/>
        </div>
      </div>
    )
  }
})

export default CreditCardForm
