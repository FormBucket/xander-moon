import React, { PropTypes } from 'react'
import Billing from './Billing'
import UserStore from '../stores/user'

const Subscribe = React.createClass({
  componentDidMount() {
    if (UserStore.isUserLoggedIn()) {
      this.props.history.push('/account/billing')
    }
  },
  render () {
    return (
      <Billing nowrap={false} title="Subscribe" />

    )
  }
})

export default Subscribe
