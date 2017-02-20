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

  getInitialState() {
    return {}
  },

  componentDidMount() {
    this.unsubscribe = UserStore.subscribe(() => {
      this.setState({ user: UserStore.getState() })
    })
  },

  componentWillUnmount() {
    this.unsubscribe()
  },

  render() {
    var {status, trial_period_days, trial_start} = this.state.user || {} // TBD: get from profile
    // console.log('app', this.state)

    var days_remaining=(function(){
      var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
      var secondDate = new Date(trial_start);
      var firstDate = new Date();
      return trial_period_days - Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
    })();

    return (
      <div>
          {
            branch(
              !UserStore.isUserLoggedIn(),
              null,
              status === 'trialing',
              <div className="inline-error">
                <span>{days_remaining} of {trial_period_days} days left on free trial.</span>
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
