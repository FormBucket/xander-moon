import UserStore from './stores/user'

if (UserStore.isUserLoggedIn()) {
  document.getElementById('nav-logged-out').style.display = 'none'
  document.getElementById('nav-logged-in').style.display = ''
}
