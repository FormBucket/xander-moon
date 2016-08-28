import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import {COND, EQ} from 'functionfoundry'

const AccountMenu = React.createClass({

  makeTab(name) {
    return COND(
      EQ(this.props.active, name),
      <li className="active">
        {name}
      </li>,
      <li>
        <Link to={"/account/" + name.toLowerCase()}>{name}</Link>
      </li>
    )
  },

  render () {
    return (
      <ul className="page-nav">
        {this.makeTab('Profile')}
        {this.makeTab('Billing')}
      </ul>
    )
  }
})

export default AccountMenu
