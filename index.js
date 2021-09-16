import { AppRegistry, Platform } from 'react-native';
import App from './App';

AppRegistry.registerComponent('A7Cart_ui', () => App);

if (Platform.OS === 'web') {
  const rootTag = document.getElementById('root') || document.getElementById('main');
  AppRegistry.runApplication('A7Cart_ui', { rootTag });
}
