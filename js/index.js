import React from 'react'
import { render } from 'react-dom'

import { Router, Route, Link, IndexRoute, browserHistory } from 'react-router'

import UserStore from './stores/user'

import App from './components/App'
import Welcome from './components/Welcome'
import Signup from './components/Signup'
import Login from './components/Login'
import Buckets from './components/Buckets'
import Logs from './components/Logs'
import Log from './components/Log'
import Account from './components/Account'
import Bucket from './components/Bucket'
import Submissions from './components/Submissions'
import PageNotFound from './components/PageNotFound'
import PasswordReset from './components/PasswordReset'

import UsersReport from './components/UsersReport'
import UserReport from './components/UserReport'

require('../scss/app.scss')

browserHistory.listen((location, action) => {
  if (window.Intercom) {
    window.Intercom('update');
  }
})

// Finally, we render a <Router> with some <Route>s.
// It does all the fancy routing stuff for us.
render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Welcome} />
      <Route path="signup" component={Signup} />
      <Route path="login" component={Login} />
      <Route path="account" component={Account} />
      <Route path="buckets" component={Buckets} />
      <Route path="buckets/:id/settings" component={Bucket} />
      <Route path="buckets/:id/submissions" component={Submissions} />
      <Route path="buckets/:id/submissions/:mode/:offset/:limit/:select" component={Submissions} />
      <Route path="password_reset" component={PasswordReset} />
      <Route path="logs" component={Logs} />
      <Route path="logs/:log_id" component={Log} />
      <Route path="admin/users_report" component={UsersReport} />
      <Route path="admin/user_report/:user_id" component={UserReport} />
      <Route path="*" component={PageNotFound} />
    </Route>
  </Router>
), document.getElementById('root'))
