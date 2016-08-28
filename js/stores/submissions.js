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

export default SubmissionStore
