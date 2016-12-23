'use strict'

import React,{Component} from 'react'

import {   
    StyleSheet,
    View,
    Text } from 'react-native'

 /**
 * ### icons
 *
 * Add icon support for use in Tabbar
 *
 */
import Icon from 'react-native-vector-icons/FontAwesome'

/**
 * ## TabIcon
 *
 * Displays the icon for the tab w/ color dependent upon selection
 */
export default class TabIcon extends Component {
  render () {
    var color = this.props.selected ? '#FF3366' : '#FFB3B3'
    return (
      <View style={{flex: 1, flexDirection: 'column', alignItems: 'center', alignSelf: 'center'}}>
        <Icon style={{color: color}} name={this.props.iconName} size={30} />
        <Text style={{color: color}}>{this.props.title}</Text>
      </View>
     )
  }
}