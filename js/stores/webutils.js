/* A collection of functions to send requests to the server.
Author: Peter Moresi
Date: 2015-12-14

All of these functions return a promise to get a payload.
*/
export const server = process.env.FORMBUCKET_API_SERVER,
version = `/v1`,
apiRoot = process.env.FORMBUCKET_API_SERVER + version

console.log('apiRoot', apiRoot)

import {
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
} from './fetch-helpers'

/* Submit a form */
export function submit(formId, formData) {
  return postJSON( `${apiRoot}/f/${formId}`, formData )
}

/* Request user signin and receive access code */
export function requestSignIn(user) {
  return postText( `${apiRoot}/signin`, user )
}

/* Request user signup and receive access code */
export function requestSignUp(user) {
  return postText( `${apiRoot}/signup`, user )
}

/* Exchange access code for JWT */
export function requestToken(code){
  return postText( `${apiRoot}/token`, { code } )
}

/* Update user profile settings */
export function requestUpdateUser(user) {
  return postJSON( `${apiRoot}/profile.json`, user)
}

/* Send server request to get user`s Forms */
export function requestBuckets(){
  return getJSON( `${apiRoot}/buckets.json`)
}

/* Send server request to get a bucket settings */
export function requestBucket(id){
  return getJSON( `${apiRoot}/buckets/${id}.json`)
}

/* Send server request to create new bucket */
export function requestCreateBucket(data){
  return postJSON( `${apiRoot}/buckets.json`, data)
}

/* Send server request to update existing bucket */
export function requestUpdateBucket(bucket){
  return putJSON( `${apiRoot}/buckets/` + bucket.id, bucket )
}

/* Send server request to delete bucket and all related data */
export function requestDeleteBucket(bucketId){
  return deleteJSON( `${apiRoot}/buckets/` + bucketId)
}

/* Send server request to get user profile */
export function requestProfile(){
  return getJSON( `${apiRoot}/profile.json`)
}

/* Send server request to get subscription plans */
export function requestSubscriptionPlans() {
  return getJSON( `${apiRoot}/subscription/plans` )
}

/* Send server request to get user`s submissions */
export function requestSubmissionsByBucket(bucket_id, offset, limit, select, q){
  return getJSON( `${apiRoot}/buckets/${bucket_id}/submissions/${+offset}/${+limit}/${select}.json?${q ? `q=${q}` : null }` )
}

/* Send server request to get download key */
export function requestBucketExport(bucket_id, format=`json`){
  return getText( `${apiRoot}/export/${bucket_id}.${format}` )
}

/* Force download of file using key */
export function requestDownloadFile(key) {
  window.location.href = `${apiRoot}/download/${key}`
}

/* Get the stripe publishable key */
export function requestStripePubKey(){
  return getText(`${apiRoot}/stripe/pk`)
}

/* Get the user charges */
export function requestCharges(){
  return getJSON(`${apiRoot}/subscription/charges`)
}

/* Get the the user's invoices */
export function requestInvoices(){
  return getJSON(`${apiRoot}/subscription/invoices`)
}

/* Send request to subscribe user to plan */
export function requestSubscribe(token, plan) {
  return postJSON(`${apiRoot}/subscribe`, { token: token, plan: plan })
}

/* Send request to unsubscribe user to plan */
export function requestUnsubscribe() {
  return deleteJSON(`${apiRoot}/subscription`)
}

/* Send request to destroy users account */
export function requestDestroyAccount(bucketId){
  return deleteJSON(`${apiRoot}/account`)
}

/* Send request to reset user's password */
export function requestPasswordReset(email){
  return getJSON(`${apiRoot}/password_reset?email=` + email)
}

/* Send request to update user with new password */
export function requestPasswordResetUpdate(email, temp_password, password){
  return getJSON(`${apiRoot}/password_reset`, { email, temp_password, password})
}

export function requestBucketCountByUser() {
  return getJSON(`${apiRoot}/bucket_count_by_user.json` )
}

export function requestSubmissionCountByBucket() {
  return getJSON(`${apiRoot}/submission_count_by_bucket.json` )
}

export function requestBucketCount() {
  return getText(`${apiRoot}/bucket_count.json` )
}

export function requestUserCount() {
  return getText(`${apiRoot}/user_count.json` )
}
