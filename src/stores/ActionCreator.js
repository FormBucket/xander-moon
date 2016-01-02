import {dispatch} from 'sweetflux'

// FIXME: REMOVE DEV HACK
window.dispatch = dispatch

import {
  getBuckets,
  requestCreateBucket,
  requestUpdateBucket,
  getSubmissions,
  getSubmissionsByBucket,
  startSubmissionEventSource
} from '../utils/webutils'

import {
  SET_BUCKET,
  GET_SUBMISSIONS,
  STREAM_SUBMISSION,
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


export function loadSubmissions(offset, limit) {
  getSubmissions(offset, limit)
  .then((items) => {
    console.log(GET_SUBMISSIONS, items)
    dispatch(GET_SUBMISSIONS, items)
  })
}

export function loadSubmissionsByBucket(bucket_id, offset, limit) {
  getSubmissionsByBucket(bucket_id, offset, limit)
  .then((items) => {
    console.log(GET_SUBMISSIONS, 'by bucket', items)
    dispatch(GET_SUBMISSIONS, items)
  })
}

export function streamSubmissions(bucketId) {
  if (typeof submissionEventStream !== 'undefined') { return }

  var url = bucketId ? "/submissions/${bucketId}/events" : "/submissions/events",
      submissionEventStream = new EventSource(url, { withCredentials: true })

  submissionEventStream.onmessage = function (event) {
    dispatch(STREAM_SUBMISSION, JSON.parse(event.data))
  };

  return submissionEventStream
}
