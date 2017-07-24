import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  captchaRequest: ['time'],
  captchaSuccess: ['hash1', 'hash2', 'url'],
  captchaFailure: null
})

export const CaptchaTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  url: null,
  fetching: null,
  hash1: null,
  hash2: null,
  error: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({fetching: true})

// successful api lookup
export const success = (state, action) => {
  const {hash1, hash2, url} = action
  return state.merge({fetching: false, error: null, hash1, hash2, url})
}

// Something went wrong somewhere.
export const failure = (state,{ error }) =>
  state.merge({fetching: false, error: error, payload: null, hash1: null, hash2: null, url: null})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CAPTCHA_REQUEST]: request,
  [Types.CAPTCHA_SUCCESS]: success,
  [Types.CAPTCHA_FAILURE]: failure
})
