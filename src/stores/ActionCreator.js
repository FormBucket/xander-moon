import {dispatch} from 'sweetflux'

// FIXME: REMOVE DEV HACK
window.dispatch = dispatch

import {
  getBuckets,
  getBucket,
  requestCreateBucket,
  requestUpdateBucket,
  getSubmissions,
  getSubmissionsByBucket,
  startSubmissionEventSource,
  requestSignUp,
  requestSignIn
} from '../utils/webutils'

import {
  SET_BUCKET,
  GET_SUBMISSIONS,
  STREAM_SUBMISSION,
  SIGNUP,
  SIGNIN
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

export function loadBuckets() {

  var p = new Promise( (resolve, reject) => {

    getBuckets()
    .then((buckets) => {

      // publish to stores
      buckets.forEach(bucket => dispatch(SET_BUCKET, bucket))

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

      dispatch(SET_BUCKET, bucket)

      resolve( bucket )

    }, (err) => {
      reject(err)
    })
  })

  return p

}

export function createBucket(bucket, done) {
  requestCreateBucket(bucket)
  .then((result) => {
    bucket.id = result.id
    console.log(SET_BUCKET, bucket)
    dispatch(SET_BUCKET, bucket)
    if (done) {
      done(undefined, bucket )
    }
  }, (err) => {
    done(err)
  })
}


export function updateBucket(bucket, done) {
  requestUpdateBucket(bucket)
  .then((result) => {
    dispatch('updateBucket', result)
    done(null, result)
  }, (err) => {
    done(err)
  })
}

export function deleteBucket(bucketId, done) {
  requestDeleteBucket(bucketId)
  .then(result => {
    dispatch(BUCKET_DELETED, result)
    done(null, result)
  }, (err) => {
    done(err)
  })
}


export function loadSubmissions(offset, limit) {
  getSubmissions(offset, limit)
  .then((items) => {
    console.log(GET_SUBMISSIONS, items)
    dispatch(GET_SUBMISSIONS, items)
  })
}

export function loadSubmissionsByBucket(bucket_id, offset, limit) {
  console.log('loadSubmissionsByBucket')
  var p = new Promise( (resolve, reject) => {
    console.log('run load submissions', bucket_id, offset, limit)
    getSubmissionsByBucket(bucket_id, offset, limit)
    .then((items) => {

      console.log(GET_SUBMISSIONS, items)
      dispatch(GET_SUBMISSIONS, items)

      resolve( items )

    })
    .catch(error => reject(error))

  })

  return p
}

export function streamSubmissions(bucketId) {
  if (typeof submissionEventStream !== 'undefined') { return }

  var url = "http:localhost:3001/changes",
      submissionEventStream = new EventSource(url, { withCredentials: true })

  submissionEventStream.onmessage = function (event) {
    dispatch(STREAM_SUBMISSION, JSON.parse(event.data))
  };

  return submissionEventStream
}
