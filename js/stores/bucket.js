import {createStore} from 'xander'
import {IF} from 'formula'
import buckets from './buckets'

let bucket = createStore(
  'bucket',
  (state={}, { type, data }) => IF(

    type === 'changeBucket',
    { ...state, changes: { ...(state||{}).changes, ...data } },

    type === 'initBucket',
    { loading: true, id: data, changes: {} },


    type === 'resetBucket',
    {},

    state
  ), {
    merge: ({ id, changes }) => IF(
      buckets.find(id),
      () => ({ ...buckets.find(id), ...changes }),
      {}
    )
  }
)

export default bucket;
