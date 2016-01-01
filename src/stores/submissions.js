import {createStore} from 'sweetflux'
import {RECEIVE_SUBMISSION, RECEIVE_SUBMISSIONS} from './actions'

const SubmissionStore = createStore(
  'Submissions',
  [],
  (state, action) => {
    switch (action.type) {
      case RECEIVE_SUBMISSIONS:
        console.log('RECEIVE_SUBMISSIONS', state, action.data)
        return state.concat(action.data);
      default:
        return state;
    }
  },
  {
    getSubmissions: (state) => state,
  }
)

export default SubmissionStore
