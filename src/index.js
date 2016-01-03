import React from 'react'
import { render } from 'react-dom'

import { Router, Route, Link, IndexRoute } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import UserStore from './stores/user'

import App from './components/App'
import Welcome from './components/Welcome'
import Signup from './components/Signup'
import Billing from './components/Billing'
import Login from './components/Login'
import FAQs from './components/FAQs'
import API from './components/API'
import Dashboard from './components/Dashboard'
import Account from './components/Account'
import Bucket from './components/Bucket'
import Submissions from './components/Submissions'
import Profile from './components/Profile'
import PageNotFound from './components/PageNotFound'
import ThankYou from './components/ThankYou'
import Support from './components/Support'
import Affiliates from './components/Affiliates'

require('../scss/app.scss')

// Finally, we render a <Router> with some <Route>s.
// It does all the fancy routing stuff for us.
render((
  <Router history={createBrowserHistory()} onUpdate={() => window.prerenderReady = true}>
    <Route path="/" component={App}>
      <IndexRoute component={Welcome} />
      <Route path="signup" component={Signup} />
      <Route path="billing" component={Billing} />
      <Route path="login" component={Login} />
      <Route path="faqs" component={FAQs} />
      <Route path="api" component={API} />
      <Route path="account" component={Account} />
      <Route path="/buckets" component={Dashboard} />
      <Route path="/buckets/:id/settings" component={Bucket} />
      <Route path="/buckets/:id/submissions" component={Submissions} />
      <Route path="profile" component={Profile} />
      <Route path="thank-you" component={ThankYou} />
      <Route path="support" component={Support} />
      <Route path="affiliates" component={Affiliates} />
      <Route path="*" component={PageNotFound} />
    </Route>
  </Router>
), document.getElementById('root'))
