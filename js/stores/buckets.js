/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { createStore } from "xander";
import { IF, GROUP } from "formula";

let buckets = createStore(
  "buckets",
  (state = { buckets: [], byid: {}, user: {} }, { type, data }) =>
    IF(
      type === "setProfile",
      () => ({ ...state, user: data }),

      type === "initBuckets" || type === "initBucket",
      () => ({ ...state, loading: true }),

      type === "resetBuckets",
      { buckets: [], byid: {}, user: {} },

      type === "loadBuckets",
      () => ({
        ...state,
        buckets: data,
        byid: GROUP(data || [], "id"),
        loading: false
      }),

      type === "loadBucket",
      () => {
        let buckets;
        if (state.byid.hasOwnProperty(data.id)) {
          buckets = state.buckets.map(d => IF(d.id === data.id, data, d));
        } else {
          buckets = state.buckets.concat(data);
        }

        return {
          ...state,
          buckets,
          byid: GROUP(buckets, "id"),
          loading: false
        };
      },

      type === "changeBuckets",
      () => ({ ...state, ...data }),
      state
    ),
  {
    find: (state, id) => (state.byid[id] || [])[0]
  }
);

export default buckets;
