import {createStore} from 'xander'
import {branch} from 'formula'
import buckets from './buckets'

let bucket = createStore(
  'bucket',
  (state={}, { type, data }) => branch(

    type === 'changeBucket',
    { ...state, changes: { ...(state||{}).changes, ...data } },

    type === 'initBucket',
    { loading: true, id: data, changes: {} },


    type === 'resetBucket',
    {},

    state
  ), {
    merge: ({ id, changes }) => branch(
      buckets.find(id),
      () => ({ ...buckets.find(id), ...changes }),
      {}
    )
  }
)

export default bucket;
