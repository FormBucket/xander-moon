import {createStore} from 'sweetflux'
import {loadProfile} from './actions'
import {Map} from 'immutable';

const Profiles = createStore(
  'Profiles',
  Map(),
  (state, action) => {
    switch (action.type) {
      case loadProfile:
        return action.data
      default:
        return state
    }
  },
  {
    getProfile: (state) => state,
  }
)
