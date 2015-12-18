// Define Actions
export const INIT_USER = 'INIT_USER'                              // load user data from meta tags into store
export const LOAD_FORMS = 'LOAD_FORMS'                            // start request to load forms
export const RECEIVE_FORMS = 'RECEIVE_FORMS'                      // receive form data from server
export const START_SUBMISSION_EVENTS = 'START_SUBMISSION_EVENTS'  // start request to load submissions
export const LOAD_SUBMISSIONS = 'LOAD_SUBMISSIONS'                // start request to load submissions
export const RECEIVE_SUBMISSION = 'RECEIVE_SUBMISSION'            // receive a submission from server
export const RECEIVE_SUBMISSIONS = 'RECEIVE_SUBMISSIONS'          // receive submissions from server
export const LOAD_PROFILE = 'LOAD_PROFILE'                        // start request to get user profile
export const RECEIVE_PROFILE = 'RECEIVE_PROFILE'                  // receive user profile from server
export const CREATE_FORM = 'CREATE_FORM'                          // send request to server to create form
export const FORM_CREATED = 'FORM_CREATED'                        // server confirms form added in database
export const UPDATE_FORM = 'UPDATE_FORM'                          // send request to server to update form
export const FORM_UPDATED = 'FORM_UPDATED'                        // server confirms form updated in database
export const DELETE_FORM = 'DELETE_FORM'                          // send request to server to delete form
export const FORM_DELETED = 'FORM_DELETED'                        // server confirms form removed from database
export const ERROR = 'ERROR'                                      // error received from server
