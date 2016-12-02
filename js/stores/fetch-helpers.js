// generic function to detect common HTTP error codes. Credit to Mozilla.
export function processStatus(response) {
  // status "0" to handle local files fetching (e.g. Cordova/Phonegap etc.)
  if (response.status === 200 || response.status === 0) {
    return Promise.resolve(response);
  } else {
    return response.text()
    .then(text => Promise.reject(new Error(text)));
  }
}

export function callResource(method, url, data) {
  var opts = {
    method: method,
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }

  if (localStorage.hasOwnProperty('token')) {
    opts.headers.Authorization = `Bearer ${localStorage.token}`
  }

  if (data) {
    opts.body = JSON.stringify(data)
  }

  // console.log('call', url, opts)

  return fetch( url, opts)
}

function getResource(url) {
  return callResource('GET', url)
}

function postResource(url, data) {
  return callResource('POST', url, data)
}

function putResource(url, data) {
  return callResource('PUT', url, data)
}

function deleteResource(url, data) {
  return callResource('DELETE', url, data)
}

function getText(url) {
  return getResource(url)
  .then(processStatus)
  .then(res => res.text())
}

function postText(url, data) {
  return postResource(url, data)
  .then(processStatus)
  .then(res => res.text())
}

function putText(url, data) {
  return putResource(url, data)
  .then(processStatus)
  .then(res => res.text())
}

function deleteText(url, data) {
  return deleteResource(url, data)
  .then(processStatus)
  .then(res => res.text())
}

function getJSON(url) {
  return getResource(url)
  .then(processStatus)
  .then(res => res.json())
}

function postJSON(url, data) {
  return postResource(url, data)
  .then(processStatus)
  .then(res => res.json())
}

function putJSON(url, data) {
  return putResource(url, data)
  .then(processStatus)
  .then(res => res.json())
}

function deleteJSON(url, data) {
  return deleteResource(url, data)
  .then(processStatus)
  .then(res => res.json())
}

export {
  getResource,
  postResource,
  putResource,
  deleteResource,
  getText,
  postText,
  putText,
  deleteText,
  getJSON,
  postJSON,
  putJSON,
  deleteJSON
}
