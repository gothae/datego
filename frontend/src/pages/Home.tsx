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
  Pressable,
} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import userSlice from '../slices/user';
import {useAppDispatch} from '../store';
import {useSelector} from 'react-redux';
import {RootState} from '../../src/store/reducer';
import {logout} from '@react-native-seoul/kakao-login';
import SelectDong from './SelectDong';

function Home({navigation}) {
  const code = useSelector((state: RootState) => state.user.code);
  const email = useSelector((state: RootState) => state.user.email);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const domain = useSelector((state: RootState) => state.user.domain);
  const id = useSelector((state: RootState) => state.user.id);

  const [dong, setDong] = useState(0);
  const getDong = select => {
    setDong(select);
  };

  useEffect(() => {
    const getMyReviews = async () => {
      const res = await axios.get('http://10.0.2.2:8080/main', {
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
  const dispatch = useAppDispatch();

  // 탈퇴함수
  async function onDelete() {
    const response = await axios.post(
      'http://10.0.2.2:8080/users/signout',
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
  //로그아웃
  async function onLogout() {
    const response = await axios.post('http://10.0.2.2:8080/users/logout', {
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
        <View>
          <SelectDong offset={60} getDong={getDong} />
        </View>
      </View>
      <View style={styles.goBtn}>
        <Pressable
          onPress={() => {
            navigation.navigate('Gallery', dong);
          }}>
          <Text style={{color: 'white', fontSize: 30}}>Go Go</Text>
        </Pressable>
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
const styles = StyleSheet.create({
  goBtn: {
    width: '40%',
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: '#FFA856',
  },
});
export default Home;
