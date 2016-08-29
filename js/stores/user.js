import {createStore, dispatch} from 'fluxury'
import SubscriptionStore from './subscription'
import moment from 'moment'
import {decodeJWT} from 'functionfoundry'

var token;

// read the expiration from the token
function readExp() {
  try {
    return decodeJWT(localStorage.token || '').exp
  } catch(e) {
    return -1
  }
}

if (readExp() < moment().unix()) {
    localStorage.removeItem('token')
}

const UserStore = createStore(
  {
    setToken: (state, token) => {
      localStorage.setItem('token', token)
    },
    setProfile: (state, data) => data
  }, // store does not support updates
  {
    isUserLoggedIn: (state) => readExp() > moment().unix(),
    getPlanName: (state) => SubscriptionStore.getPlanByName(state.plan) ? SubscriptionStore.getPlanByName(state.plan).name : undefined
  }
)

export default UserStore
