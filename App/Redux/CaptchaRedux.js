import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const {Types, Creators} = createActions({
  captchaRequest: ['time'],
  captchaSuccess: ['hash1', 'hash2', 'url'],
  captchaFailure: null,
  captchaCheck: ['code'],
  captchaCheckSuccess: ['status', 'msg'],
  captchaCheckFailure: ['error']
})

export const CaptchaTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  url: null,
  fetching: null,
  hash1: null,
  hash2: null,
  checkCode: null,
  error: null
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = (state) =>
  state.merge({fetching: true})
export const check = (state,action) =>
   state.merge({fetching: true})
/* {
  let { code } = action
  const { hash1, hash2 } = state
  code = code.toLowerCase()
  let a = 0
  for (let i = 0 ; i < code.length; i++) {
    a += code.charAt(i).charCodeAt()
  }
  console.log(a)
  if (a == hash1 || a == hash2){
   return checkSuccess(state, {status:true, msg:'验证成功Ok'})
  } else {
   return checkFailure(state, {error:'验证失败error'})
  }
} */
// successful api lookup
export const success = (state, action) => {
  const {hash1, hash2, url} = action
  return state.merge({fetching: false, error: null, hash1, hash2, url})
}
export const checkSuccess = (state, action) => {
  const { status, msg } = action
  return state.merge({fetching: false, checkCode: status, error: msg})
}

// Something went wrong somewhere.
export const failure = (state, { error }) =>
  state.merge({fetching: false, error: error, hash1: null, hash2: null, url: null})
export const checkFailure = (state, { error }) =>
  state.merge({fetching: false, error: error, hash1: null, hash2: null, url: null})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.CAPTCHA_REQUEST]: request,
  [Types.CAPTCHA_SUCCESS]: success,
  [Types.CAPTCHA_FAILURE]: failure,
  [Types.CAPTCHA_CHECK]: check,
  [Types.CAPTCHA_CHECK_SUCCESS]: checkSuccess,
  [Types.CAPTCHA_CHECK_FAILURE]: checkFailure

})
