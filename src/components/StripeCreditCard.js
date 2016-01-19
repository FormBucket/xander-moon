import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'

const StripeCreditCard = React.createClass({
  render () {
    return (
      <div>
        <hr/>
        <h3><FontAwesome name='lock' /> Payment Details</h3>
          <div className="payment-info">
            <div style={{ display: this.props.error ? '' : 'none', color: 'red', backgroundColor: 'white', padding: 10, marginBottom: 10 }}>
              { this.props.error ? this.props.error.message : null }
            </div>
            <div className="cardNumber">
              <label htmlFor="cardNumber">Card Number</label>
              <input type="text" ref="cardNumber" data-stripe="number"/>
            </div>
            <div className="cvc">
              <label htmlFor="cvc">CVC</label>
              <input type="text" ref="cvc" data-stripe="cvc"/>
            </div>
            <div className="exp">
              <label htmlFor="exp">Exp</label>
              <input type="text" ref="exp" data-stripe="exp" placeholder="MM/YYYY"/>
            </div>
          </div>
      </div>
    )
  }
})

export default StripeCreditCard
