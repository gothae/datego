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
import axios from 'axios';
import userSlice from '../slices/user';
import {useAppDispatch} from '../store';
import {useSelector} from 'react-redux';
import {RootState} from '../../src/store/reducer';
import {logout} from '@react-native-seoul/kakao-login';

function Home({navigation}) {
  const code = useSelector((state: RootState) => state.user.code);
  const email = useSelector((state: RootState) => state.user.email);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const domain = useSelector((state: RootState) => state.user.domain);
  const id = useSelector((state: RootState) => state.user.id);

  useEffect(() => {
    const getMyReviews = async () => {
      const res = await axios.get('http://j7a104.p.ssafy.io:8080/main', {
        headers: {accessToken},
      });
      dispatch(
        userSlice.actions.setUserReviews({
          reviews: res.data.responseData,
        }),
      );
    };
    getMyReviews();
  }, []);
  // 유저의 정보 가져오는것
  const user = auth().currentUser;
  const dispatch = useAppDispatch();

  async function onDelete() {
    const response = await axios.post(
      'http://j7a104.p.ssafy.io:8080/users/signout',
      {},
      {
        headers: {accessToken: accessToken},
      },
    );
    dispatch(
      userSlice.actions.deleteUser({
        email: '',
        accessToken: '',
        code: 0,
        id: 0,
      }),
    );
    GoogleSignin.signOut();
    console.log(response.data);
    console.log('회원탈퇴');
    return;
  }
  async function testLogout() {
    const response = await axios.post('http://j7a104.p.ssafy.io:8080/users/logout', {
      // 내아이피 사용
      // const response = await axios.post('http://121.129.17.91/users/logout', {
      headers: {accessToken: accessToken},
    });
    console.log('마스터로그아웃');
    console.log(response.data);
    dispatch(
      userSlice.actions.logoutUser({
        email: '',
        accessToken: '',
        code: 0,
        domain: '',
        id: 0,
      }),
    );
    return;
  }

  async function onLogout() {
    const response = await axios.post('http://j7a104.p.ssafy.io:8080/users/logout', {
      // 내아이피 사용
      // const response = await axios.post('http://121.129.17.91/users/logout', {
      headers: {accessToken: accessToken},
    });
    await logout();
    console.log('카카오로그아웃');
    console.log(response.data);
    dispatch(
      userSlice.actions.logoutUser({
        email: '',
        accessToken: '',
        code: 0,
        domain: '',
        id: 0,
      }),
    );

    return;
  }

  return (
    <>
      <View style={{flex: 1}}>
        <Button
          onPress={testLogout}
          title="마스터로그아웃"
          color="black"
          accessibilityLabel="Learn more about this purple button"
        />
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
            source={require('../../src/assets/용산구.gif')}
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
      </View>

      <View>
        <Button
          onPress={onLogout}
          title="로그아웃"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
      <View>
        <Button
          onPress={onDelete}
          title="회원탈퇴"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </>
  );
}

export default Home;
