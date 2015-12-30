/* A collection of functions to send requests to the server.
Author: Peter Moresi
Date: 2015-12-14

All of these functions return a promise.
*/

// generic function to detect common HTTP error codes. Credit to Mozilla.
function processStatus(response) {
  // status "0" to handle local files fetching (e.g. Cordova/Phonegap etc.)
  if (response.status === 200 || response.status === 0) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function getText(response) {
  return response.text();
}

function getJSON(response) {
  return response.json();
}
/* Send server request to get user's Forms

  Usage:
  createForm({
    name: 'test2', enabled: true, email_to: 'test@test8.com', webhooks: [], required_fields: []
  })
*/
export function getForms(){
  return fetch('/forms.json', {
    credentials: 'include',
    method: 'get'
  })
  .then(processStatus)
  .then(getJSON)
}

/* Send server request to get a specific Forms

  Usage:
  createForm({
    name: 'test2', enabled: true, email_to: 'test@test8.com', webhooks: [], required_fields: []
  })
*/
export function getForm(id){
  return fetch(`/form/${id}.json`, {
    credentials: 'include',
    method: 'get'
  }).then(processStatus)
}

/* Send server request to create new form

  Usage:
  createForm({
    name: 'test2', enabled: true, email_to: 'test@test8.com', webhooks: [], required_fields: []
  })
*/
export function requestCreateForm(data){
  return fetch('/forms', {
    credentials: 'include',
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(processStatus)
}

/* Send server request to update existing form

  Usage:
  updateForm({
    name: 'test2', enabled: true, email_to: 'test@test8.com', webhooks: [], required_fields: []
  })
*/
export function requireUpdateForm(data){
  return fetch('/forms/5oFr9Lr', {
    method: 'put', credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(processStatus)
}
