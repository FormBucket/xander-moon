import {dispatch} from 'fluxury'
import {SORT} from 'functionfoundry'

// FIXME: REMOVE DEV HACK
window.dispatch = dispatch
window.loadProfile = loadProfile

import {
  getBuckets,
  getBucket,
  requestCreateBucket,
  requestUpdateBucket,
  getSubscriptionPlans,
  getSubmissions,
  getSubmissionsByBucket,
  startSubmissionEventSource,
  requestSignUp,
  requestSignIn,
  getProfile
} from './webutils'

import {
  SET_BUCKETS,
  GET_SUBSCRIPTION_PLANS,
  GET_SUBMISSIONS,
  STREAM_SUBMISSION,
  SIGNUP,
  SIGNIN,
  SET_PROFILE
} from './actions'

export function signUp(name, org, email, password) {
  var p = new Promise( (resolve, reject) => {
    console.log('foo')
    requestSignUp({
        name: name,
        org: org,
        email: email,
        password: password
    })
    .then(response => {

      if (response.status === 200 || response.status === 0) {

        response.text().then(
          result => {

            localStorage.setItem('token', result) // save token to localStorage

            dispatch(SIGNUP, {
              name: name,
              org: org,
              email: email,
              token: result
            })

            resolve(result)
          }
        )
      } else {
        response.json().then(
          result => reject(result)
        )
      }

    }, (error) => reject(error))

  })

  return p;

}

export function signIn(email, password) {
  var p = new Promise( (resolve, reject) => {
    console.log('foo')
    requestSignIn({
        email: email,
        password: password
    })
    .then(response => {

      if (response.status === 200 || response.status === 0) {

        response.text().then(
          result => {

            console.log(result, typeof result )

            localStorage.setItem('token', result) // save token to localStorage

            dispatch(SIGNIN, {
              token: result
            })

            resolve(result)
          }
        )
      } else {

        response.json().then(
          result => reject(result)
        )
      }

    }, (error) => reject(error))

  })

  return p;
}

export function loadProfile() {

  var p = new Promise( (resolve, reject) => {

    getProfile()
    .then(profile => {

      // publish to stores
      dispatch(SET_PROFILE, profile)

      // resolve to caller
      resolve( profile )

    }, (err) => {
      reject(err)
    })

  })

  return p

}

export function loadBuckets() {

  var p = new Promise( (resolve, reject) => {

    getBuckets()
    .then((buckets) => {

      // publish to stores
      dispatch(SET_BUCKETS, buckets)

      // resolve to caller
      resolve( buckets )

    }, (err) => {
      reject(err)
    })

  })

  return p

}

export function loadBucket(id) {

  var p = new Promise( (resolve, reject) => {

    getBucket(id)
    .then((bucket) => {

      dispatch(SET_BUCKETS, [bucket])

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

      dispatch(SET_BUCKETS, bucket)
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
      dispatch(BUCKET_DELETED, result)
      resolve(result)
    }, (err) => reject(err))

  })

  return p
}

export function loadSubscriptionPlans() {
  console.log('loadSubscriptionPlans');
  var p = new Promise( (resolve, reject) => {
    console.log('test2')
    getSubscriptionPlans()
      .then(plans => {
        var sortedPlans = SORT( plans.map(n => Object.assign({}, n, n.metadata)), 'amount', true)
        console.log('test3')
        dispatch(GET_SUBSCRIPTION_PLANS, sortedPlans)
        resolve(sortedPlans)
      })
      .catch( error => reject(error) )
  });

  return p;
}

export function loadSubmissionsByBucket(bucket_id, offset, limit, select) {
  console.log('loadSubmissionsByBucket')
  var p = new Promise( (resolve, reject) => {
    console.log('run load submissions', bucket_id, offset, limit)
    getSubmissionsByBucket(bucket_id, offset, limit, select)
    .then((items) => {

      console.log(GET_SUBMISSIONS, items)
      dispatch(GET_SUBMISSIONS, items)

      resolve( items )

    })
    .catch(error => reject(error))

  })

  return p
}
