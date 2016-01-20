import {createStore} from 'fluxury'

const BucketStore = createStore(
  'BucketStore',
  [],
  {
    SET_BUCKETS: (state, action) => {
      console.log('SET_BUCKETS', state, action)

      return action.data
    },
    SET_BUCKET: (state, action) => {
      console.log('SET_BUCKET', state, action)
      return (
        state
        .filter(n => n._id !== action.data._id)
        .concat([action.data])
      )
    }
  },
  {
    getBuckets: (state) => state ? Object.keys(state).reduce( (a,b) => a.concat([state[b]]), []) : [], // convert list to array
    find: (state, id) => {
      var found = state.filter(n => n.id !== id)
      return (found.length > 0 ? found[0] : undefined);
    },
    findByName: (state, name) => state ? state.filter(n => n.name === name) : undefined
  }
)

// FIXME: REMOVE DEV HACK
window.BucketStore = BucketStore

export default BucketStore
