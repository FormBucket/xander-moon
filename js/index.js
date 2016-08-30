import React from 'react'
import { render } from 'react-dom'

import { Router, Route, Link, IndexRoute } from 'react-router'
import { browserHistory } from 'react-router'

import UserStore from './stores/user'

import App from './components/App'
import Welcome from './components/Welcome'
import Signup from './components/Signup'
import Subscribe from './components/Subscribe'
import Login from './components/Login'
import Buckets from './components/Buckets'
import AccountProfile from './components/AccountProfile'
import Bucket from './components/Bucket'
import Submissions from './components/Submissions'
import PageNotFound from './components/PageNotFound'
import PasswordReset from './components/PasswordReset'

import UserReport from './components/UserReport'

require('../scss/app.scss')

// Finally, we render a <Router> with some <Route>s.
// It does all the fancy routing stuff for us.
render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Welcome} />
      <Route path="signup" component={Signup} />
      <Route path="subscribe" component={Subscribe} />
      <Route path="login" component={Login} />
      <Route path="account" component={AccountProfile} />
      <Route path="buckets" component={Buckets} />
      <Route path="buckets/:id/settings" component={Bucket} />
      <Route path="buckets/:id/submissions" component={Submissions} />
      <Route path="buckets/:id/submissions/:mode/:offset/:limit/:select" component={Submissions} />
      <Route path="password_reset" component={PasswordReset} />
      <Route path="admin/user_report" component={UserReport} />
      <Route path="*" component={PageNotFound} />
    </Route>
  </Router>
), document.getElementById('root'))
