/* A collection of functions to send requests to the server.
Author: Peter Moresi
Date: 2015-12-14

All of these functions return a promise to get a payload.
*/
import UserStore from '../stores/user'
import {COND} from 'functionfoundry'

let server =  COND(
  process.env.NODE_ENV === 'production',
  '', // use same origin
  'https://formbucket-koajs.elasticbeanstalk.com' // "http://localhost:3001"
)
// let server = "https://formbucket-development.elasticbeanstalk.com"

// FIXME: remove
window.submit = submit
window.getBuckets = getBuckets

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

function getResource(resource) {

  if (!localStorage.hasOwnProperty('token')) {
    throw Error('User has no access token')
  }

  return fetch( server + resource, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.token}`
    }
  })
}

function callResource(method, resource, data) {

  console.log('callResource', 'foo')

  return fetch( server + resource, {
    method: method,
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.token}`
    },
    body: JSON.stringify(data)
  })
}

function postResource(resource, data) {
  console.log('postResource', resource, data)
  return callResource('POST', resource, data)
}

function putResource(resource, data) {
  console.log('putResource', resource, data)
  return callResource('PUT', resource, data)
}

function deleteResource(resource, data) {
  console.log('deleteResource', resource, data)
  return callResource('DELETE', resource, data)
}

export function requestSignIn(user) {

  return fetch( server + '/signin', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })

}

export function requestSignUp(user) {

  return fetch( server + '/signup', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Accept': 'application/json',
      'content-type': 'application/json'
    },
    body: JSON.stringify(user)
  })

}

/* Send server request to get user's Forms

Usage:
createBucket({
name: 'test2', enabled: true, email_to: 'test@test8.com', webhooks: [], required_fields: []
})
*/
export function getBuckets(){
  return getResource('/buckets')
  .then(processStatus)
  .then(getJSON)
}

/* Send server request to get a specific Buckets

Usage:
createBucket({
name: 'test2', enabled: true, email_to: 'test@test8.com', webhooks: [], required_fields: []
})
*/
export function getBucket(id){
  return getResource(`/buckets/${id}`)
  .then(processStatus)
  .then(getJSON)
}

/* Send server request to create new bucket

Usage:
createBucket({
name: 'test2', enabled: true, email_to: 'test@test8.com', webhooks: [], required_fields: []
})
*/
export function requestCreateBucket(data){
  return postResource('/buckets', data)
  .then(processStatus)
  .then(getJSON)
}

/* Send server request to update existing bucket

Usage:
updateBucket({
name: 'test2', enabled: true, email_to: 'test@test8.com', webhooks: [], required_fields: []
})
*/
export function requestUpdateBucket(bucket){
  return putResource( '/buckets/' + bucket.id, bucket )
  .then(processStatus)
  .then(getJSON)
}

export function requestDeleteBucket(bucketId){
  return deleteResource('/buckets/' + bucketId)
  .then(processStatus)
  .then(getJSON)
}


export function submit(formId, formData) {
  return postResource(`/f/${formId}`, formData )
  .then(processStatus)
  .then(getJSON)
}

/* Send server request to get user's submissions

Usage:
getSubmissions(10, 50)
*/
export function getSubmissions(offset, limit){
  return getResource(`/submissions?offset=${+offset}&limit=${+limit}`)
  .then(processStatus)
  .then(getJSON)
}

export function getSubmissionsByBucket(bucket_id, offset, limit){
  return getResource(`/buckets/${bucket_id}/submissions?offset=${+offset}&limit=${+limit}`)
  .then(processStatus)
  .then(getJSON)
}
