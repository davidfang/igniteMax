import { StackNavigator } from 'react-navigation'
import GridTableScreen from '../Containers/GridTableScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  GridTableScreen: { screen: GridTableScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'GridTableScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
