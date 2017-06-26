import { Platform } from 'react-native'
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';
registerScreens(); // this is where you register all of your app's screens

Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'EnterGoals',
      screen: 'FitnessTracker.EnterGoals', // this is a registered name for a screen
      icon: require('../img/goals.png'),
      //selectedIcon: require('../img/goals_selected.png'), // iOS only
      title: 'Enter Goals'
    },
    {
      label: 'Take Photo',
      screen: 'FitnessTracker.TakePhoto',
      icon: require('../img/photo.png'),
      //selectedIcon: require('../img/two_selected.png'), // iOS only
      title: 'Take Photo'
    }
  ]
});
