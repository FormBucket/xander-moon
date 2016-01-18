import {createStore} from 'fluxury'

const SubmissionStore = createStore(
  'Submissions',
  [],
  {
    GET_SUBMISSIONS: (state, action) => action.data,
    STREAM_SUBMISSION: (state, action) => [action.data].concat(state)
  },
  {
    getSubmissions: (state) => state,
    getSubmissionsByBucket: (state, bucket_id, offset, limit) => state
    .filter((n, i) => (n.bucket_id === bucket_id) && (i > offset && i < offset+limit) )
  }
)

// FIXME: remove
window.SubmissionStore = SubmissionStore

export default SubmissionStore
