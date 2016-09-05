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

// Submit a form
export function submit(bucket_id, formData) {
  return postJSON( `${apiRoot}/f/${bucket_id}`, formData )
}

export function requestCreateSubmissions(bucket_id, submissions) {
  return postJSON( `${apiRoot}/buckets/${bucket_id}/submissions`, { submissions } )
}

// Request user signin and receive access code
export function requestSignIn(user) {
  return postText( `${apiRoot}/signin`, user )
}

// Request user signup and receive access code
export function requestSignUp(user) {
  return postText( `${apiRoot}/signup`, user )
}

// Exchange access code for JWT
export function requestToken(code){
  return postText( `${apiRoot}/token`, { code } )
}

// Update user profile settings
export function requestUpdateUser(user) {
  return postJSON( `${apiRoot}/profile.json`, user)
}

// Send server request to get user`s Forms
export function requestBuckets(){
  return getJSON( `${apiRoot}/buckets.json`)
}

// Send server request to get a bucket settings
export function requestBucket(id){
  return getJSON( `${apiRoot}/buckets/${id}.json`)
}

// Send server request to create new bucket
export function requestCreateBucket(data){
  return postJSON( `${apiRoot}/buckets.json`, data)
}

// Send server request to update existing bucket
export function requestUpdateBucket(bucket){
  return putJSON( `${apiRoot}/buckets/` + bucket.id, bucket )
}

// Send server request to update existing submission
export function requestUpdateSubmission(bucket_id, submission_id, changes){
  return putJSON( `${apiRoot}/buckets/${bucket_id}/submissions/${submission_id}`, changes )
}

// Send server request to update batch of submissions
export function requestUpdateSubmissions(bucket_id, ids, changes){
  return putJSON( `${apiRoot}/buckets/${bucket_id}/submissions`, { submissions: ids, changes } )
}

// Send server request to delete bucket and all related data
export function requestDeleteBucket(bucketId){
  return deleteJSON( `${apiRoot}/buckets/` + bucketId)
}

// Send server request to delete bucket and all related data
export function requestDeleteSubmission(bucket_id, submission_id){
  return deleteJSON( `${apiRoot}/buckets/${bucket_id}/submissions/${submission_id}`)
}

// Send server request to delete bucket and all related data
export function requestDeleteSubmissions(bucket_id, ids){
  return deleteJSON( `${apiRoot}/buckets/${bucket_id}/submissions`, { submissions: ids})
}

// Send server request to get user profile
export function requestProfile(){
  return getJSON( `${apiRoot}/profile.json`)
}

export function requestProfileById(user_id){
  return getJSON( `${apiRoot}/user/${user_id}/profile.json`)
}

// Send server request to get subscription plans
export function requestSubscriptionPlans() {
  return getJSON( `${apiRoot}/subscription/plans` )
}

// Send server request to get user`s submissions
export function requestSubmissionsByBucket(bucket_id, offset, limit, select, q){
  return getJSON( `${apiRoot}/buckets/${bucket_id}/submissions/${+offset}/${+limit}/${select}.json${q ? `?q=${q}` : '' }` )
}

// Send server request to get download key
export function requestBucketExport(bucket_id, format=`json`){
  return getText( `${apiRoot}/export/${bucket_id}.${format}` )
}

// Force download of file using key
export function requestDownloadFile(key) {
  window.location.href = `${apiRoot}/download/${key}`
}

// Get the stripe publishable key
export function requestStripePubKey(){
  return getText(`${apiRoot}/stripe/pk`)
}

// Get the user charges
export function requestCharges(){
  return getJSON(`${apiRoot}/billing/charges.json`)
}

// Get the the user's invoices
export function requestInvoices(){
  return getJSON(`${apiRoot}/billing/invoices.json`)
}

// Get the the user's invoices
export function requestCreditCards(){
  return getJSON(`${apiRoot}/billing/credit_cards.json`)
}

// Send request to subscribe user to plan
export function requestSubscribe(token, plan) {
  return postJSON(`${apiRoot}/subscribe`, { token: token, plan: plan })
}

// Send request to unsubscribe user to plan
export function requestUnsubscribe() {
  return deleteJSON(`${apiRoot}/subscription`)
}

// Send request to destroy users account
export function requestDestroyAccount(bucketId){
  return deleteJSON(`${apiRoot}/account`)
}

// Send request to reset user's password
export function requestPasswordReset(email){
  return getJSON(`${apiRoot}/password_reset?email=` + email)
}

// Send request to update user with new password
export function requestPasswordResetUpdate(email, temp_password, password){
  return getJSON(`${apiRoot}/password_reset`, { email, temp_password, password})
}

// Send request to update user with new password
export function requestBucketCountByUser() {
  return getJSON(`${apiRoot}/bucket_count_by_user.json` )
}

export function requestSubmissionCountByBucket() {
  return getJSON(`${apiRoot}/submission_count_by_bucket.json` )
}

export function requestBucketCount() {
  return getText(`${apiRoot}/bucket_count.json` )
}

export function requestBucketCount() {
  return getText(`${apiRoot}/bucket_count.json` )
}

export function requestUserCount() {
  return getText(`${apiRoot}/user_count.json` )
}

export function requestUsersBuckets(user_id) {
  return getJSON(`${apiRoot}/user/${user_id}/buckets.json` )
}

export function requestLogs(){
  return getJSON( `${apiRoot}/log_entries.json`)
}

export function requestLog(log_id){
  return getJSON( `${apiRoot}/log_entries/${log_id}.json`)
}
