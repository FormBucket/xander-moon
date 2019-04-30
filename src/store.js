import createStore from "unistore";
import devtools from "unistore/devtools";
import { route } from "preact-router";

import {
  requestUpdateUser,
  requestSubscribe,
  requestUnsubscribe,
  requestDeleteBucket,
  requestBucketExport,
  requestDownloadFile,
  requestUpdateSubmissions,
  requestDeleteSubmissions,
  gql
} from "./webutils";
import update from "immutability-helper";

let fragmentViewerSummary = `fragment ViewerSummary on Account {
  id
  name
  anonymous
  email
  status
  trialPeriodDays
  trialStart
  trialEnd
  validUntil
  created
  updated
}`;

let fragmentBucketMinimal = `fragment BucketMinimal on Bucket {
  id
  name
  created
}`;

let fragmentBucketSummary = `fragment BucketSummary on Bucket {
  id
  name
  created
  submissions {
    totalCount
  }
}`;

let fragmentBucketComplete = `fragment BucketComplete on Bucket {
  id
  owner {
    id
  }
  name
  enabled
  redirectUrl
  isAPIRequest
  emailTo
  advancedNotificationOn
  notificationFrom
  notificationReplyTo
  emailCC
  emailBCC
  notificationSubject
  notificationTemplate
  webhooks
  honeyPotOn
  honeyPotField
  spamCheckOn
  autoRecaptchaOn
  recaptchaOn
  recaptchaSecret
  autoResponder {
    on
    to
    replyTo
    cc
    bcc
  }
  quickUseForm
}`;

let fragmentLogParts = `fragment LogParts on LogConnection {
  totalCount
  pageInfo {
    startCursor
    endCursor
  }
  nodes {
    id
    type
    method
    url
    ts
  }
}`;

let fragmentSubmissionParts = `fragment SubmissionParts on SubmissionConnection {
  totalCount
  spamCount
  deletedCount
  pageInfo {
    startCursor
    endCursor
  }
  nodes {
    id
    data
    apiRequest
    ip
    createdOn
  }
}`;

let fragmentNotificationParts = `fragment NotificationParts on NotificationConnection {
  totalCount
  pageInfo {
    startCursor
    endCursor
  }
  nodes {
    id
    status
    subject
    from
    createdOn
  }
}`;

let queryProfile = `query profile {
  viewer {
    ...ViewerSummary
  }
}`;

let queryBucket = `query bucketPage($bucketId:ID!){
  viewer {
    ...ViewerSummary
  }
  bucket(id: $bucketId) {
    ...BucketComplete
  }
}`;

let queryBuckets = `query bucketsPage {
  viewer {
    ...ViewerSummary
  }
  buckets {
    totalCount
    nodes {
      ...BucketSummary
    }
  }
}`;

let querylogsPage = `query logsPage($bucketId: ID!, $limit: Int, $offset: Int){
  viewer {
    ...ViewerSummary
  }
  bucket(id: $bucketId) {
    ...BucketComplete
    logs(limit: $limit, offset: $offset) {
      ...LogParts
    }
  }
}`;

let querylogPage = `query logPage($logId: ID!){
  viewer {
    ...ViewerSummary
  }
  log(id: $logId) {
    id
    type
    start
    ts
    ip
    method
    url
    host
    query
    requestHeaders
    responseHeaders
    requestBody
    status
  }
}`;

let querySubmissionsPage = `query submissionsPage($bucketId: ID!, $limit: Int, $offset: Int,  $type: SubmissionType, $search: String){
  viewer {
    ...ViewerSummary
  }
  bucket(id: $bucketId) {
    ...BucketMinimal
    submissions(limit: $limit, offset: $offset, type: $type, search: $search) {
      ...SubmissionParts
    }
  }
}`;

let queryNotificationPage = `query notificationsPage($bucketId: ID!, $limit: Int, $offset: Int){
  viewer {
    ...ViewerSummary
  }
  bucket(id: $bucketId) {
    ...BucketComplete
    notifications(limit: $limit, offset: $offset) {
      ...NotificationParts
    }
  }
}`;

let queryInvoicesPage = `query invoicesPage {
  viewer {
    ...ViewerSummary
  }
  invoices {
    edges {
      node {
        id
        date
        total
        paid
        amountDue
        amountPaid
        amountRemaining
        attemptCount
        attempted
        autoAdvance
        billing
        billingReason
        customer
        defaultSource
        hostedInvoiceUrl
        invoicePdf
      }
    }
  }
}`;

export let profileOperation = `${fragmentViewerSummary}
${queryProfile}`;

export let bucketsOperation = `${fragmentViewerSummary}
${fragmentBucketSummary}
${queryBuckets}
`;

export let bucketOperation = `${fragmentViewerSummary}
${fragmentBucketComplete}
${queryBucket}
`;

export let submissionsOperation = `${fragmentViewerSummary}
${fragmentBucketMinimal}
${fragmentSubmissionParts}
${querySubmissionsPage}
`;

export let logsOperation = `${fragmentViewerSummary}
${fragmentBucketComplete}
${fragmentLogParts}
${querylogsPage}
`;

export let logOperation = `${fragmentViewerSummary}
${querylogPage}
`;

export let notificationOperation = `${fragmentViewerSummary}
${fragmentBucketComplete}
${fragmentNotificationParts}
${queryNotificationPage}
`;

export let invoicesOperation = `${fragmentViewerSummary}
${queryInvoicesPage}
`;

export let allOperations = `
${fragmentViewerSummary}
${fragmentBucketMinimal}
${fragmentBucketSummary}
${fragmentBucketComplete}
${fragmentLogParts}
${fragmentSubmissionParts}
${fragmentNotificationParts}
${queryProfile}
${queryBucket}
${queryBuckets}
${querylogsPage}
${querySubmissionsPage}
${queryNotificationPage}
${queryInvoicesPage}
`;

const initialState = {
  user: {
    token: localStorage.getItem("token")
  },
  currentBucketId: undefined,
  unsavedBucket: {},
  savedBucket: {},
  buckets: undefined,
  bucketsbyid: {},
  menuOn: false
};

export let store =
  process.env.NODE_ENV === "production"
    ? createStore(initialState)
    : devtools(createStore(initialState));

// If actions is a function, it gets passed the store:
export let actions = store => ({
  updateUser(state, updates) {
    store.setState({
      isSaving: true,
      user: { ...state.user, name: updates.name, email: updates.email }
    });
    requestUpdateUser(updates).then(() =>
      store.setState({
        isSaving: false
      })
    );
  },

  toggleMenuOff() {
    return { menuOn: false };
  },

  toggleMenu(state) {
    return { menuOn: !state.menuOn };
  },

  loadProfile() {
    gql(profileOperation, {}, "profile").then(({ data: { viewer } }) => {
      store.setState({ user: viewer, viewer });

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
    gql(bucketsOperation, {}, "bucketsPage").then(
      ({
        data: {
          buckets: { nodes },
          viewer
        }
      }) => {
        store.setState({
          buckets: nodes,
          user: viewer,
          viewer
        });
      }
    );
  },

  clearBucket(state) {
    return { bucket: null, savedBucket: null, unsavedBucket: null };
  },

  loadBucket(state, bucketId) {
    gql(bucketOperation, { bucketId }, "bucketPage").then(
      ({ data: { bucket, viewer } }) => {
        let { buckets = [] } = state;
        if (buckets.filter(d => d.id === bucketId).length > 0) {
          buckets = buckets.map(d =>
            d.id === bucketId ? { ...d, ...bucket } : d
          );
        } else {
          buckets = buckets.concat(bucket);
        }
        store.setState({
          unsavedBucket: {},
          savedBucket: bucket,
          buckets,
          user: viewer,
          viewer
        });
      }
    );
  },

  createBucket(
    state,
    bucket = { enabled: true, spamCheckOn: true, autoRecaptchaOn: true }
  ) {
    gql(
      `mutation($bucket: BucketInput) {
        createBucket(bucket: $bucket)
    }`,
      { bucket }
    ).then(({ data: { createBucket } }) => {
      bucket.id = createBucket;
      store.setState({
        buckets: state.buckets.concat(bucket)
      });
      route("/buckets/" + bucket.id + "/settings");
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
    gql(
      `mutation($id: ID!, $changes: BucketInput) {
      updateBucket(id: $id, changes: $changes)
    }`,
      { id: state.savedBucket.id, changes: state.unsavedBucket }
    ).then(
      result => {
        store.setState({
          flash: "Saved",
          savedBucket: { ...state.savedBucket, ...state.unsavedBucket }
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
    requestBucketExport(bucket.id, type).then(({ key }) =>
      requestDownloadFile(key)
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

    gql(
      submissionsOperation,
      {
        bucketId: params.id,
        type: params.type,
        limit: +params.limit,
        offset: +params.offset,
        search: params.q
      },
      "submissionsPage"
    )
      .then(({ data: { bucket, viewer } }) => {
        let { totalCount, spamCount, deletedCount } = bucket.submissions;
        let submissions = bucket.submissions.nodes;
        // let ids = submissions.map(d => d.id);
        store.setState({
          selected: [],
          // expanded: ids,
          expanded: submissions.map(d => d.id),
          bucket,
          totalCount,
          spamCount,
          deletedCount,
          submissions,
          q: params.q
        });
      })
      .catch(error => store.setState({ error: error.toString() }));
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
    // requestLogs(offset, limit, bucketId);
    gql(
      logsOperation,
      {
        bucketId,
        limit: +limit,
        offset: +offset
      },
      "logsPage"
    )
      .then(({ data: { bucket, viewer } }) =>
        store.setState({
          user: viewer,
          currentOffset: offset,
          loading: false,
          loaded: true,
          logs: bucket.logs.nodes,
          savedBucket: bucket,
          bucket: bucket
        })
      )
      .catch(error => console.log(error));
  },

  loadLog(state, logId) {
    gql(
      logOperation,
      {
        logId
      },
      "logPage"
    )
      .then(({ data: { log, viewer } }) =>
        store.setState({
          user: viewer,
          log
        })
      )
      .catch(error => store.setState({ error: error.toString() }));
  },

  clearLogs(state) {
    return { logs: null };
  },

  clearLog(state) {
    return { log: null };
  },

  loadNotifications(state, offset, limit, bucketId, mail_id) {
    gql(notificationOperation, {
      offset: +offset,
      limit: +limit,
      bucketId,
      mail_id
    })
      .then(({ data }) => store.setState(data))
      .catch(error => store.setState({ error: error.toString() }));
  },
  clearNotifications() {
    return { items: null };
  },
  loadInvoices() {
    gql(invoicesOperation, {}, "invoicesPage").then(({ data: { invoices } }) =>
      store.setState({ invoices: invoices.edges.map(d => d.node) })
    );
  }
});
