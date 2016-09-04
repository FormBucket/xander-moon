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
    getInitialState: () => {},
    setToken: (state, token) => {
      localStorage.setItem('token', token)
    },
    setProfile: (state, data) => data
  }, // store does not support updates
  {
    isUserLoggedIn: (state) => readExp() > moment().unix(),
    getPlan: (state) => '',
    getPlanName: (state) => "Foo"
  }
)

export default UserStore
