/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/'
console.disableYellowBox = true;
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);