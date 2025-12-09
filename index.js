// index.js
import 'react-native-get-random-values';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import SplashScreen from 'react-native-splash-screen';
import LoginScreen from './LoginScreen';
import App from './App';

AppRegistry.registerComponent(appName, () => {
  SplashScreen.hide();
  return App;
});
