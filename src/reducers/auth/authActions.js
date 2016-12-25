/**
 * # authActions.js
 *
 * All the request actions have 3 variations, the request, a success
 * and a failure. They all follow the pattern that the request will
 * set the ```isFetching``` to true and the whether it's successful or
 * fails, setting it back to false.
 *
 */
'use strict'

/**
 * ## Imports
 *
 * The actions supported
 */
import Csts from '../../lib/constants'

/**
 * Project requirements
 */
const BackendFactory = require('../../lib/BackendFactory').default

import {Actions} from 'react-native-router-flux'

import {appAuthToken} from '../../lib/AppAuthToken'

import _ from 'underscore'

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */

export function logoutState () {
  return {
    type: Csts.LOGOUT
  }
}
export function registerState () {
  return {
    type: Csts.REGISTER
  }
}

export function loginState () {
  return {
    type: Csts.LOGIN
  }
}

export function forgotPasswordState () {
  return {
    type: Csts.FORGOT_PASSWORD
  }
}

/**
 * ## Logout actions
 */
export function logoutRequest () {
  return {
    type: Csts.LOGOUT_REQUEST
  }
}

export function logoutSuccess () {
  return {
    type: Csts.LOGOUT_SUCCESS
  }
}

export function logoutFailure (error) {
  return {
    type: Csts.LOGOUT_FAILURE,
    payload: error
  }
}

/**
 * ## onAuthFormFieldChange
 * Set the payload so the reducer can work on it
 */
export function onAuthFormFieldChange (field, value) {
  return {
    type: Csts.ON_AUTH_FORM_FIELD_CHANGE,
    payload: {field: field, value: value}
  }
}

/**
 * ## Signup actions
 */
export function signupRequest (username,email,password) {
  return {
    type: Csts.SIGNUP_REQUEST,
    payload:{
      username:username,
      email:email,
      password:password
    }
  }
}

export function signupSuccess (json) {
  return {
    type: Csts.SIGNUP_SUCCESS,
    payload: json
  }
}

export function signupFailure (error) {
  return {
    type: Csts.SIGNUP_FAILURE,
    payload: error
  }
}

/**
 * ## SessionToken actions
 */
export function sessionTokenRequest () {  
  return {
    type: Csts.SESSION_TOKEN_REQUEST
  }
}

export function sessionTokenRequestSuccess (token) {
  return {
    type: Csts.SESSION_TOKEN_SUCCESS,
    payload: token
  }
}

export function sessionTokenRequestFailure (error) {
  return {
    type: Csts.SESSION_TOKEN_FAILURE,
    payload: _.isUndefined(error) ? null : error
  }
}

/**
 * ## DeleteToken actions
 */
export function deleteTokenRequest () {
  return {
    type: Csts.DELETE_TOKEN_REQUEST
  }
}

export function deleteTokenRequestSuccess () {
  return {
    type: Csts.DELETE_TOKEN_SUCCESS
  }
}

/**
 * ## Delete session token
 *
 * Call the AppAuthToken deleteSessionToken
 */
export function deleteSessionToken () {
  return dispatch => {
    dispatch(deleteTokenRequest())
    return appAuthToken.deleteSessionToken()
      .then(() => {
        dispatch(deleteTokenRequestSuccess())
      })
  }
}

/**
 * ## saveSessionToken
 * @param {Object} response - to return to keep the promise chain
 * @param {Object} json - object with sessionToken
 */
export function saveSessionToken (json) {
  return appAuthToken.storeSessionToken(json)
}

/**
 * ## Login actions
 */
export function loginRequest (username,password) {
  return {
    type: Csts.LOGIN_REQUEST,
    payload:{
      username:username,
      password:password
    }
  }
}

export function loginSuccess (json) {
  return {
    type: Csts.LOGIN_SUCCESS,
    payload: json
  }
}

export function loginFailure (error) {
  return {
    type: Csts.LOGIN_FAILURE,
    payload: error
  }
}

/**
 * ## ResetPassword actions
 */
export function resetPasswordRequest (email) {
  return {
    type: Csts.RESET_PASSWORD_REQUEST,
    payload:email
  }
}

export function resetPasswordSuccess () {
  return {
    type: Csts.RESET_PASSWORD_SUCCESS
  }
}

export function resetPasswordFailure (error) {
  return {
    type: Csts.RESET_PASSWORD_FAILURE,
    payload: error
  }
}