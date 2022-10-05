import * as React from 'react';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import AppInner from './AppInner';
import store from './src/store';
import {Provider} from 'react-redux';
import {LogBox} from 'react-native';
// LogBox.ignoreLogs([
//   'onCameraChange',
//   'Cannot connect to Metro',
//   'ComponentWillMount has beeen renamed, and is not recommended for use.',
//   'source.uri should not be an empty string',
// ]);
LogBox.ignoreAllLogs();
function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppInner />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
