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
  Image,
} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import Gallery from './src/pages/Gallery';
import SelectDong from './src/pages/SelectDong';
import Preference from './src/pages/Preference';
import Course from './src/pages/Course';
import ChangeSpot from './src/pages/ChangeSpot';
import DetailSpot from './src/pages/DetailSpot';
import CourseIng from './src/pages/CourseIng';
import Youngsan from './src/assets/용산구.gif';

export type LoggeInParamList = {
  Gallery: undefined;
  SelectDong: undefined;
  Preference: undefined;
  Course: undefined;
  ChangeSpot: undefined;
  DetailSpot: undefined;
  CourseIng: undefined;
};

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

  const user = auth().currentUser;

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

  auth().onAuthStateChanged(currentuser => {
    if (currentuser) {
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
        <Text>{user?.displayName}</Text>
        <Text>{user?.email}</Text>
        <View>
          <TouchableHighlight onPress={onClick}>
            <Text style={{fontSize: 40}}>DATE GO</Text>
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
        </ImageBackground>
      </View>
    </>
  );
}

function HomeScreen({navigation}: HomeScreenProps) {
  const onClick = useCallback(() => {
    // auth().signOut();
    navigation.navigate('Login');
  }, [navigation]);
  // reaturn 내부 꾸미기 나중에
  return (
    <>
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'orange',
            paddingHorizontal: 10,
            paddingVertical: 15,
            flexDirection: 'row',
          }}>
          <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>
            DATE GO
          </Text>
          <TouchableHighlight onPress={onClick}>
            <Text>go login</Text>
          </TouchableHighlight>
          {/* <Text>Login페이지로 가기</Text> */}
          {/* 앱에서 로그아웃(자동로그인가능) */}
          <Button title="Logout" onPress={() => auth().signOut()} />
          {/* 구글에서 Logout 재로그인해야함. */}
          {/* <Button title="Logout" onPress={() => GoogleSignin.signOut()} /> */}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: 10,
            paddingVertical: 20,
          }}>
          <Button
            title="Go Gallery"
            onPress={() => {
              navigation.navigate('Gallery', {});
            }}
          />
          <Button
            title="Go SelectDong"
            onPress={() => {
              navigation.navigate('SelectDong', {});
            }}
          />
        </View>
        <View style={{flex: 4}}>
          <Image
            source={Youngsan}
            style={{width: '100%', height: '100%', backgroundColor: 'yellow'}}
            resizeMode="stretch"
          />
        </View>
        <Button
          title="Go Preference"
          onPress={() => {
            navigation.navigate('Preference', {});
          }}
        />
        {/* <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
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
        </View> */}
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
        <Stack.Screen
          name="Gallery"
          component={Gallery}
          options={{title: 'Gallery'}}
        />
        <Stack.Screen
          name="SelectDong"
          component={SelectDong}
          options={{title: 'SelectDong'}}
        />
        <Stack.Screen
          name="Preference"
          component={Preference}
          options={{title: 'Preference'}}
        />
        <Stack.Screen
          name="Course"
          component={Course}
          options={{title: 'Course'}}
        />
        <Stack.Screen
          name="ChangeSpot"
          component={ChangeSpot}
          options={{title: 'ChangeSpot'}}
        />
        <Stack.Screen
          name="DetailSpot"
          component={DetailSpot}
          options={{title: 'DetailSpot'}}
        />
        <Stack.Screen
          name="CourseIng"
          component={CourseIng}
          options={{title: 'CourseIng'}}
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
