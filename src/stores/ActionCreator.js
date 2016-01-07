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

export function loadBuckets(done) {
  getBuckets()
  .then((buckets) => {
    console.log('SET_BUCKETS')
    buckets.forEach(bucket => {
      console.log(SET_BUCKET, bucket)
      dispatch(SET_BUCKET, bucket)
    })

    if (done) {
      done(undefined, buckets )
    }
  }, (err) => {
    done(err)
  })
}

export function loadBucket(id, done) {
  getBucket(id)
  .then((bucket) => {
    console.log(SET_BUCKET, bucket)
    dispatch(SET_BUCKET, bucket)
    if (done) {
      done(undefined, bucket )
    }
  }, (err) => {
    done(err)
  })
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

export function loadSubmissionsByBucket(bucket_id, offset, limit, done) {
  getSubmissionsByBucket(bucket_id, offset, limit)
  .then((items) => {
    console.log(GET_SUBMISSIONS, 'by bucket', items)
    dispatch(GET_SUBMISSIONS, items)

    if (done) {
      done(undefined, items)
    }
  })
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
