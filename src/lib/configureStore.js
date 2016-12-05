/**
 * # configureStore.js
 *
 * A Redux boilerplate setup
 *
 */
'use strict'

/**
 * ## Imports
 *
 * redux functions
 */
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

/**
* ## Reducer
* The reducer contains the 4 reducers from
* device, global, auth, profile
*/
import rootReducer from '../reducers'

//import DevTools from '../containers/DevTools';

/**
 * ## States
 * Snowflake explicitly defines initial state
 *
 */
import AuthInitialState from '../reducers/auth/authInitialState'
import DeviceInitialState from '../reducers/device/deviceInitialState'
import GlobalInitialState from '../reducers/global/globalInitialState'
import ProfileInitialState from '../reducers/profile/profileInitialState'

/**
 * ## creatStoreWithMiddleware
 * Like the name...
 */
const enhancer = applyMiddleware(thunk)

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
  
  return createStore(rootReducer, getInitialState(), enhancer);

}
