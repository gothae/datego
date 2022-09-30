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
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useEffect, useState} from 'react';
import axios from 'axios';
import userSlice from '../slices/user';
import {useAppDispatch} from '../store';
import {useSelector} from 'react-redux';
import {RootState} from '../../src/store/reducer';
import {logout} from '@react-native-seoul/kakao-login';

function Home({navigation}) {
  const myReviews = useSelector((state: RootState) => state.user.myReviews);
  const code = useSelector((state: RootState) => state.user.code);
  const email = useSelector((state: RootState) => state.user.email);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const domain = useSelector((state: RootState) => state.user.domain);
  const id = useSelector((state: RootState) => state.user.id);

  const dongReviewCnt = [0, 0, 0, 0, 0, 0, 0, 0];
  const [x, setX] = useState(-100);
  const [y, setY] = useState(-100);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const offset = 50;

  const setDongReviewCnt = () => {
    myReviews.map(review => {
      if (review['id'] === 1) dongReviewCnt[0] = review['count'];
      else if (review['id'] === 2) dongReviewCnt[1] = review['count'];
      else if (review['id'] === 3) dongReviewCnt[2] = review['count'];
      else if (review['id'] === 4) dongReviewCnt[3] = review['count'];
      else if (review['id'] === 5) dongReviewCnt[4] = review['count'];
      else if (6 <= review['id'] && review['id'] <= 9)
        dongReviewCnt[5] += review['count'];
      else if (10 <= review['id'] && review['id'] <= 17)
        dongReviewCnt[6] += review['count'];
      else dongReviewCnt[7] += review['count'];
    });
  };
  setDongReviewCnt();

  const clickDong = (select: number) => {
    navigation.navigate('Gallery', {dongId: select});
  };
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
  const dispatch = useAppDispatch();

  // 탈퇴함수
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
    console.log(response.data);
    console.log('회원탈퇴');
    return;
  }
  //로그아웃
  async function onLogout() {
    const response = await axios.post(
      'http://j7a104.p.ssafy.io:8080/users/logout',
      {
        // 내아이피 사용
        // const response = await axios.post('http://121.129.17.91/users/logout', {
        headers: {accessToken: accessToken},
      },
    );
    await logout();
    console.log('카카오로그아웃');
  }

  async function onLogout() {
    const response = await axios.post(
      'http://j7a104.p.ssafy.io:8080/users/logout',
      {
        // 내아이피 사용
        // const response = await axios.post('http://121.129.17.91/users/logout', {
        headers: {accessToken: accessToken},
      },
    );

    if (domain === 'GOOGLE') {
      await GoogleSignin.signOut();
      // 앱에서 로그아웃(자동로그인가능)
      // auth().signOut();
      // 구글에서 Logout 재로그인해야한다.
      console.log('구글로그아웃');
    }
    if (domain === 'KAKAO') {
      await logout();
      console.log('카카오로그아웃');
    }
    console.log(response.data);
    dispatch(
      userSlice.actions.logoutUser({
        email: '',
        accessToken: '',
        code: 0,
        domain: '',
      }),
    );

    return;
  }

  return (
    <>
      <View style={{flex: 1}}>
        <TouchableOpacity>
          <View
            style={
              styles(
                dongReviewCnt,
                offset,
                windowWidth * 0.64,
                windowHeight * 0.078,
              ).itaewon_1
            }>
            <Text
              onPress={() => clickDong(1)}
              style={
                styles(dongReviewCnt, offset, windowWidth, windowHeight).text
              }>
              이태원
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={
              styles(
                dongReviewCnt,
                offset,
                windowWidth * 0.58,
                windowHeight * 0.25,
              ).hannam_2
            }>
            <Text
              onPress={() => clickDong(2)}
              style={
                styles(dongReviewCnt, offset, windowWidth, windowHeight).text
              }>
              한남동
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={
              styles(
                dongReviewCnt,
                offset,
                windowWidth * 0.417,
                windowHeight * 0.125,
              ).yongsan_3
            }>
            <Text
              onPress={() => clickDong(3)}
              style={
                styles(dongReviewCnt, offset, windowWidth, windowHeight).text
              }>
              용산
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={
              styles(
                dongReviewCnt,
                offset,
                windowWidth * 0.333,
                windowHeight * 0.281,
              ).hangangro_4
            }>
            <Text
              onPress={() => clickDong(4)}
              style={
                styles(dongReviewCnt, offset, windowWidth, windowHeight).text
              }>
              한강로
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={
              styles(
                dongReviewCnt,
                offset,
                windowWidth * 0.208,
                windowHeight * 0.406,
              ).ichon_5
            }>
            <Text
              onPress={() => clickDong(5)}
              style={
                styles(dongReviewCnt, offset, windowWidth, windowHeight).text
              }>
              이촌동
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={
              styles(
                dongReviewCnt,
                offset,
                windowWidth * 0.625,
                windowHeight * 0.43,
              ).dongbingo_7
            }>
            <Text
              onPress={() => clickDong(7)}
              style={
                styles(dongReviewCnt, offset, windowWidth, windowHeight).text
              }>
              동빙고{'\n'}서빙고
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={
              styles(
                dongReviewCnt,
                offset,
                windowWidth * 0.056,
                windowHeight * 0.297,
              ).wonhyoro_10
            }>
            <Text
              onPress={() => clickDong(10)}
              style={
                styles(dongReviewCnt, offset, windowWidth, windowHeight).text
              }>
              원효로
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={
              styles(
                dongReviewCnt,
                offset,
                windowWidth * 0.056,
                windowHeight * 0.094,
              ).cheongpa_18
            }>
            <Text
              onPress={() => clickDong(18)}
              style={
                styles(dongReviewCnt, offset, windowWidth, windowHeight).text
              }>
              청파{'\n'}남영{'\n'}효창
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* 데이트할 동 선택 페이지로 이동 */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SelectDong', {offset: offset});
        }}
        style={styles([], 0, windowWidth, windowHeight).goBtn}>
        <Text style={{color: 'white', fontSize: 30, textAlign: 'center'}}>
          Go
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles([], 0, windowWidth, windowHeight).counrseInProcess}>
        <Text
          style={{
            color: '#FFA856',
            fontSize: 30,
            textAlign: 'center',
            fontWeight: 'bold',
          }}>
          진행중인 코스
        </Text>
      </TouchableOpacity>

      <View>
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
          onPress={() => {
            navigation.navigate('Ar1', {});
          }}
          title="돈줍기"
        />
        <Button
          onPress={() => {
            navigation.navigate('Ar2', {});
          }}
          title="돼지키우기"
        />
        <Button
          onPress={() => {
            navigation.navigate('Ar3', {});
          }}
          title="빨강이키우기"
          />
          <Button
          onPress={() => {
            navigation.navigate('CourseIng', {});
          }}
          title="진행중인 코스"
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
const bgColors = ['#FFFCF0', '#FFF5CD', '#FFE579', '#FFD629'];
const styles = (dongReviewCnt: any[], offset: number, l: number, t: number) =>
  StyleSheet.create({
    counrseInProcess: {
      position: 'absolute',
      top: t * 0.7,
      left: l * 0.25,
      width: l * 0.5,
      alignItems: 'center',
    },
    goBtn: {
      position: 'absolute',
      top: t * 0.6,
      left: l * 0.3,
      width: l * 0.4,
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 15,
      alignItems: 'center',
      backgroundColor: '#FFA856',
    },
    itaewon_1: {
      position: 'absolute',
      left: l,
      top: t - offset,
      backgroundColor: bgColors[dongReviewCnt[0] < 3 ? dongReviewCnt[0] : 3],
      width: 100,
      height: 100,
      borderRadius: 80,
    },
    hannam_2: {
      position: 'absolute',
      left: l,
      top: t - offset,
      backgroundColor: bgColors[dongReviewCnt[1] < 3 ? dongReviewCnt[1] : 3],
      width: 110,
      height: 110,
      borderRadius: 60,
    },
    yongsan_3: {
      position: 'absolute',
      left: l,
      top: t - offset,
      backgroundColor: bgColors[dongReviewCnt[2] < 3 ? dongReviewCnt[2] : 3],
      width: 70,
      height: 95,
      borderRadius: 50,
    },
    hangangro_4: {
      position: 'absolute',
      left: l,
      top: t - offset,
      backgroundColor: bgColors[dongReviewCnt[3] < 3 ? dongReviewCnt[3] : 3],
      width: 80,
      height: 70,
      borderRadius: 60,
    },
    ichon_5: {
      position: 'absolute',
      left: l,
      top: t - offset,
      backgroundColor: bgColors[dongReviewCnt[4] < 3 ? dongReviewCnt[4] : 3],
      width: 140,
      height: 120,
      borderRadius: 60,
    },
    dongbingo_7: {
      position: 'absolute',
      left: l,
      top: t - offset,
      backgroundColor: bgColors[dongReviewCnt[5] < 3 ? dongReviewCnt[5] : 3],
      width: 80,
      height: 80,
      borderRadius: 60,
    },
    wonhyoro_10: {
      position: 'absolute',
      left: l,
      top: t - offset,
      backgroundColor: bgColors[dongReviewCnt[6] < 3 ? dongReviewCnt[6] : 3],
      width: 90,
      height: 90,
      borderRadius: 60,
    },
    cheongpa_18: {
      position: 'absolute',
      left: l,
      top: t - offset,
      backgroundColor: bgColors[dongReviewCnt[7] < 3 ? dongReviewCnt[7] : 3],
      width: 120,
      height: 120,
      borderRadius: 60,
    },
    text: {
      flex: 1,
      fontSize: 12,
      fontWeight: 'bold',
      textAlign: 'center',
      justifyContent: 'center',
    },
  });
export default Home;
