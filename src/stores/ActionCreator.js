import {dispatch} from 'sweetflux'

// FIXME: REMOVE DEV HACK
window.dispatch = dispatch

let submissionEventStream

import {
  getBuckets,
  requestCreateBucket,
  requestUpdateBucket,
  startSubmissionEventSource
} from '../utils/webutils'

import {
  SET_BUCKET,
  RECEIVE_SUBMISSIONS,
} from './actions'

export function loadBuckets() {
  getBuckets()
  .then((buckets) => {
    console.log(SET_BUCKET, buckets)
    buckets.forEach(bucket => dispatch(SET_BUCKET, bucket))
  })
}

export function createBucket(bucket, done) {
  requestCreateBucket(bucket)
  .then((result) => {
    bucket.id = result.id
    console.log(SET_BUCKET, bucket)
    dispatch(SET_BUCKET, bucket)
    done(null, bucket)
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

export function streamSubmissions(bucketId) {
  var url = bucketId ? "/submissions/${bucketId}/events" : "/submissions/events",
  submissionEventStream = new EventSource(url, { withCredentials: true });

  submissionEventStream.onmessage = function (event) {
    dispatch(RECEIVE_SUBMISSIONS, [JSON.parse(event.data)])
  };
}

export function stopSubmissionStream() {
  submissionEventStream.close()
}
