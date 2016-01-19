import {createStore, dispatch} from 'fluxury'

const UserStore = createStore(
  'UserStore',
  null,
  {
    SET_PROFILE: (state, action) => action.data
  }, // store does not support updates
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
    getPlanId: (state) => state ? (state.plan ? state.plan.id : null) : null,
    getMaxBuckets: (state) => +state.plan.metadata.max_buckets,
    getPaidUntil: (state) => state.paid_until
  }
)

// FIXME: REMOVE DEV HACK
window.UserStore = UserStore

export default UserStore
