import {createStore, dispatch} from 'sweetflux'
import {INIT_USER} from './actions'

function getMetaContentByName(name,content){
   var content = (content==null)?'content':content;
   var el = document.querySelector("meta[name='"+name+"']");
   if (el) {
     return el.getAttribute(content);
   }
}

const UserStore = createStore(
  'UserStore',
  { auth_id: undefined, email: undefined, name: undefined},
  (state, action) => {
    switch (action.type) {
      case INIT_USER:
      return {
        provider: getMetaContentByName('user.provider'),
        auth_id: getMetaContentByName('user.auth_id'),
        email: getMetaContentByName('user.email'),
        displayName: getMetaContentByName('user.displayName'),
      }
      default:
      return state
    }
  },
  {
    isUserLoggedIn: (state) => typeof state.auth_id !== 'undefined',
    canCreateForm: (state) => true,
    getProvider: (state) => state.provider,
    getId: (state) => state.auth_id,
    getEmail: (state) => state.email,
    getName: (state) => state.displayName,
    getUser: (state) => state,
  }
)

// FIXME: REMOVE DEV HACK
window.UserStore = UserStore

export default UserStore
