/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { createStore, dispatch } from "xander";
import { DECODEJWT as decodeJWT } from "formula";

// format unix time
let unix = (d = new Date()) => (d.getTime() / 1000).toFixed(0);

var token;

// read the expiration from the token
function readExp() {
  try {
    return decodeJWT(localStorage.token || "").exp;
  } catch (e) {
    return -1;
  }
}

if (readExp() < unix()) {
  localStorage.removeItem("token");
}

const UserStore = createStore(
  "user",
  {
    getInitialState: () => {},
    setToken: (state, token) => {
      localStorage.setItem("token", token);
    },
    setProfile: (state, data) => Object.assign({}, state, data)
  }, // store does not support updates
  {
    isUserLoggedIn: state => state && state.id && !state.anonymous,
    getState: state => state,
    getStatus: state => (state ? state.status : "loading")
  }
);

window.UserStore = UserStore;
export default UserStore;
