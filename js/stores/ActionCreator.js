import {dispatch} from 'fluxury'
import {sort} from 'functionfoundry'

import {
  requestBuckets,
  requestBucket,
  requestCreateBucket,
  requestUpdateBucket,
  requestSubscriptionPlans,
  requestSubmissions,
  requestSubmissionsByBucket,
  requestSignUp,
  requestSignIn,
  requestToken,
  requestUpdateUser,
  requestProfile,
  requestSubscribe,
  requestUnsubscribe
} from './webutils'

export function signUp(name, org, email, password, accepted, optedIn) {

  return requestSignUp({
      name: name,
      org: org,
      email: email,
      password: password,
      accepted: accepted,
      optedIn: optedIn
  })
  .then(accessCode => requestToken(accessCode))
  .then(token => {
    dispatch('setToken', token)
    return Promise.resolve()
  })
  .catch((error) => Promise.reject(error))

}

export function updateUser(updates) {
  return requestUpdateUser(updates)
}

export function signIn(email, password) {

  return requestSignIn({
      email: email,
      password: password
  })
  .then(accessCode => requestToken(accessCode))
  .then(token => {
    dispatch('setToken', token)
    return Promise.resolve()
  })
  .catch((error) => Promise.reject(error))

}

export function loadProfile() {

  return requestProfile()
  .then(profile => {

    // publish to stores
    dispatch('setProfile', profile)

    // resolve to caller
    return Promise.resolve( profile )

  })
  .catch((err) => {
    return Promise.reject(err)
  })

}

export function loadBuckets() {

  return requestBuckets()
      .then((buckets) => {

        // publish to stores
        dispatch('setBuckets', buckets)

        // resolve to caller
        resolve( buckets )

      }, (err) => {
        reject(err)
      })

}

export function loadBucket(id) {

  var p = new Promise( (resolve, reject) => {

    requestBucket(id)
    .then((bucket) => {

      dispatch('setBucket', bucket)

      resolve( bucket )

    }, (err) => {
      reject(err)
    })
  })

  return p

}

export function createBucket(bucket={}) {

  var p = new Promise((resolve, reject) => {
    requestCreateBucket(bucket)
    .then((result) => {
      bucket.id = result.id

      dispatch('setBucket', bucket)
      resolve( bucket )

    }, (err) => reject(err) )
  })

  return p
}


export function updateBucket(bucket) {

  var p = new Promise((resolve, reject) => {

    requestUpdateBucket(bucket)
    .then((result) => {
      dispatch('updateBucket', result)
      resolve(result)
    }, (err) => {
      reject(err)
    })

  })

  return p

}

export function deleteBucket(bucketId, done) {
  var p = new Promise((resolve, reject) => {

    requestDeleteBucket(bucketId)
    .then(result => {
      dispatch('deleteBucket', result)
      resolve(result)
    }, (err) => reject(err))

  })

  return p
}

export function loadSubscriptionPlans() {
  // console.log('loadSubscriptionPlans');
  var p = new Promise( (resolve, reject) => {

    requestSubscriptionPlans()
      .then(plans => {
        var sortedPlans = sort( plans.map(n => Object.assign({}, n, n.metadata)), 'amount', true)
        dispatch('getSubscriptionPlans', sortedPlans)
        resolve(sortedPlans)
      })
      .catch( error => reject(error) )
  });

  return p;
}

export function loadSubmissionsByBucket(bucket_id, offset, limit, select) {
  // console.log('loadSubmissionsByBucket')
  var p = new Promise( (resolve, reject) => {
    // console.log('run load submissions', bucket_id, offset, limit)
    requestSubmissionsByBucket(bucket_id, offset, limit, select)
    .then((items) => {

      dispatch('getSubmissions', items)

      resolve( items )

    })
    .catch(error => reject(error))

  })

  return p
}

export function subscribe(token, plan) {
  // console.log('subscribe', token, plan)
  return requestSubscribe(token, plan)
  .then(profile => {
    dispatch('setProfile', profile)
    return Promise.resolve(profile)
  })
  .catch(error => Promise.reject(error))
}

export function cancelSubscription() {
  // console.log('cancelSubscription')
  return requestUnsubscribe()
  .then(profile => {
    dispatch('cancelSubscription', profile)
    return Promise.resolve(profile)
  })
  .catch(error => Promise.reject(error))
}
