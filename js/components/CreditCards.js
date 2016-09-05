import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import Markdown from 'react-remarkable'
import markdownOptions from '../markdown-options'
import moment from 'moment'
import {branch, isBlank} from 'functionfoundry'
import {loadSubscriptionPlans, subscribe, cancelSubscription} from '../stores/ActionCreator'
import {requestStripePubKey, requestDeleteCreditCard, requestCreditCards, requestAddCreditCard, requestUpdateCreditCard} from '../stores/webutils'
import CreditCardForm from './CreditCardForm'
import FontAwesome from 'react-fontawesome'
import UserStore from '../stores/user'
import Modal from 'react-modal';

const Billing = React.createClass({
  getInitialState() {
    return {
      card: {},
      cards: [],
      loading: true,
      addNewCard: false,
      saving: false
    }
  },

  componentDidMount() {
    if (UserStore.isUserLoggedIn() === false) {
      this.props.history.push('/login')
    }

    requestStripePubKey().then(
      key => Promise.resolve(Stripe.setPublishableKey(key))
    )

    requestCreditCards()
    .then( cards => {
      this.setState({
        loading: false,
        cards: cards
      })
    })
  },

  addCreditCard(event) {
    this.setState({ saving: true })
    Stripe.card.createToken({
      number: this.state.number,
      cvc: this.state.cvc,
      exp: this.state.exp
    }, (status, response) => {

      if (status !== 200) {
        // got back error from Stripe
        // console.log('error', status, response.error )
        this.setState({ error: response.error, saving: false })
        return
      }

      requestAddCreditCard(response.id)
      .then(n => this.setState({ addNewCard: false, saving: false, cards: this.state.cards.concat([n])}))

    })
  },

  editCreditCard(event) {
    this.setState({ saving: true })

    requestUpdateCreditCard(this.state.card.id, {
      name: this.state.name
    })
    .then(response => {
      this.setState({ editCard: false, saving: false, cards: this.state.cards.filter( d => d.id !== this.state.card.id ).concat([response]) })
    })
  },

  handleDelete(event, id) {
    event.target.disabled = true
    requestDeleteCreditCard(id)
    .then(d => {
      this.setState({ cards: this.state.cards.filter( d => d.id !== id )})
    })
  },

  handleEdit(event, card) {
    this.setState({ editCard: true, card: card})
  },

  render () {

    let cmp = this
    console.log('render', this, this.state.plans)

    var {cards, loading} = this.state


    function wrap(el) {
      if (cmp.props.nowrap) { return el }
      return (
       <div>
        <div className="page-heading">
          <div className="wrapper">
            <h1>Credit Cards</h1>
          </div>
        </div>
        {el}
      </div>
      )
    }

    if (loading) {
      return wrap(
        <div className="wrapper">
          Loading...
        </div>)
    }


    return wrap(
       <div className="wrapper">
         <button onClick={() => this.setState({ addNewCard: true })}>Add new card</button>
         <table>
           <tbody>
             <tr>
               <th>Name</th>
               <th>Brand</th>
               <th>Last4</th>
               <th>Expiration</th>
               <th width="200"></th>
             </tr>
             {
               this.state.cards.map((d) => (
                 <tr key={d.id}>
                   <td>{d.name}</td>
                   <td>{d.brand}</td>
                   <td>{d.last4}</td>
                   <td>{d.exp_month} / {d.exp_year}</td>
                   <td style={{ textAlign: 'right'  }}>
                     <button onClick={(event) => this.handleEdit(event, d)}>Edit</button>{' '}
                     <button onClick={(event) => this.handleDelete(event, d.id)}>Delete</button>
                   </td>
                 </tr>
                 )
               )
             }
           </tbody>
         </table>

         <Modal
           isOpen={this.state.addNewCard}
           onAfterOpen={this.afterOpenModal}
           onRequestClose={this.closeModal}>
           <h2 ref="subtitle">Add Credit Card</h2>
           <div className="payment-info">
             <div className="cardNumber">
               <label htmlFor="cardNumber">Card Number</label>
               <input name="number" type="text" defaultValue={this.state.card.name} onKeyUp={(event) => this.setState({ number: event.target.value })} />
             </div>
             <div className="exp">
               <label htmlFor="exp">Exp</label>
               <input name="expiry" type="text" onKeyUp={(event) => this.setState({ exp: event.target.value })} placeholder="MM/YYYY"/>
             </div>
             <div className="cvc">
               <label htmlFor="cvc">CVC</label>
               <input name="csv" type="text" onKeyUp={(event) => this.setState({ cvc: event.target.value })} />
             </div>
           </div>
           <br/><br/>
           <button disabled={this.state.saving} onClick={this.addCreditCard}>Save</button>
           <br/><br/>
           <button disabled={this.state.saving} onClick={() => this.setState({ addNewCard: false })}>Cancel</button>
         </Modal>


         <Modal
           isOpen={this.state.editCard}>
           <h2 ref="subtitle">Edit Credit Card</h2>
           {this.state.card.brand} {this.state.card.last4}
           <div className="payment-info">
             <div className="cardNumber">
               <label htmlFor="cardNumber">Name</label>
               <input name="number" type="text" onKeyUp={(event) => this.setState({ name: event.target.value })} />
             </div>
           </div>
           <button disabled={this.state.saving} onClick={this.editCreditCard}>Save</button>
           <br/><br/>
           <button disabled={this.state.saving} onClick={() => this.setState({ editCard: false })}>Cancel</button>
         </Modal>
      </div>
    )
  }
})

export default Billing
