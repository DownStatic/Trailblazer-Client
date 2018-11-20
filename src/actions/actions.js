import * as types from './actionTypes'

export function getUsername() {
  return {type: types.GET_USERNAME, valid: true}
}

export function attemptLogin(unp) {
  return {type: types.ATTEMPT_LOGIN, unp: unp}
}
