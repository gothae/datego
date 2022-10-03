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
import {useEffect, useCallback} from 'react';
import axios from 'axios';
import userSlice from '../slices/user';
import {useAppDispatch} from '../store';
import {useSelector} from 'react-redux';
import {RootState} from '../../src/store/reducer';
import {logout} from '@react-native-seoul/kakao-login';
import {launchCamera} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

function Home({navigation}) {
  const myReviews = useSelector((state: RootState) => state.user.myReviews);
  const code = useSelector((state: RootState) => state.user.code);
  const email = useSelector((state: RootState) => state.user.email);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const domain = useSelector((state: RootState) => state.user.domain);
  const id = useSelector((state: RootState) => state.user.id);

  const imageSrc = {
    // uri: 'https://cdn.pixabay.com/photo/2015/08/17/18/23/balloons-892806__340.jpg', //풍선
    uri: 'https://cdn.pixabay.com/photo/2015/01/29/16/34/mothers-day-616363_960_720.jpg', //거의 흰 배경
  };

  const dongReviewCnt = [0, 0, 0, 0, 0, 0, 0, 0];
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

  const takePicture = async () => {
    const userSpotId = 149;
    const result = await launchCamera({
      mediaType: 'photo',
      saveToPhotos: true,
      quality: 0.5,
      // includeBase64: true,
    });
    if (result.didCancel) {
      //사진찍기 취소한 경우
      return null;
    }

    const localUri = result.assets[0].uri; // file://~~~.jpg
    const filename = result.assets[0].fileName;
    const photo = {
      uri: localUri,
      type: 'multipart/form-data',
      name: filename,
    };
    const formData = new FormData();
    formData.append('photo', photo);

    await axios
      .post(
        `http://j7a104.p.ssafy.io:8080/courses/photo/${userSpotId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            accessToken,
          },
        },
      )
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
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

  // async function onLogout() {
  //   const response = await axios.post(
  //     'http://j7a104.p.ssafy.io:8080/users/logout',
  //     {
  //       // 내아이피 사용
  //       // const response = await axios.post('http://121.129.17.91/users/logout', {
  //       headers: {accessToken: accessToken},
  //     },
  //   );

  //   if (domain === 'GOOGLE') {
  //     await GoogleSignin.signOut();
  //     // 앱에서 로그아웃(자동로그인가능)
  //     // auth().signOut();
  //     // 구글에서 Logout 재로그인해야한다.
  //     console.log('구글로그아웃');
  //   }
  //   if (domain === 'KAKAO') {
  //     await logout();
  //     console.log('카카오로그아웃');
  //   }
  //   console.log(response.data);
  //   dispatch(
  //     userSlice.actions.logoutUser({
  //       email: '',
  //       accessToken: '',
  //       code: 0,
  //       domain: '',
  //     }),
  //   );

  //   return;
  // }

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={imageSrc}
        resizeMode="cover"
        style={{flex: 1, justifyContent: 'center'}}>
        <View style={{flex: 1}}>
          <TouchableOpacity>
            <View
              style={[
                styles(
                  dongReviewCnt,
                  offset,
                  windowWidth * 0.64,
                  windowHeight * 0.15,
                ).itaewon_1,
                styles([], 0, 0, 0).shadow,
              ]}>
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
              style={[
                styles(
                  dongReviewCnt,
                  offset,
                  windowWidth * 0.6,
                  windowHeight * 0.3,
                ).hannam_2,
                styles([], 0, 0, 0).shadow,
              ]}>
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
              style={[
                styles(
                  dongReviewCnt,
                  offset,
                  windowWidth * 0.41,
                  windowHeight * 0.225,
                ).yongsan_3,
                styles([], 0, 0, 0).shadow,
              ]}>
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
              style={[
                styles(
                  dongReviewCnt,
                  offset,
                  windowWidth * 0.333,
                  windowHeight * 0.37,
                ).hangangro_4,
                styles([], 0, 0, 0).shadow,
              ]}>
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
              style={[
                styles(
                  dongReviewCnt,
                  offset,
                  windowWidth * 0.1,
                  windowHeight * 0.456,
                ).ichon_5,
                styles([], 0, 0, 0).shadow,
              ]}>
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
              style={[
                styles(
                  dongReviewCnt,
                  offset,
                  windowWidth * 0.59,
                  windowHeight * 0.46,
                ).dongbingo_7,
                styles([], 0, 0, 0).shadow,
              ]}>
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
              style={[
                styles(
                  dongReviewCnt,
                  offset,
                  windowWidth * 0.05,
                  windowHeight * 0.285,
                ).wonhyoro_10,
                styles([], 0, 0, 0).shadow,
              ]}>
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
              style={[
                styles(
                  dongReviewCnt,
                  offset,
                  windowWidth * 0.076,
                  windowHeight * 0.114,
                ).cheongpa_18,
                styles([], 0, 0, 0).shadow,
              ]}>
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

        {/* <View>
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
          <Button
            onPress={() => {
              takePicture();
            }}
            title="사진찍기"
          />
        </View> */}
      </ImageBackground>
    </View>
  );
}
const bgColors = ['#FDFDFD', '#FFE4E4', '#FFA7A6', '#FF899D'];
const styles = (dongReviewCnt: any[], offset: number, l: number, t: number) =>
  StyleSheet.create({
    shadow: {
      shadowColor: '#171717',
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 20,
    },
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
      width: 120,
      height: 120,
      borderRadius: 80,
      justifyContent: 'center',
    },
    hannam_2: {
      position: 'absolute',
      left: l,
      top: t - offset,
      backgroundColor: bgColors[dongReviewCnt[1] < 3 ? dongReviewCnt[1] : 3],
      width: 140,
      height: 140,
      borderRadius: 70,
      justifyContent: 'center',
    },
    yongsan_3: {
      position: 'absolute',
      left: l,
      top: t - offset,
      backgroundColor: bgColors[dongReviewCnt[2] < 3 ? dongReviewCnt[2] : 3],
      width: 90,
      height: 110,
      borderRadius: 50,
      justifyContent: 'center',
    },
    hangangro_4: {
      position: 'absolute',
      left: l,
      top: t - offset,
      backgroundColor: bgColors[dongReviewCnt[3] < 3 ? dongReviewCnt[3] : 3],
      width: 100,
      height: 70,
      borderRadius: 50,
      justifyContent: 'center',
    },
    ichon_5: {
      position: 'absolute',
      left: l,
      top: t - offset,
      backgroundColor: bgColors[dongReviewCnt[4] < 3 ? dongReviewCnt[4] : 3],
      width: 190,
      height: 140,
      borderRadius: 100,
      justifyContent: 'center',
    },
    dongbingo_7: {
      position: 'absolute',
      left: l,
      top: t - offset,
      backgroundColor: bgColors[dongReviewCnt[5] < 3 ? dongReviewCnt[5] : 3],
      width: 120,
      height: 120,
      borderRadius: 60,
      justifyContent: 'center',
    },
    wonhyoro_10: {
      position: 'absolute',
      left: l,
      top: t - offset,
      backgroundColor: bgColors[dongReviewCnt[6] < 3 ? dongReviewCnt[6] : 3],
      width: 130,
      height: 110,
      borderRadius: 60,
      justifyContent: 'center',
    },
    cheongpa_18: {
      position: 'absolute',
      left: l,
      top: t - offset,
      backgroundColor: bgColors[dongReviewCnt[7] < 3 ? dongReviewCnt[7] : 3],
      width: 150,
      height: 150,
      borderRadius: 70,
      justifyContent: 'center',
    },
    text: {
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
export default Home;
