import {createStore} from 'sweetflux'
import {LOAD_PROFILE} from './actions'
import {Map} from 'immutable';

const ProfileStore = createStore(
  'ProfileStore',
  Map(),
  (state, action) => {
    switch (action.type) {
      case LOAD_PROFILE:
        return action.data
      default:
        return state
    }
  },
  {
    getProfile: (state) => state,
  }
)

export default ProfileStore
