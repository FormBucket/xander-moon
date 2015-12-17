import {createStore} from 'sweetflux'
import {LOAD_FORMS} from './actions'
import {Map} from 'immutable'

const FormStore = createStore(
  'FormStore',
  Map(),
  (state, action) => {
    switch (action.type) {
      case LOAD_FORMS:
        return state.set('forms', action.data)
      default:
        return state
    }
  },
  {
    getForms: (state) => state.get('forms'),
    findForm: (state, id) => state.forms.find(n => n.id === id),
    findFormByName: (state, name) => state.forms.find(n => n.name === name)
  }
)

export default FormStore
