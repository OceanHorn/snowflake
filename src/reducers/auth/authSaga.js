'use strict'

/**
 * Project requirements
 */
import BackendFactory from '../../lib/BackendFactory'

import { Actions } from 'react-native-router-flux'

import { appAuthToken } from '../../lib/AppAuthToken'

import _ from 'underscore'

import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import * as authActions from './authActions'
import Csts from '../../lib/constants'

/**
 * ## Token
 * If AppAuthToken has the sessionToken, the user is logged in
 * so set the state to logout.
 * Otherwise, the user will default to the login in screen.
 */
function* sessionToken() {
  try {
    const token = yield call(appAuthToken.getSessionToken)
    if (token) {
      yield put(authActions.sessionTokenRequestSuccess(token))
      yield put(authActions.logoutState())
      Actions.Tabbar()
    } else {
      yield put(authActions.sessionTokenRequestFailure(error))
      yield put(authActions.loginState())
      Actions.Login()
    }
  } catch (error) {
    yield put(authActions.sessionTokenRequestFailure(error))
    yield put(authActions.loginState())
    Actions.Login()
  }
}


/**
 * ## Login
 * @param {string} username - user's name
 * @param {string} password - user's password
 *
 * After calling Backend, if response is good, save the json
 * which is the currentUser which contains the sessionToken
 *
 * If successful, set the state to logout
 * otherwise, dispatch a failure
 */
function* login(action) {
  try {
    const json = yield call(BackendFactory().login, action.payload)
    yield call(appAuthToken.storeSessionToken, json)
    yield put(authActions.loginSuccess(json))
    Actions.Tabbar()
    yield put(authActions.logoutState())
  } catch (error) {
    yield put(authActions.loginFailure(error))
  }
}

/**
 * ## Login
 * After dispatching the logoutRequest, get the sessionToken
 *
 *
 * When the response is received and it's valid
 * change the state to register and finish the logout
 *
 * But if the call fails, like expired token or
 * no network connection, just send the failure
 *
 * And if you fail due to an invalid sessionToken, be sure
 * to delete it so the user can log in.
 *
 * How could there be an invalid sessionToken?  Maybe they
 * haven't used the app for a long time.  Or they used another
 * device and logged out there.
 */
function* logout() {
  try {
    const token = yield call(appAuthToken.getSessionToken)
    yield call(BackendFactory(token).logout)
    yield call(appAuthToken.deleteSessionToken)
    yield put(authActions.loginState())
    yield put(authActions.logoutSuccess())
    Actions.Login()
  } catch (error) {
    yield put(authActions.logoutFailure(error))
    yield put(authActions.loginState())
  }
}

/**
 * ## signup
 * @param {string} username - name of user
 * @param {string} email - user's email
 * @param {string} password - user's password
 *
 * Call the server signup and if good, save the sessionToken,
 * set the state to logout and signal success
 *
 * Otherwise, dispatch the error so the user can see
 */
function* signup(action) {
  try {
    const json = yield call(BackendFactory().signup, action.payload)
    yield call(appAuthToken.storeSessionToken, Object.assign({}, json,
      {
        username: action.payload.username,
        email: action.payload.email
      }))
    yield put(authActions.signupSuccess(Object.assign({}, json,
      {
        username: action.payload.username,
        email: action.payload.email
      })
    ))
    yield put(authActions.logoutState())
    Actions.Tabbar()
  } catch (error) {   
    yield put(authActions.signupFailure(error))
  }

}

/**
 * ## ResetPassword
 *
 * @param {string} email - the email address to reset password
 * *Note* There's no feedback to the user whether the email
 * address is valid or not.
 *
 * This functionality depends on the server set
 * up correctly ie, that emails are verified.
 * With that enabled, an email can be sent w/ a
 * form for setting the new password.
 */
function* resetPassword (action) {

  try {
    yield call(BackendFactory().resetPassword,
                            {email:action.payload.email})    
    yield put(authActions.loginState())
    yield put(authActions.resetPasswordSuccess())
    Actions.Login()
  } catch (error) {
    yield put(authActions.resetPasswordFailure(error))
  }
 
}

// single entry point to start all Sagas at once
export default function* watchAuth() { 
  yield [
    yield takeEvery(Csts.SESSION_TOKEN_REQUEST, sessionToken),
    yield takeEvery(Csts.LOGIN_REQUEST, login),
    yield takeEvery(Csts.SIGNUP_REQUEST, signup),
    yield takeEvery(Csts.LOGOUT_REQUEST, logout),
    yield takeEvery(Csts.RESET_PASSWORD_REQUEST, resetPassword)
  ]
}