import {createStore, dispatch} from 'fluxury'

const UserStore = createStore(
  'UserStore',
  {},
  (state, action) => state, // store does not support updates
  {
    isUserLoggedIn: (state) => localStorage.hasOwnProperty('token'),
    canCreateForm: (state) => true,
    getProvider: (state) => state.provider,
    getId: (state) => state.auth_id,
    getEmail: (state) => state.email,
    getName: (state) => state.display_name,
    getAPIKey: (state) => state.apikey,
    getUser: (state) => state,
    getPlan: (state) => state.plan,
    getPaidUntil: (state) => state.paid_until
  }
)

// FIXME: REMOVE DEV HACK
window.UserStore = UserStore

export default UserStore
