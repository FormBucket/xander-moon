import React, { PropTypes } from 'react'
import {ISFUNCTION} from 'functionfoundry'

const CreditCardForm = React.createClass({

  handleKeyUp (event) {
    if (event.keyCode === 13) {
      this.props.handleSubmit(event)
    }
  },

  render () {
    return (
      <div className="payment-info">
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
    )
  }
})

export default CreditCardForm
