import {createStore} from 'sweetflux'

const UserStore = createStore(
  'UserStore',
  undefined,
  (state, action) => {

  },
  {
    isUserLoggedIn: (state) => typeof state !== 'undefined',
    getUser: (state) => state
  }
)

export default UserStore
