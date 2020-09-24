/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json'; 
import PaymentScreen from './js/containers/PaymentScreen';

AppRegistry.registerComponent(appName, () => PaymentScreen);
