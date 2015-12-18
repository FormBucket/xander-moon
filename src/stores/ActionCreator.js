import {dispatch} from 'sweetflux'

import {
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
    console.log(event)
    receiveSubmission(JSON.parse(event.data));
  };
}

export function receiveSubmission(submission) {
  dispatch(RECEIVE_SUBMISSION, submission)
}

export function loadForms(forms) {
  dispatch(LOAD_FORMS, submission)
}

export function createForm(form) {
  requestCreateForm(form)
  .then((result) => {
    dispatch(FORM_CREATED, result)
  })
  .error((err) => {
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
