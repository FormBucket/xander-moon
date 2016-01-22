import {createStore} from 'fluxury'

const SubmissionStore = createStore(
  'Submissions',
  [],
  {
    getSubmissions: (state, action) => action.data
  },
  {
    getSubmissions: (state) => state
  }
)

// FIXME: remove
window.SubmissionStore = SubmissionStore

export default SubmissionStore
