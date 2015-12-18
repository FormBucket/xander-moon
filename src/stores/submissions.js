import {createStore} from 'sweetflux'
import {RECEIVE_SUBMISSION, RECEIVE_SUBMISSIONS} from './actions'
import {List} from 'immutable';

const SubmissionStore = createStore(
  'Submissions',
  List(),
  (state, action) => {
    switch (action.type) {
      case RECEIVE_SUBMISSIONS:
        return state.concat(action.data);
      case RECEIVE_SUBMISSION:
        return state.push(action.data);
      default:
        return state;
    }
  },
  {
    getSubmissions: (state) => state,
  }
)

export default SubmissionStore
