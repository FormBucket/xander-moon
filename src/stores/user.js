import {createStore, dispatch} from 'sweetflux'

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
    getName: (state) => state.displayName,
    getAPIKey: (state) => state.apikey,
    getUser: (state) => state,
  }
)

// FIXME: REMOVE DEV HACK
window.UserStore = UserStore

export default UserStore
