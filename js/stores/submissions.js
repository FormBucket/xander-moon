import {createStore} from 'fluxury'

const SubmissionStore = createStore(
  "submissions",
  {
    getSubmissions: (state, action) => action.data
  }
)

export default SubmissionStore
