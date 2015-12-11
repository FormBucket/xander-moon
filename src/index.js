import React from 'react'
import { render } from 'react-dom'

import { Router, Route, Link, IndexRoute } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import App from './components/App'

import Welcome from './components/Welcome'
import Login from './components/Login'
import FAQs from './components/FAQs'
import API from './components/API'
import Forms from './components/Forms'
import Submissions from './components/Submissions'
import Profile from './components/Profile'
import PageNotFound from './components/PageNotFound'
import {initUser} from './stores/actions'
import {dispatch} from 'sweetflux'

dispatch(initUser)

require('../scss/app.scss')


function handleUpdate(){
  window.prerenderReady = true
}
// Finally, we render a <Router> with some <Route>s.
// It does all the fancy routing stuff for us.
render((
  <Router history={createBrowserHistory()} onUpdate={handleUpdate}>
    <Route path="/" component={App}>
      <IndexRoute component={Welcome} />
      <Route path="login" component={Login} />
      <Route path="faqs" component={FAQs} />
      <Route path="api" component={API} />
      <Route path="forms" component={Forms} />
      <Route path="submissions" component={Submissions} />
      <Route path="profile" component={Profile} />
      <Route path="*" component={PageNotFound} />
    </Route>
  </Router>
), document.getElementById('root'))
