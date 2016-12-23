/**
 * Register.js
 *
 * Allow user to register
 */
'use strict'

/**
 * The necessary React
 */
import React, {Component} from 'react'

const {
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
} = require('../lib/constants').default

/**
 * ## Imports
 *
 * Redux
 */
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

/**
 * The actions we need
 */
import * as authActions from '../reducers/auth/authActions'

/**
 *   LoginRender
 */
import LoginRender from '../components/LoginRender'

/**
 * ## Redux boilerplate
 */

function mapStateToProps (state) {
  return {
    auth: state.auth,
    global: state.global
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  }
}

function buttonPressHandler (signupRequest, username, email, password) {
  signupRequest(username, email, password)
}

/**
 * ### Translations
 */
var I18n = require('react-native-i18n')
import Translations from '../lib/Translations'
I18n.translations = Translations

class Register extends Component{
  constructor (props) {
    super(props)   
    this.onButtonPress = this.onButtonPress.bind(this)
  }

  onButtonPress(){
    this.props.actions.signupRequest(this.props.auth.form.fields.username,
                                     this.props.auth.form.fields.email,
                                     this.props.auth.form.fields.password)
  }

  render () {
    let loginButtonText = I18n.t('Register.register')  

    return (
      <LoginRender
        formType={REGISTER}
        loginButtonText={loginButtonText}
        onButtonPress={this.onButtonPress}
        displayPasswordCheckbox
        leftMessageType={FORGOT_PASSWORD}
        rightMessageType={LOGIN}
        auth={this.props.auth}
        global={this.props.global}
      />

    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Register)
