import {createStore} from 'sweetflux'
import {LOAD_BUCKETS} from './actions'
import Immutable, {Map} from 'immutable'

const BucketStore = createStore(
  'BucketStore',
  Immutable.fromJS({ buckets: [] }),
  (state, action) => {
    console.log('buckets', state, action)
    switch (action.type) {
      case LOAD_BUCKETS:
        console.log('LOAD_BUCKETS', action)
        return state.set('buckets', action.data)
      default:
        return state
    }
  },
  {
    getBuckets: (state) => state.get('buckets'),
    find: (state, id) => state.get('buckets').find(n => n.id === id),
    findByName: (state, name) => state.get('buckets').find(n => n.name === name)
  }
)

// FIXME: REMOVE DEV HACK
window.BucketStore = BucketStore

export default BucketStore
