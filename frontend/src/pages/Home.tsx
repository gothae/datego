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

function Home({navigation}) {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const code = useSelector((state: RootState) => state.user.code);

  // 유저의 정보 가져오는것
  // const user = auth().currentUser;
  const dispatch = useAppDispatch();

  async function onCheckButton() {
    const checkUser = async () => {
      const useremail = auth().currentUser?.email;
      const response = await axios.post('http://10.0.2.2:8080/users/info', {
        email: useremail,
        domain: 'GOOGLE',
        age: '20',
        gender: 'M',
      });
      console.log(response.data);
      console.log('가입완료!');
      return;
    };
    await checkUser();
    return;
  }

  async function onLogout() {
    const logoutUser = async () => {
      const response = await axios.post('http://10.0.2.2:8080/users/logout', {
        accessToken: accessToken,
      });
      dispatch(
        userSlice.actions.logoutUser({
          email: '',
          accessToken: '',
        }),
      );
      // 앱에서 로그아웃(자동로그인가능)
      auth().signOut();
      // 구글에서 Logout 재로그인해야한다.
      // GoogleSignin.signOut()
      console.log(response.data);
      console.log('로그아웃!');
      return;
    };
    await logoutUser();
    return;
  }

  const user = auth().currentUser;

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
            DATE GO(유저코드200)
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
          {/* <Image
              source={require('./src/assets/용산구.gif')}
              style={{width: '100%', height: '100%', backgroundColor: 'yellow'}}
              resizeMode="stretch"
            /> */}
        </View>
        <Button
          title="Go Preference"
          onPress={() => {
            navigation.navigate('Preference', {});
          }}
        />
        <View>
          <Text>{user?.displayName}</Text>
        </View>
      </View>
      <View>
        <Text>로그인됨</Text>
      </View>
      <View>
        <Button
          onPress={onLogout}
          title="로그아웃"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </>
  );

  // return (
  //   <>
  //     <View style={{flex: 1}}>
  //       <View
  //         style={{
  //           flex: 1,
  //           backgroundColor: 'orange',
  //           paddingHorizontal: 10,
  //           paddingVertical: 15,
  //           flexDirection: 'row',
  //         }}>
  //         <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>
  //           DATE GO(로그인 해야함.)
  //         </Text>
  //       </View>
  //       <View
  //         style={{
  //           flex: 1,
  //           flexDirection: 'row',
  //           paddingHorizontal: 10,
  //           paddingVertical: 20,
  //         }}>
  //         <Button
  //           title="Go Gallery"
  //           onPress={() => {
  //             navigation.navigate('Gallery', {});
  //           }}
  //         />
  //         <Button
  //           title="Go SelectDong"
  //           onPress={() => {
  //             navigation.navigate('SelectDong', {});
  //           }}
  //         />
  //       </View>
  //       <View style={{flex: 4}}>
  //         {/* <Image
  //           source={require('./src/assets/용산구.gif')}
  //           style={{width: '100%', height: '100%', backgroundColor: 'yellow'}}
  //           resizeMode="stretch"
  //         /> */}
  //       </View>
  //       <View>
  //         <Text>성별과 나이입력해야합니다.(유저코드201)</Text>
  //       </View>
  //       <Button
  //         title="Go Preference"
  //         onPress={() => {
  //           navigation.navigate('Preference', {});
  //         }}
  //       />
  //       <View>
  //         <Text>{user?.displayName}</Text>
  //       </View>
  //     </View>
  //     <View>
  //       <Button
  //         onPress={onCheckButton}
  //         title="로그인"
  //         color="#841584"
  //         accessibilityLabel="Learn more about this purple button"
  //       />
  //     </View>
  //   </>
  // );
}

export default Home;
