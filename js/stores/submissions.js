import {createStore} from 'xander'

const SubmissionStore = createStore(
  "submissions",
  {
    getSubmissions: (state, action) => action.data
  }
)

export default SubmissionStore
