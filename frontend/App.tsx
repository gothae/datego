import * as React from 'react';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import AppInner from './AppInner';
import store from './src/store';
import {Provider} from 'react-redux';
import {PermissionsAndroid} from 'react-native';

import {LogBox} from 'react-native';
// LogBox.ignoreLogs([
//   'onCameraChange',
//   'Cannot connect to Metro',
//   'ComponentWillMount has beeen renamed, and is not recommended for use.',
//   'source.uri should not be an empty string',
// ]);
LogBox.ignoreAllLogs();
function App() {
  async function setPermissions() {
    console.log('허용받아볼게요');
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      const granted2 = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      );
      const granted3 = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      console.log(granted);
      console.log(granted2);
      console.log(granted3);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('위치허용됨.');
      }
      if (granted2 === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('코스허용됨.');
      }
      if (granted3 === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('카메라허용됨.');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  React.useEffect(() => {
    setPermissions();
  });
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppInner />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
