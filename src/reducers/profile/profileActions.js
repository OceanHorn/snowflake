/**
 * # profileActions.js
 *
 * The actions to support the users profile
 */
'use strict'
/**
 * ## Imports
 *
 * The actions for profile
 */
const {
  GET_PROFILE_REQUEST,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAILURE,

  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAILURE,

  ON_PROFILE_FORM_FIELD_CHANGE
} = require('../../lib/constants').default

/**
 * BackendFactory - base class for server implementation
 * AppAuthToken for localStorage sessionToken access
 */
const BackendFactory = require('../../lib/BackendFactory').default
import {appAuthToken} from '../../lib/AppAuthToken'

/**
 * ## retreiving profile actions
 */
export function getProfileRequest (sessionToken) {
  return {
    type: GET_PROFILE_REQUEST,
    payload:{sessionToken:sessionToken}
  }
}
export function getProfileSuccess (json) {
  return {
    type: GET_PROFILE_SUCCESS,
    payload: json
  }
}
export function getProfileFailure (json) {
  return {
    type: GET_PROFILE_FAILURE,
    payload: json
  }
}

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 * this.props.profile.form.originalProfile.objectId,
        this.props.profile.form.fields.username,
        this.props.profile.form.fields.email,
        this.props.global.currentUser
 */
export function profileUpdateRequest (objectId,username,email,currentUser) {
  return {
    type: PROFILE_UPDATE_REQUEST,
    payload:{
      userId:objectId,
      username:username,
      email:email,
      currentUser:currentUser
    }
  }
}
export function profileUpdateSuccess () {
  return {
    type: PROFILE_UPDATE_SUCCESS
  }
}
export function profileUpdateFailure (json) {
  return {
    type: PROFILE_UPDATE_FAILURE,
    payload: json
  }
}

/**
 * ## onProfileFormFieldChange
 *
 */
export function onProfileFormFieldChange (field, value) {
  return {
    type: ON_PROFILE_FORM_FIELD_CHANGE,
    payload: {field: field, value: value}
  }
}
