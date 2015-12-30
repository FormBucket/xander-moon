import {dispatch} from 'sweetflux'

// FIXME: REMOVE DEV HACK
window.dispatch = dispatch

import {
  getForms,
  requestCreateForm,
  requestUpdateForm
} from '../utils/webutils'

import {
  INIT_USER,
  LOAD_FORMS,
  RECEIVE_FORMS,
  LOAD_SUBMISSIONS,
  LOAD_PROFILE,
  CREATE_FORM,
  FORM_CREATED,
  FORM_DELETED,
  RECEIVE_SUBMISSION,
  RECEIVE_SUBMISSIONS,
  UPDATE_FORM,
  DELETE_FORM,
  ERROR
} from './actions'

export function initUser() {
  dispatch(INIT_USER)
}

export function startSubmissionEventSource(formId) {
  var url = formId ? "/submissions/${formId}/events" : "/submissions/events"
  var es = new EventSource(url, { withCredentials: true });
  es.onmessage = function (event) {
    receiveSubmission(JSON.parse(event.data));
  };
}

export function receiveSubmission(submission) {
  dispatch(RECEIVE_SUBMISSION, submission)
}

export function loadForms() {
  getForms()
  .then((forms) => {
    console.log('foo', LOAD_FORMS, forms)
    dispatch(LOAD_FORMS, forms)
  })
}

export function createForm(form, done) {
  requestCreateForm(form)
  .then((result) => {
    dispatch(FORM_CREATED, result)
    done()
  }, (err) => {
    dispatch(ERROR, err)
  })
}


export function updateForm(form) {
  requestUpdateForm(form)
  .then((result) => {
    dispatch(FORM_UPDATED, result)
  })
  .error((err) => {
    dispatch(ERROR, err)
  })
}

export function deleteForm(formId, done) {
  requestDeleteForm(formId)
  .then(result => {
    dispatch(FORM_DELETED, result)
    done()
  })
}
