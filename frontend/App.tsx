import * as React from 'react';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Button,
} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
};
type LoginScreenProps = NativeStackScreenProps<RootStackParamList>;
type HomeScreenProps = NativeStackScreenProps<ParamListBase>;

function LoginScreen({navigation}: LoginScreenProps) {
  const image = {
    uri: 'https://blog.kakaocdn.net/dn/xIoxp/btrB5V8Gf2a/LMWasLuAC6tkdo8hauzm10/img.jpg',
  };

  const checkuser = auth().currentUser;

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '18642094345-6ok4m4de04aukci5sdl5vkqranqtbbuf.apps.googleusercontent.com',
    });
  }, []);

  async function onGoogleButtonPress() {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  }

  const [loggedIn, setLoggedIn] = useState(false);

  auth().onAuthStateChanged(user => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  const onClick = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  if (loggedIn) {
    return (
      <View>
        <Text>{checkuser?.displayName}</Text>
        <Text>{checkuser?.email}</Text>
        <View>
          <Button title="Logout" onPress={() => auth().signOut()} />
          <Button title="Logout" onPress={() => GoogleSignin.signOut()} />
        </View>
        <View>
          <TouchableHighlight onPress={onClick}>
            <Text style={{fontSize: 40, color: 'white'}}>DATE GO</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  return (
    <>
      <View style={{flex: 1}}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View
            style={{
              flex: 6,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableHighlight onPress={onClick}>
              <Text style={{fontSize: 40, color: 'white'}}>DATE GO</Text>
            </TouchableHighlight>
          </View>
          <View>
            <Text style={{color: 'white'}}>Login Page</Text>
            <GoogleSigninButton onPress={onGoogleButtonPress} />
          </View>
          <View>
            <Text>{checkuser?.displayName}</Text>
            <Text>{checkuser?.email}</Text>
          </View>
        </ImageBackground>
      </View>
    </>
  );
}

function HomeScreen({navigation}: HomeScreenProps) {
  const onClick = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  return (
    <>
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'orange',
            paddingHorizontal: 10,
            paddingVertical: 15,
          }}>
          <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>
            DATE GO
            <TouchableHighlight onPress={onClick}>
              <Text>Login페이지로 가기</Text>
            </TouchableHighlight>
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: 10,
            paddingVertical: 20,
          }}>
          <View
            style={{
              width: '25%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'orange',
              borderRadius: 20,
            }}>
            <Text
              style={{
                fontSize: 20,
                color: 'white',
                borderRadius: 20,
              }}>
              서울
            </Text>
          </View>
        </View>
        <View style={{flex: 4}}>
          <Text>map</Text>
        </View>
        <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              backgroundColor: 'orange',
              color: 'white',
              paddingHorizontal: 45,
              paddingVertical: 15,
              borderRadius: 25,
              fontSize: 40,
            }}>
            GO
          </Text>
        </View>
        <View
          style={{
            flex: 2,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'orange', fontSize: 30, fontWeight: 'bold'}}>
            진행중인 코스
          </Text>
          <Text>!!</Text>
        </View>
      </View>
    </>
  );
}

const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{title: 'Login', headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Home', headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});

export default App;
