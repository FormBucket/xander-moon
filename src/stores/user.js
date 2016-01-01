import {createStore, dispatch} from 'sweetflux'

// the user profile information is loaded into <meta> tags in the <head>
function getMetaContentByName(name,content){
   var content = (content==null)?'content':content;
   var el = document.querySelector("meta[name='"+name+"']");
   if (el) {
     return el.getAttribute(content);
   }
}

const UserStore = createStore(
  'UserStore',
  {
    provider: getMetaContentByName('user.provider'),
    auth_id: getMetaContentByName('user.auth_id'),
    email: getMetaContentByName('user.email'),
    displayName: getMetaContentByName('user.displayName'),
  },
  (state, action) => state, // store does not support updates
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
