// functions to validate data.
// return empty array when no errors
import {
  MISSING_ID,
  MISSING_NAME
}
from './error-codes'

function missing(o) {
  return (
    typeof o === 'undefined' ||
    o === null ||
    o === ''
  );
}

function isFormValid(form) {
  let errors = []

  if (missing(form.id)) {
    errors.push( MISSING_NAME )
  }

  if (missing(form.name)) {
    errors.push( MISSING_NAME )
  }

  return errors;
}

function isUserValid(user) {
  // FIXME: Write code asshole
}

export const Validations = {
  isFormValid,
  isUserValid
}
