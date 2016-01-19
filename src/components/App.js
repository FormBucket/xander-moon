/**
* Copyright (c) 2015, Peter W Moresi
*/

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import UserStore from '../stores/user'
import SubscriptionStore from '../stores/subscription'
import {streamSubmissions, loadProfile} from '../stores/ActionCreator'
import {getStripePubKey} from '../stores/webutils'

/* Write some great components about what data
* this application displays and how it needs to be
* organized.
*/
const App = React.createClass({
  componentDidMount () {
    loadProfile()
    .then(n => console.log('app loaded profile:', n))
    // if (UserStore.isUserLoggedIn()) {
    //   this.stream = streamSubmissions();
    // }
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
