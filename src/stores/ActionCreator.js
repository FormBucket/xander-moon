import {dispatch} from 'fluxury'
import {SORT} from 'functionfoundry'

// FIXME: REMOVE DEV HACK
window.dispatch = dispatch
window.loadProfile = loadProfile

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
  requestProfile,
  requestSubscribe,
  unsubscribe
} from './webutils'

export function signUp(name, org, email, password) {
  var p = new Promise( (resolve, reject) => {
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

            dispatch('signUp', {
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
    requestSignIn({
        email: email,
        password: password
    })
    .then(response => {

      if (response.status === 200 || response.status === 0) {

        response.text().then(
          result => {

            localStorage.setItem('token', result) // save token to localStorage

            dispatch('signIn', {
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

    requestProfile()
    .then(profile => {

      // publish to stores
      dispatch('setProfile', profile)

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

    requestBuckets()
    .then((buckets) => {

      // publish to stores
      dispatch('setBuckets', buckets)

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
        var sortedPlans = SORT( plans.map(n => Object.assign({}, n, n.metadata)), 'amount', true)
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
  var p = new Promise( (resolve, reject) => {

    requestSubscribe(token, plan)
    .then(profile => {
      dispatch('setProfile', profile)
      resolve(profile)
    })
    .catch(error => reject(error))

  })

  return p
}

export function deleteAccount() {
  // console.log('deleteAccount')
  var p = new Promise( (resolve, reject) => {
    // console.log('unsubscribe')
    unsubscribe()
    .then(profile => {
      dispatch('deleteAccount', profile)
      resolve(profile)
    })
    .catch(error => reject(error))

  })

  return p
}
