/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { createStore } from "xander";

const SubmissionStore = createStore("submissions", {
  getSubmissions: (state, action) => action.data
});

export default SubmissionStore;
