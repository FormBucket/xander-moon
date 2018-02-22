/*
FormBucket client API.
Copyright FormBucket.com
Date: 2015-12-14
*/

// The server is initialized from the API server.
export const server = process.env.FORMBUCKET_API_SERVER,
// The version is and will always be v1.
version = `/v1`,
// The API root is the result of concat(server, version).
apiRoot = process.env.FORMBUCKET_API_SERVER + version

// Import helpers that do basic stuff.
import {
  getText,
  postText,
  getJSON,
  postJSON,
  putJSON,
  deleteJSON
} from './fetch-helpers'

// Submit a form
export function submit(bucket_id, formData) {
  return postJSON( `${process.env.FORMBUCKET_API_SERVER}/f/${bucket_id}`, formData )
}

// Create a batch of submissions.
export function requestCreateSubmissions(bucket_id, submissions) {
  return postJSON( `${apiRoot}/buckets/${bucket_id}/submissions`, { submissions } )
}

// Request user signin and receive access code.
export function requestSignIn(user) {
  return postText( `${apiRoot}/signin`, user )
}

// Request user signup and receive access code.
export function requestSignUp(user) {
  return postText( `${apiRoot}/signup`, user )
}

// Exchange access code for JWT.
export function requestToken(code){
  return postText( `${apiRoot}/token`, { code } )
}

// Update user profile settings.
export function requestUpdateUser(user) {
  return putJSON( `${apiRoot}/profile`, user)
}

// Send server request to get user`s Forms.
export function requestBuckets(){
  return getJSON( `${apiRoot}/buckets`)
}

// Send server request to get a bucket settings.
export function requestBucket(id){
  return getJSON( `${apiRoot}/buckets/${id}`)
}

// Send server request to create new bucket.
export function requestCreateBucket(data){
  return postJSON( `${apiRoot}/buckets`, data)
}

// Send server request to update existing bucket.
export function requestUpdateBucket(bucket){
  return putJSON( `${apiRoot}/buckets/` + bucket.id, bucket )
}

// Send server request to update existing submission.
export function requestUpdateSubmission(bucket_id, submission_id, changes){
  return putJSON( `${apiRoot}/buckets/${bucket_id}/submissions/${submission_id}`, changes )
}

// Send server request to update batch of submissions.
export function requestUpdateSubmissions(bucket_id, ids, changes){
  return putJSON( `${apiRoot}/buckets/${bucket_id}/submissions`, { submissions: ids, changes } )
}

// Send server request to delete bucket and all related data.
export function requestDeleteBucket(bucketId){
  return deleteJSON( `${apiRoot}/buckets/` + bucketId)
}

// Send server request to delete bucket and all related data.
export function requestDeleteSubmission(bucket_id, submission_id){
  return deleteJSON( `${apiRoot}/buckets/${bucket_id}/submissions/${submission_id}`)
}

// Send server request to delete bucket and all related data.
export function requestDeleteSubmissions(bucket_id, ids){
  return deleteJSON( `${apiRoot}/buckets/${bucket_id}/submissions`, { submissions: ids})
}

// Send server request to get user profile.
export function requestProfile(){
  return getJSON( `${apiRoot}/profile`)
}

// Send server request to get user profile by id.
export function requestProfileById(user_id){
  return getJSON( `${apiRoot}/user/${user_id}/profile`)
}

// Send server request to get subscription plans.
export function requestSubscriptionPlans() {
  return getJSON( `${apiRoot}/subscription/plans` )
}

// Send server request to get user`s submissions.
export function requestSubmissionsByBucket(bucket_id, offset, limit, select, q, type='regular'){
  return getJSON( `${apiRoot}/buckets/${bucket_id}/submissions/${+offset}/${+limit}/${select}?type=${type}${q ? `&q=${q}` : '' }` )
}

// Send server request to get download key.
export function requestBucketExport(bucket_id, format=`json`){
  return getText( `${apiRoot}/export/${bucket_id}.${format}` )
}

// Force download of file using key.
export function requestDownloadFile(key) {
  window.location.href = `${apiRoot}/download/${key}`
}

// Get the stripe publishable key.
export function requestStripePubKey(){
  return getJSON(`${apiRoot}/stripe/pk`)
}

// Get the user charges.
export function requestCharges(account_id){
  return getJSON(`${apiRoot}/accounts/${account_id}/charges`)
}

// Get the the user's invoices.
export function requestInvoices(){
  return getJSON(`${apiRoot}/invoices`)
}

// Get the the user's invoices.
export function requestCreditCards(account_id){
  return getJSON(`${apiRoot}/accounts/${account_id}/credit_cards`)
}

// Send request to subscribe user to plan.
export function requestSubscribe(account_id, token, plan) {
  return postJSON(`${apiRoot}/accounts/${account_id}/subscribe`, { token: token, plan: plan })
}

// Send request to unsubscribe user to plan.
export function requestUnsubscribe(account_id) {
  return deleteJSON(`${apiRoot}/accounts/${account_id}/subscription`)
}

// Send request to destroy users account.
export function requestDestroyAccount(bucketId){
  return deleteJSON(`${apiRoot}/account`)
}

// Send request to reset user's password.
export function requestPasswordReset(email){
  return getJSON(`${apiRoot}/password_reset?email=` + encodeURIComponent(email))
}

// Send request to update user with new password.
export function requestPasswordResetUpdate(email, temp_password, password){
  return postJSON(`${apiRoot}/password_reset`, { email, temp_password, password })
}

// Send request to update user with new password.
export function requestBucketCountByUser() {
  return getJSON(`${apiRoot}/bucket_count_by_user` )
}

// Send request to get total submission count by bucket.
export function requestSubmissionCountByBucket() {
  return getJSON(`${apiRoot}/submission_count_by_bucket` )
}

// make promise to get total bucket count.
export function requestBucketCount() {
  return getText(`${apiRoot}/bucket_count` )
}

// make promise to get total user count.
export function requestUserCount() {
  return getText(`${apiRoot}/user_count` )
}

// make promise to get buckets by user id.
export function requestUsersBuckets(user_id) {
  return getJSON(`${apiRoot}/user/${user_id}/buckets` )
}

// make promise to get logs.
export function requestLogs(offset=0, limit=10, bucket_id){
  return getJSON( `${apiRoot}/log_entries?offset=${offset}&limit=${limit}${bucket_id ? `&bucket_id=${bucket_id}` : ''}`,)
}

// make promise to get log.
export function requestLog(log_id){
  return getJSON( `${apiRoot}/log_entries/${log_id}`)
}

// make promise to delete credit card.
export function requestDeleteCreditCard(id) {
  return deleteJSON(`${apiRoot}/billing/credit_card`, { id })
}

// make promise to add credit card.
export function requestAddCreditCard(id) {
  return postJSON(`${apiRoot}/billing/credit_card`, { id })
}

// make promise to update credit card.
export function requestUpdateCreditCard(id, changes) {
  return putJSON(`${apiRoot}/billing/credit_card`, { id, changes })
}
