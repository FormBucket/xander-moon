import UserStore from './stores/user'

// We could have used the React control
// but we are going with plain old DOM
// APIs to keep it lightweight and the
// file size small.

if (UserStore.isUserLoggedIn()) {
  document.getElementById('nav-logged-out').style.display = 'none'
  document.getElementById('nav-logged-in').style.display = ''
}

var items = document.getElementsByClassName("navigation-menu-button");

for (var item in items) {
  if (item === "length"){ continue; }

  items[item].onclick = function(e) {
    if (e.target.nextSibling.nextSibling.classList.length === 1) {
      e.target.nextSibling.nextSibling.classList.add('show')
    } else {
      e.target.nextSibling.nextSibling.classList.remove('show')
    }
  }
}
