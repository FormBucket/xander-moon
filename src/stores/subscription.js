import {createStore} from 'fluxury'
import {ISBLANK} from 'functionfoundry'

const SubscriptionStore = createStore(
  'Subscriptions',
  {
    plans: []
  },
  {
    getSubscriptionPlans: (state, action) => Object.assign({},
      state,
      { plans: action.data })
  },
  {
    getPlans: (state) => state.plans,
    getPlanByName: (state, id) => {
      var plans = state.plans.filter(n => n.id === id)
      return plans.length === 0 ? {} : plans[0]
    }
  }
)

// FIXME: remove
window.SubscriptionStore = SubscriptionStore

export default SubscriptionStore
