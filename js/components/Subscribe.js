import React, { PropTypes } from 'react'
import Billing from './Billing'
import UserStore from '../stores/user'

const Subscribe = React.createClass({
  componentDidMount() {
    // enforce user flow
    if (!UserStore.isUserLoggedIn()) {
      this.props.history.push('/signup')
    }

    window.scrollTo(0, 0)
  },
  render () {
    return (
      <Billing nowrap={false} title="Subscribe" history={this.props.history} />
    )
  }
})

export default Subscribe
