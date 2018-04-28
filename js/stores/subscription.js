/**
 * Copyright (c) 2015-2018, FormBucket.com
 */

import { createStore } from "hrx";

const SubscriptionStore = createStore(
  "subscription",
  {
    getSubscriptionPlans: (state, action) =>
      Object.assign({}, state, { plans: action.data })
  },
  {
    getPlans: state => state.plans,
    getPlanByName: (state, id) => {
      var plans = state.plans.filter(n => n.id === id);
      return plans.length === 0 ? {} : plans[0];
    }
  }
);

export default SubscriptionStore;
