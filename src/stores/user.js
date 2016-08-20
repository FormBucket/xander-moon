import {createStore, dispatch} from 'fluxury'
import SubscriptionStore from './subscription'
import decode from './decodeJWT'
import moment from 'moment'

if ( decode().exp < moment().unix() ) {
  localStorage.removeItem('token')
}

const UserStore = createStore(
  'UserStore',
  {},
  {
    setProfile: (state, data) => data,
    cancelSubscription: (state, data) => data,
    clearProfile: () => { return {} }
  }, // store does not support updates
  {
    isUserLoggedIn: (state) => decode().exp > moment().unix(),
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

export default UserStore
