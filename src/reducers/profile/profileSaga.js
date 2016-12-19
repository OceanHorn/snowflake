'use strict'

import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'

import BackendFactory from '../../lib/BackendFactory'
import { appAuthToken } from '../../lib/AppAuthToken'
import * as profileActions from './profileActions'

import Csts from '../../lib/constants'

/**
 * ## State actions
 * controls which form is displayed to the user
 * as in login, register, logout or reset password
 */
function* getProfile(action) {
    try {        
        const token = yield call(appAuthToken.getSessionToken, action.payload.sessionToken)       
        const json = yield call(BackendFactory(token).getProfile)       
        yield put(profileActions.getProfileSuccess(json))
    } catch (error) {
        yield put(profileActions.getProfileFailure(error))
    }
}

/**
 * ## updateProfile
 * @param {string} userId -  objectId
 * @param {string} username - the users name
 * @param {string] email - user's email
 * @param {Object} sessionToken - the sessionToken
 *
 * The sessionToken is provided when Hot Loading.
 *
 * With the sessionToken, the server is called with the data to update
 * If successful, get the profile so that the screen is updated with
 * the data as now persisted on the serverx
 * userId, username, email, sessionToken
 */
function* profileUpdate(action) {
    try {
        const token = yield call(appAuthToken.getSessionToken)
        yield call(BackendFactory(token).updateProfile, action.payload.userId,
            {
                username: action.payload.username,
                email: action.payload.email
            }
        )
        yield put(profileActions.profileUpdateSuccess())
        yield put(profileActions.getProfileRequest())
    } catch (error) {
        yield put(profileActions.profileUpdateFailure(error))
    }

}


export default function* watchProfile() {   
    yield [
        yield takeEvery(Csts.GET_PROFILE_REQUEST, getProfile),
        yield takeEvery(Csts.PROFILE_UPDATE_REQUEST, profileUpdate)
    ]
}