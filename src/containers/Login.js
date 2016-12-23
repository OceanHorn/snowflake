/**
 * # Login.js
 *
 *  The container to display the Login form
 *
 */
'use strict'

/**
 * The necessary React components
 */
import React, {Component} from 'react'

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

import Csts from '../lib/constants'
//LOGIN,REGISTER,FORGOT_PASSWORD
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

function buttonPressHandler (login, username, password) {
  login(username, password)
}

/**
 * ### Translations
 */
import I18n from 'react-native-i18n'
import Translations from '../lib/Translations'
I18n.translations = Translations

class Login extends Component{
  constructor (props) {
    super(props)   
    this.onButtonPress = this.onButtonPress.bind(this)  
  }
 
  onButtonPress(){
    this.props.actions.loginRequest(this.props.auth.form.fields.username,
                                    this.props.auth.form.fields.password)
  }

  render () {
    let loginButtonText = I18n.t('Login.login')   

    return (
      <LoginRender
        formType={Csts.LOGIN}
        loginButtonText={loginButtonText}
        onButtonPress={this.onButtonPress}
        displayPasswordCheckbox
        leftMessageType={Csts.REGISTER}
        rightMessageType={Csts.FORGOT_PASSWORD}
        auth={this.props.auth}
        global={this.props.global}
      />
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
