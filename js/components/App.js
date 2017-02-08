/**
* Copyright (c) 2015, Peter W Moresi
*/

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {branch} from 'functionfoundry';

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
              status === 'trialing',
              <div style={{ top: 0, width: '100%', textAlign: 'center', backgroundColor: 'red' }}>
                <span>? of ? days left of free trial. <a href="/account">Upgrade Now</a></span>
              </div>,
              status === 'past_due',
              <div style={{ top: 0, width: '100%', textAlign: 'center', backgroundColor: 'red' }}>
                <span><a href="/account">Update billing info</a> to prevent account from being disabled.</span>
              </div>,
              status === 'canceled',
              <div style={{ top: 0, width: '100%', textAlign: 'center', backgroundColor: 'red' }}>
                <span>Your account has been disabled and is no longer receiving submissions. <a href="/account">Upgrade Now</a></span>
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
