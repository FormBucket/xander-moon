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
  { id: undefined, email: undefined, name: undefined},
  (state, action) => {
    switch (action.type) {
      case INIT_USER:
      return {
        id: getMetaContentByName('user.id'),
        email: getMetaContentByName('user.email'),
        displayName: getMetaContentByName('user.displayName'),
      }
      default:
      return state
    }
  },
  {
    isUserLoggedIn: (state) => typeof state.id !== 'undefined',
    canCreateForm: (state) => true,
    getId: (state) => state.id,
    getEmail: (state) => state.email,
    getName: (state) => state.name,
    getUser: (state) => state,
  }
)

// FIXME: REMOVE DEV HACK
window.UserStore = UserStore

export default UserStore
