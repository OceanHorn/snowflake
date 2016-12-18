'use strict'

import { fork } from 'redux-saga/effects'
import Csts from './lib/constants'
import watchAuth from './reducers/auth/authSaga' 
import watchProfile from './reducers/profile/profileSaga' 

// single entry point to start all Sagas at once
export default function* rootSaga() { 
  yield [
    fork(watchAuth),
    fork(watchProfile)
  ]
}