/**
* Copyright (c) 2015, Peter W Moresi
*/

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import UserStore from '../stores/user'
import SubscriptionStore from '../stores/subscription'
import {loadProfile, loadSubscriptionPlans} from '../stores/ActionCreator'

/* Write some great components about what data
* this application displays and how it needs to be
* organized.
*/
const App = React.createClass({
  componentDidMount () {
    loadProfile()
    .then(profile => console.log('app loaded profile:', profile))

    loadSubscriptionPlans()
    .then( plans => {
      console.log('got plans', plans)
      cmp.setState({ plans: plans })
    })
  },
  componentWillUnmount() {
    // if (UserStore.isUserLoggedIn()) {
    //   this.stream.close();
    // }
  },
  render() {
    return (
      <div>
        <Header history={this.props.history} />
        <div className="main">
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
});

export default App
