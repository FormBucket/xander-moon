import {createStore} from 'fluxury'

const BucketStore = createStore(
  'BucketStore',
  [],
  {
    SET_BUCKETS: (state, action) => action.data.reduce( (a, b) => {
      a[b.id] = b
      return a
    }, {}),
    STREAM_SUBMISSION: (state, action) => {
      var bucket = state[action.data.bucket_id]
      bucket.submission_count += 1
      var obj = {}
      obj[bucket.id] = bucket
      return Object.assign({}, state, obj)
    }
  },
  {
    getBuckets: (state) => state ? Object.keys(state).reduce( (a,b) => a.concat([state[b]]), []) : [], // convert list to array
    find: (state, id) => state ? state[id] : undefined,
    findByName: (state, name) => state ? state.filter(n => n.name === name) : undefined
  }
)

// FIXME: REMOVE DEV HACK
window.BucketStore = BucketStore

export default BucketStore
