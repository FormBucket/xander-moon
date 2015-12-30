import {dispatch} from 'sweetflux'

// FIXME: REMOVE DEV HACK
window.dispatch = dispatch

import {
  getBuckets,
  requestCreateBucket,
  requestUpdateBucket
} from '../utils/webutils'

import {
  INIT_USER,
  LOAD_BUCKETS,
  RECEIVE_BUCKETS,
  LOAD_SUBMISSIONS,
  LOAD_PROFILE,
  CREATE_BUCKET,
  BUCKET_CREATED,
  BUCKET_DELETED,
  RECEIVE_SUBMISSION,
  RECEIVE_SUBMISSIONS,
  UPDATE_BUCKET,
  DELETE_BUCKET,
  ERROR
} from './actions'

export function initUser() {
  dispatch(INIT_USER)
}

export function startSubmissionEventSource(bucketId) {
  var url = bucketId ? "/submissions/${bucketId}/events" : "/submissions/events"
  var es = new EventSource(url, { withCredentials: true });
  es.onmessage = function (event) {
    receiveSubmission(JSON.parse(event.data));
  };
}

export function receiveSubmission(submission) {
  dispatch(RECEIVE_SUBMISSION, submission)
}

export function loadBuckets() {
  getBuckets()
  .then((buckets) => {
    console.log('foo', LOAD_BUCKETS, buckets)
    dispatch(LOAD_BUCKETS, buckets)
  })
}

export function createBucket(bucket, done) {
  requestCreateBucket(bucket)
  .then((result) => {
    dispatch(BUCKET_CREATED, result)
    done()
  }, (err) => {
    dispatch(ERROR, err)
  })
}


export function updateBucket(bucket) {
  requestUpdateBucket(bucket)
  .then((result) => {
    dispatch(BUCKET_UPDATED, result)
  })
  .error((err) => {
    dispatch(ERROR, err)
  })
}

export function deleteBucket(bucketId, done) {
  requestDeleteBucket(bucketId)
  .then(result => {
    dispatch(BUCKET_DELETED, result)
    done()
  })
}
