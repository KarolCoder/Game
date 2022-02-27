/**
 * @format
 */

import * as React from 'react';
import {AppRegistry, StatusBar} from 'react-native';
import App from './App';
import {Provider as PaperProvider} from 'react-native-paper';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import {theme} from '@/theme';

export default function Main() {
  React.useEffect(() => {
    StatusBar.setBarStyle('light-content', true);
  }, []);
  return (
    <PaperProvider theme={theme}>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
