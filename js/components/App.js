/**
* Copyright (c) 2015, Peter W Moresi
*/

import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {branch, isBlank} from 'functionfoundry';
import UserStore from '../stores/user'
import {loadProfile} from '../stores/ActionCreator'

/* Write some great components about what data
* this application displays and how it needs to be
* organized.
*/
class App extends React.Component {
  state = {};

  componentDidMount() {

    if (window.Intercom) {
      window.Intercom("boot", {
        app_id: "n2h7hsol"
      });
    }

    loadProfile()

    this.unsubscribe = UserStore.subscribe(() => {
      this.setState({ user: UserStore.getState() })
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    var {status, trial_period_days, trial_start, has_source} = this.state.user || {} // TBD: get from profile
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
              status === 'trialing' && !has_source,
              <div className="inline-error">
                <span><strong>{days_remaining} of {trial_period_days} days left on free trial. {has_source}</strong></span>
              </div>,
              status === 'past_due',
              <div className="inline-error">
                <span>Please <a href="/account">update your billing info</a> to continue using FormBucket.</span>
              </div>,
              status === 'canceled',
              <div className="inline-error">
                <span>Your account is not receiving submissions. Please <a href="/account">update your billing info</a>.</span>
              </div>,
              null
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
}

export default App
