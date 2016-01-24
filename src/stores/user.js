import {createStore, dispatch} from 'fluxury'
import SubscriptionStore from './subscription'

const UserStore = createStore(
  'UserStore',
  {},
  {
    setProfile: (state, action) => action.data,
    clearProfile: () => {}
  }, // store does not support updates
  {
    isUserLoggedIn: (state) => localStorage.hasOwnProperty('token'),
    isLoaded: (state) => typeof state.email !== 'undefined',
    canCreateForm: (state) => true,
    getProvider: (state) => state.provider,
    getEmail: (state) => state.email,
    getName: (state) => state.display_name,
    getAPIKey: (state) => state.apikey,
    getUser: (state) => state,
    getPlan: (state) => state.plan,
    getPlanName: (state) => SubscriptionStore.getPlanByName(state.plan) ? SubscriptionStore.getPlanByName(state.plan).name : undefined,
    getMaxBuckets: (state) => +state.max_buckets,
    getPaidUntil: (state) => state.paid_until
  }
)

// FIXME: REMOVE DEV HACK
window.UserStore = UserStore

export default UserStore
