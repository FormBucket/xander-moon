import {createStore} from 'sweetflux'
import {GET_SUBMISSIONS, STREAM_SUBMISSION} from './actions'

const SubmissionStore = createStore(
  'Submissions',
  [],
  (state, action) => {
    switch (action.type) {
      case GET_SUBMISSIONS:
        console.log('GET_SUBMISSIONS', action.data)
        return state.concat(action.data); // push to front
      case STREAM_SUBMISSION:
          console.log('STREAM_SUBMISSION', action.data)
          return [action.data].concat(state); // push to front
      default:
        return state;
    }
  },
  {
    getSubmissions: (state) => state,
    getSubmissionsByBucket: (state, bucket_id, offset, limit) =>
    state
    .filter((n, i) => (n.bucket_id === bucket_id) && (i > offset && i < offset+limit) )
  }
)

// FIXME: remove
window.SubmissionStore = SubmissionStore

export default SubmissionStore
