import {createStore} from 'fluxury'

const SubmissionStore = createStore(
  {
    getSubmissions: (state, action) => action.data
  }
)

export default SubmissionStore
