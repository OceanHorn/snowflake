'use strict'

import React from 'react'

import {   
    StyleSheet,
    View,
    Text } from 'react-native'
 

import {Actions, Scene} from 'react-native-router-flux';

/**
 * ### Translations
 */
import I18n from 'react-native-i18n'

// Support fallbacks so en-US & en-BR both use en
I18n.fallbacks = true

import Translations from './lib/Translations'
I18n.translations = Translations

/**
 * ### containers
 *
 * All the top level containers
 *
 */
import App from './containers/App'
import Login from './containers/Login'
import Logout from './containers/Logout'
import Register from './containers/Register'
import ForgotPassword from './containers/ForgotPassword'
import Profile from './containers/Profile'
import Main from './containers/Main'
import Subview from './containers/Subview'

import TabIcon from './components/TabIcon'

const styles = StyleSheet.create({
  tabBar: {
    height: 70
  }
})

const scenes = Actions.create(
    <Scene key='root' hideNavBar>
        <Scene key='App'
            component={App}
            type='replace'
            initial={true} />

        <Scene key='Login'
            component={Login}
            type='replace' />

        <Scene key='InitialLoginForm'
            component={Register}
            type='replace' /> 

        <Scene key='Register'
            component={Register}
            type='replace' />

        <Scene key='ForgotPassword'
            component={ForgotPassword}
            type='replace' />

        <Scene key='Subview'
            component={Subview} />

        <Scene key='Tabbar'
            tabs
            hideNavBar
            tabBarStyle={styles.tabBar}
            default='Main'>

            <Scene key='Logout'
                title={I18n.t('Snowflake.logout')}
                icon={TabIcon}
                iconName={'sign-out'}
                hideNavBar
                component={Logout} />

            <Scene key='Main'
                title={I18n.t('Snowflake.main')}
                iconName={'home'}
                icon={TabIcon}
                hideNavBar
                component={Main}
                initial />

            <Scene key='Profile'
                title={I18n.t('Snowflake.profile')}
                icon={TabIcon}
                iconName={'gear'}
                hideNavBar
                component={Profile} />
        </Scene>
    </Scene>
);

export default scenes