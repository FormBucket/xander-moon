import {createStore} from 'sweetflux'
import {GET_SUBMISSIONS, STREAM_SUBMISSION} from './actions'

const SubmissionStore = createStore(
  'Submissions',
  [],
  (state, action) => {
    switch (action.type) {
      case GET_SUBMISSIONS:
        return action.data
      case STREAM_SUBMISSION:
          return [action.data].concat(state)
      default:
        return state;
    }
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
