import createStore from "unistore";
import devtools from "unistore/devtools";
import { route } from "preact-router";

import {
  requestBuckets,
  requestBucket,
  requestCreateBucket,
  requestUpdateBucket,
  requestSubmissionsByBucket,
  requestUpdateUser,
  requestProfile,
  requestSubscribe,
  requestUnsubscribe,
  requestDeleteBucket,
  requestBucketExport,
  requestDownloadFile,
  requestUpdateSubmissions,
  requestDeleteSubmissions,
  requestLogs,
  requestLog,
  requestEmailQueue
} from "./webutils";

const initialState = {
  user: {
    token: localStorage.getItem("token")
  },
  currentBucketId: undefined,
  unsavedBucket: {},
  savedBucket: {},
  buckets: undefined,
  bucketsbyid: {}
};

export let store =
  process.env.NODE_ENV === "production"
    ? createStore(initialState)
    : devtools(createStore(initialState));

// If actions is a function, it gets passed the store:
export let actions = store => ({
  updateUser(updates) {
    return requestUpdateUser(updates);
  },

  loadProfile() {
    requestProfile().then(user => {
      store.setState({ user });

      if (window.Intercom) {
        window.Intercom("update", {
          app_id: "n2h7hsol",
          name: user.name, // Full name
          email: user.email, // Email address
          created_at: Math.round(new Date(user.created_on).getTime() / 1000) // Signup date as a Unix timestamp
        });
      }
    });
  },

  loadBuckets() {
    requestBuckets().then(buckets => {
      store.setState({ buckets });
    });
  },

  clearBucket(state) {
    return { bucket: null, savedBucket: null, unsavedBucket: null };
  },

  loadBucket(state, bucketId) {
    requestBucket(bucketId).then(bucket => {
      let { buckets = [] } = state;
      if (buckets.filter(d => d.id === bucketId).length > 0) {
        buckets = buckets.map(d => d.id === bucketId ? bucket : d);
      } else {
        buckets = buckets.concat(bucket);
      }
      store.setState({ unsavedBucket: bucket, savedBucket: bucket, buckets });
    });
  },

  createBucket(state, bucket = {}) {
    requestCreateBucket(bucket).then(result => {
      bucket.id = result.id;
      store.setState({
        bucketChanges: {},
        buckets: state.buckets.concat(bucket)
      });
      route("/buckets/" + result.id + "/settings");
    });
  },

  changeBucket(state, bucketChanges) {
    return {
      unsavedBucket: { ...state.unsavedBucket, ...bucketChanges }
    };
  },

  resetBucket(state, bucketChanges) {
    return {
      unsavedBucket: {},
      savedBucket: {}
    };
  },

  saveBucket(state) {
    requestUpdateBucket(state.unsavedBucket).then(
      result => {
        store.setState({
          flash: "Saved",
          savedBucket: state.unsavedBucket
        });
        setTimeout(() => store.setState({ flash: undefined }), 2000);
      },
      err => {
        reject(err);
      }
    );
  },

  deleteBucket(state) {
    var bucket = state.savedBucket;
    var buckets = state.buckets;

    if (
      !confirm(
        "This will delete the bucket and all your submissions. Continue?"
      )
    ) {
      return;
    }

    requestDeleteBucket(bucket.id)
      .then(result => {
        store.setState({
          buckets: state.buckets.filter(d => d.id != bucket.id)
        });
        route("/buckets");
      })
      .catch(err => {
        store.setState({ error: err });
      });
  },

  exportBucket(state, bucket, type) {
    requestBucketExport(bucket.id, type).then(result =>
      requestDownloadFile(result)
    );
  },

  updateSubmissions(
    state,
    { spam, deleted },
    bucket = state.bucket,
    selected = state.selected
  ) {
    requestUpdateSubmissions(bucket.id, selected, {
      spam,
      deleted
    })
      .then(n => actions(store).loadSubmissions(state, state.params))
      .catch(error => alert(error));

    return { selected: [] };
  },

  destroySubmissions(state, bucket = state.bucket, selected = state.selected) {
    requestDeleteSubmissions(bucket.id, selected)
      .then(n => actions(store).loadSubmissions(state, state.params))
      .catch(error => alert(error));

    return { selected: [] };
  },

  loadSubmissions(state, params) {
    store.setState({
      params,
      submissions: null,
      total: null,
      totalSpam: null,
      totalDeleted: null
    });

    Promise.all([
      requestBucket(params.id),
      requestSubmissionsByBucket(
        params.id,
        +params.offset,
        +params.limit,
        params.select.indexOf("id") > -1
          ? params.select
          : "id," + params.select,
        params.q,
        params.type || "inbox"
      )
    ])
      .then(values => {
        let { total, totalSpam, totalDeleted, items } = values[1];
        let bucket = values[0];
        let submissions = items;
        let ids = items.map(d => d.id);
        store.setState({
          selected: [],
          expanded: ids,
          bucket,
          total,
          totalSpam,
          totalDeleted,
          submissions
        });
      })
      .catch(error => store.setState({ error: error }));
  },

  setSelected(state, selected) {
    return {
      selected
    };
  },

  setExpanded(state, expanded) {
    return {
      expanded
    };
  },

  loadSubmissionsByBucket(state, bucket_id, offset, limit, select) {
    requestSubmissionsByBucket(bucket_id, offset, limit, select).then(items => {
      store.setState({ submissions: items });
    });
  },

  subscribe(state, account_id, token, plan) {
    requestSubscribe(account_id, token, plan).then(user => {
      store.setState({ user });
    });
  },

  cancelSubscription(state, account_id) {
    requestUnsubscribe(account_id).then(profile => {
      store.setState({
        user: { ...user, status: "canceled" }
      });
      return Promise.resolve(profile);
    });
  },

  loadLogs(state, offset, limit = 100, bucketId) {
    requestLogs(offset, limit, bucketId)
      .then(logs =>
        store.setState({
          currentOffset: offset,
          loading: false,
          loaded: true,
          logs: logs
        })
      )
      .catch(error => this.setState({ error: error }));

    if (bucketId) {
      return actions(store).loadBucket(state, bucketId);
    }
  },

  loadLog(state, logId) {
    requestLog(logId)
      .then(log =>
        store.setState({
          log
        })
      )
      .catch(error => store.setState({ error: error.toString() }));
  },

  clearLogs(state) {
    return { logs: null };
  },

  clearLog(state) {
      return { log: null }
  },

  loadNotifications(state, offset, limit, bucket_id, mail_id) {
    requestEmailQueue(offset, limit, bucket_id, mail_id)
      .then( result => store.setState(result) )
      .catch(error => store.setState({ error: error.toString() }));
  },
  clearNotifications() {
    return { items: null };
  }
});
