import {createStore, dispatch} from 'sweetflux'

function getMetaContentByName(name,content){
   var content = (content==null)?'content':content;
   return document.querySelector("meta[name='"+name+"']").getAttribute(content);
}

const UserStore = createStore(
  'UserStore',
  { id: '', email: '', name: ''},
  (state, action) => {
    switch (action.type) {
      case initUser:
      return {
        id: getMetaContentByName('user.id'),
        email: getMetaContentByName('user.email'),
        name: getMetaContentByName('user.name'),
      }
      default:
      return state
    }
  },
  {
    isUserLoggedIn: (state) => state.id !== '',
    getId: (state) => state.id,
    getEmail: (state) => state.email,
    getName: (state) => state.name,
    getUser: (state) => state,
  }
)

window.UserStore = UserStore

export default UserStore
