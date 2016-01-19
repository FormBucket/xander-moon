import {createStore} from 'fluxury'

const SubscriptionStore = createStore(
  'Subscriptions',
  {
    Plans: []
  },
  {
    GET_SUBSCRIPTION_PLANS: (state, action) => Object.assign({},
      state,
      { Plans: action.data })
  },
  {
    getPlans: (state) => state.Plans
  }
)

// FIXME: remove
window.SubscriptionStore = SubscriptionStore

export default SubscriptionStore
