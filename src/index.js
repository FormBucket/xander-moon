import React from 'react'
import { render } from 'react-dom'

import { Router, Route, Link, IndexRoute } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import UserStore from './stores/user'

import App from './components/App'
import Welcome from './components/Welcome'
import Signup from './components/Signup'
import Subscribe from './components/Subscribe'
import Login from './components/Login'
import FAQs from './components/FAQs'
import API from './components/API'
import Buckets from './components/Buckets'
import AccountProfile from './components/AccountProfile'
import AccountIntegrations from './components/AccountIntegrations'
import AccountBilling from './components/AccountBilling'
import AccountUsers from './components/AccountUsers'
import Bucket from './components/Bucket'
import Submissions from './components/Submissions'
import PageNotFound from './components/PageNotFound'
import ThankYou from './components/ThankYou'
import Support from './components/Support'
import Affiliates from './components/Affiliates'

require('../scss/app.scss')

// Finally, we render a <Router> with some <Route>s.
// It does all the fancy routing stuff for us.
render((
  <Router history={createBrowserHistory()}>
    <Route path="/" component={App}>
      <IndexRoute component={Welcome} />
      <Route path="signup" component={Signup} />
      <Route path="subscribe" component={Subscribe} />
      <Route path="login" component={Login} />
      <Route path="faqs" component={FAQs} />
      <Route path="api" component={API} />
      <Route path="account/profile" component={AccountProfile} />
      <Route path="account/integrations" component={AccountIntegrations} />
      <Route path="account/billing" component={AccountBilling} />
      <Route path="account/users" component={AccountUsers} />
      <Route path="/buckets" component={Buckets} />
      <Route path="/buckets/:id/settings" component={Bucket} />
      <Route path="/buckets/:id/submissions" component={Submissions} />
      <Route path="/buckets/:id/submissions/:mode/:offset/:limit/:select" component={Submissions} />
      <Route path="thank-you" component={ThankYou} />
      <Route path="support" component={Support} />
      <Route path="affiliates" component={Affiliates} />
      <Route path="*" component={PageNotFound} />
    </Route>
  </Router>
), document.getElementById('root'))
