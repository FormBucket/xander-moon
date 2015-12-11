import {createStore} from 'sweetflux'
import {loadSubmissions} from './actions'
import {Map} from 'immutable';

const SubmissionStore = createStore(
  'Submissions',
  Map(),
  (state, action) => {
    switch (action.type) {
      case loadSubmissions:
        return state.set('submissions', action.data);
      default:
        return state;
    }
  },
  {
    getSubmissions: (state) => state.get('submissions'),
  }
)

export default SubmissionStore