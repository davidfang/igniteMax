import { StackNavigator } from 'react-navigation'
import RowTableScreen from '../Containers/RowTableScreen'
import GridTableScreen from '../Containers/GridTableScreen'
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = StackNavigator({
  RowTableScreen: { screen: RowTableScreen },
  GridTableScreen: { screen: GridTableScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'RowTableScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default PrimaryNav
