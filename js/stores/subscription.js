import { createStore } from "xander";

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
