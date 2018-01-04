import {createStore} from 'xander'
import {branch, group} from 'formula'

let buckets = createStore('buckets', (state={ buckets: [], byid: {}, user: {} }, {type, data}) => branch(
  type === "setProfile",
  () => ({ ...state, user: data }),

  type === "initBuckets" || type === "initBucket",
  () => ({ ...state, loading: true }),

  type === "resetBuckets",
  { buckets: [], byid: {}, user: {} },

  type === "loadBuckets",
  () => ({ ...state, buckets: data, byid: group((data||[]), "id"), loading: false }),

  type === 'loadBucket',
  () => {
    let buckets;
    if (state.byid.hasOwnProperty(data.id)) {
      buckets = state.buckets.map((d) => branch(d.id === data.id, data, d))
    } else {
      buckets = state.buckets.concat(data)
    }

    return { ...state, buckets, byid: group(buckets, "id"), loading: false }
  },

  type === "changeBuckets",
  () => ({ ...state, ...data }),
  state
), {
  find: (state, id) => (state.byid[id]||[])[0]
})

export default buckets
