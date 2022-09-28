import * as React from 'react';
import {useEffect} from 'react';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import AppInner from './AppInner';
import store from './src/store';
import {Provider} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

function App() {
  useEffect(() => {
    try {
      setTimeout(() => {
        SplashScreen.hide();
      }, 500);
    } catch (e) {
      console.log(e.message);
    }
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
