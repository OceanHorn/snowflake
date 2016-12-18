/**
 * # configureStore.js
 *
 * A Redux boilerplate setup
 *
 */
'use strict'

import rootReducer from '../reducers'


import AuthInitialState from '../reducers/auth/authInitialState'
import DeviceInitialState from '../reducers/device/deviceInitialState'
import GlobalInitialState from '../reducers/global/globalInitialState'
import ProfileInitialState from '../reducers/profile/profileInitialState'

import authSaga from '../reducers/auth/authSaga'
import profileSaga from '../reducers/profile/profileSaga'
import rootSaga from '../rootSaga'


/**
 * ## Imports
 *
 * redux functions
 */
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createSagaMiddleware, { END } from 'redux-saga'


/**
 *
 * ## Initial state
 * Create instances for the keys of each structure in snowflake
 * @returns {Object} object with 4 keys
 */
function getInitialState () {
  const _initState = {
    auth: new AuthInitialState(),
    device: (new DeviceInitialState()),
    global: (new GlobalInitialState()),
    profile: new ProfileInitialState()
  }
  return _initState
}

/**
 * ## configureStore
 * @param {Object} the state with for keys:
 * device, global, auth, profile
 *
 */
export default function configureStore () {
  const sagaMiddleware = createSagaMiddleware()
  const enhancer = applyMiddleware(sagaMiddleware,thunk)
  const store =  createStore(rootReducer, getInitialState(), enhancer); 
  store.runSaga = sagaMiddleware.run(rootSaga)
  store.close = () => store.dispatch(END)
  return store
}

