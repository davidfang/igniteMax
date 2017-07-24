import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { StackNavigator, addNavigationHelpers } from 'react-navigation'
import CaptchaScreen from '../Containers/CaptchaScreen'
import LoginScreen from '../Containers/LoginScreen'
import RowTableScreen from '../Containers/RowTableScreen'
import GridTableScreen from '../Containers/GridTableScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
export const PrimaryNav = StackNavigator({
  CaptchaScreen: { screen: CaptchaScreen },
  LoginScreen: { screen: LoginScreen },
  RowTableScreen: { screen: RowTableScreen },
  GridTableScreen: { screen: GridTableScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'CaptchaScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav

/*
const Navigation = ({ dispatch, navigation }) => {
  return (
    <PrimaryNav
      navigation={addNavigationHelpers({ dispatch, state: navigation })}
    />
  )
}

Navigation.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    navigation: state.navigation
  }
}

// export default PrimaryNav
export default connect(mapStateToProps)(Navigation)
*/
