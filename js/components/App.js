/**
* Copyright (c) 2015, Peter W Moresi
*/

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {branch} from 'functionfoundry';
import UserStore from '../stores/user'

/* Write some great components about what data
* this application displays and how it needs to be
* organized.
*/
const App = React.createClass({
  render() {
    var status = 'canceled' // TBD: get from profile
    return (
      <div>
          {
            branch(
              !UserStore.isUserLoggedIn(),
              null,
              status === 'trialing',
              <div className="inline-error">
                <span>? of ? days left on free trial.</span>
              </div>,
              status === 'past_due',
              <div className="inline-error">
                <span>Please <a href="/account">update your billing info</a> to continue using FormBucket.</span>
              </div>,
              status === 'canceled',
              <div className="inline-error">
                <span>Your account is not receiving submissions. Please <a href="/account">update your billing info</a>.</span>
              </div>
            )
          }
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
