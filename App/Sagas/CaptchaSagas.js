/* ***********************************************************
 * A short word on how to use this automagically generated file.
 * We're often asked in the ignite gitter channel how to connect
 * to a to a third party api, so we thought we'd demonstrate - but
 * you should know you can use sagas for other flow control too.
 *
 * Other points:
 *  - You'll need to add this saga to sagas/index.js
 *  - This template uses the api declared in sagas/index.js, so
 *    you'll need to define a constant in that file.
 *************************************************************/

import { call, put } from 'redux-saga/effects'
import CaptchaActions from '../Redux/CaptchaRedux'

export function * getCaptcha (api, action) {
  const {data} = action
  // make the call to the api
  const response = yield call(api.getCaptcha, data)
  console.log(response)
  try {
    // success?
     if (response.ok) {
       // You might need to change the response here - do this with a 'transform',
       // located in ../Transforms/. Otherwise, just pass the data back from the api.
       const {hash1, hash2, url} = response.data
       yield put(CaptchaActions.captchaSuccess(hash1, hash2, url))
     } else {
       yield put(CaptchaActions.captchaFailure('WRONG'))
     }
  } catch (error) {
    yield put(CaptchaActions.captchaFailure(error))
  }
}

export function * checkCaptcha (api, action) {
  const { code } = action

  const respone = yield call(api.checkCaptcha, code)


  try {
    if (respone.ok) {
      const {status,msg} = respone.data
      if (status) {
        yield put(CaptchaActions.captchaCheckSuccess(status,msg))
      } else {
        yield put(CaptchaActions.captchaCheckFailure(msg))
      }
    } else { //
      yield put(CaptchaActions.captchaCheckFailure('CHECK-WANG'))
    }
  } catch (error) {
    yield put(CaptchaActions.captchaCheckFailure(error))
  }
}
