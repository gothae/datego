import * as React from 'react';
import {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {View, Text} from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

function SignUp() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '814546297284-scqfjqv8mqi9ga58ajmb0ic22f9q9i5o.apps.googleusercontent.com',
    });
  }, []);

  async function onGoogleButtonPress() {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  }

  const [isLoggedIn, setLoggedIn] = useState(false);

  auth().onAuthStateChanged(user => {
    if (user) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  });

  if (isLoggedIn) {
    <View>
      <Text>로그인완료</Text>
    </View>;
  }

  return (
    <View>
      <Text>회원가입</Text>
      <GoogleSigninButton onPress={onGoogleButtonPress} />
    </View>
  );
}

export default SignUp;
