import * as React from 'react';
import {View, Text, ImageBackground, StyleSheet, Button} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../AppInner';
import {useCallback, useEffect, useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';
import {useSelector} from 'react-redux';
import {RootState} from '../../src/store/reducer';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignIn({navigation}: SignInScreenProps) {
  const image = {
    uri: 'https://blog.kakaocdn.net/dn/xIoxp/btrB5V8Gf2a/LMWasLuAC6tkdo8hauzm10/img.jpg',
  };
  const code = useSelector((state: RootState) => state.user.code);
  const email = useSelector((state: RootState) => state.user.email);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  const dispatch = useAppDispatch();
  // 유저의 정보 가져오는것
  // const user = auth().currentUser;

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '18642094345-6ok4m4de04aukci5sdl5vkqranqtbbuf.apps.googleusercontent.com',
    });
  }, []);

  async function onGoogleButtonPress() {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    await auth().signInWithCredential(googleCredential);
    const checkUser = async () => {
      const useremail = auth().currentUser?.email;
      const response = await axios.post('http://10.0.2.2:8080/users/login', {
        email: useremail,
        domain: 'GOOGLE',
      });
      console.log(
        '코드가 201이면 백에 가입되어있지 않음(성별, 나이입력필요), 200이면 가입되어있음.',
      );
      dispatch(
        userSlice.actions.setUser({
          email: useremail,
          accessToken: response.data.responseData.accessToken,
          code: response.data.code,
        }),
      );
      return;
    };
    await checkUser();

    return;
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
            <Text style={{fontSize: 40, color: 'white'}}>DATE GO</Text>
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
export default SignIn;
