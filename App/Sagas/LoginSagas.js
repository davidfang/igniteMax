import { call, put, take } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'

// attempts to login
export function * login (api, action) {
  const {username, password} = action

  try {
    // make the call to the api
    const response = yield call(api.login, username, password)
    console.log(response)
    if (response.ok) {
      // dispatch successful logins
      yield put(LoginActions.loginSuccess(username))
    } else {
      // dispatch failure
      yield put(LoginActions.loginFailure('WRONG'))
    }
  } catch (error) {
    // dispatch failure
    yield put(LoginActions.loginFailure(error))
  }
}
