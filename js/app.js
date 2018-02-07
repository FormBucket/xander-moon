import React from 'react'
import { boot, subscribe, dispatch } from 'xander'
import routes from './routes'

import Loader from './components/Loader'

// preload this common code.
import './stores/ActionCreator'
import './stores/webutils'
import './stores/user'
import './stores/bucket'
import './stores/buckets'
import './stores/submissions'

require('../scss/app.scss')

// load login and signup.
let findRoute = (name) => {
  return routes.filter(d => d.path == name)[0]
}

let preloaded = false;

findRoute('/').load()
findRoute('/login').load()
findRoute('/signup').load()
findRoute('/guides').load()
findRoute('/guides/:name').load()

// send route location changes to Intercom.
if (window.Intercom) {

  window.Intercom("boot", {
    app_id: "n2h7hsol"
  });

  subscribe((state, action) => {
    if (action.type === 'openPath' || action.type === 'redirectPath') {
      window.Intercom('update')
    }
  })
} else {
  console.log("window.Intercom is not defined")
}

// console.log('ROUTES', routes)

subscribe((state, action) => {

  if (!action) {
    return;
  }

  if (process.env.NODE_ENV === "development") {
    console.log(action.type, action.data, state)
  }

  if (action.type === 'loadContent') {
    window.scrollTo(0, 0)
  }

  if (!preloaded && action.type == 'setProfile') {
    // preload other screens.
    preloaded = true;
    findRoute('/account').load()
    findRoute('/buckets').load()
    findRoute('/buckets/:id/settings').load()
    findRoute('/buckets/:id/submissions').load()
  }
})

dispatch('loadContent', (props) => <Loader />);

// launch React App
boot({
  debug : false,
  rootEl: document.getElementById('root'),
  routes
})
