import { Navigation } from 'react-native-navigation';

import EnterGoals from './EnterGoals';
import TakePhoto from './TakePhoto';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('FitnessTracker.EnterGoals', () => EnterGoals);
  Navigation.registerComponent('TakePhoto', () => TakePhoto);
}