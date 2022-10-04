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
  Image,
} from 'react-native';
import {useEffect} from 'react';
import axios from 'axios';
import userSlice from '../slices/user';
import {useAppDispatch} from '../store';
import {useSelector} from 'react-redux';
import {RootState} from '../../src/store/reducer';
import {logout} from '@react-native-seoul/kakao-login';
import {launchCamera} from 'react-native-image-picker';

function Home({navigation}) {
  const myReviews = useSelector((state: RootState) => state.user.myReviews);
  const code = useSelector((state: RootState) => state.user.code);
  const email = useSelector((state: RootState) => state.user.email);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const domain = useSelector((state: RootState) => state.user.domain);
  const id = useSelector((state: RootState) => state.user.id);

  const dongReviewCnt = [0, 0, 0, 0, 0, 0, 0, 0];
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const offset = 50;

  const setDongReviewCnt = () => {
    myReviews.map(review => {
      if (review.id === 1) {
        dongReviewCnt[0] = review.count;
      } else if (review.id === 2) {
        dongReviewCnt[1] = review.count;
      } else if (review.id === 3) {
        dongReviewCnt[2] = review.count;
      } else if (review.id === 4) {
        dongReviewCnt[3] = review.count;
      } else if (review.id === 5) {
        dongReviewCnt[4] = review.count;
      } else if (review.id >= 6 && review.id <= 9) {
        dongReviewCnt[5] += review.count;
      } else if (review.id >= 10 && review.id <= 17) {
        dongReviewCnt[6] += review.count;
      } else {
        dongReviewCnt[7] += review.count;
      }
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

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, flexDirection: 'row', alignItems:'center'}}>
        <TouchableOpacity style={{flex:1, alignItems:'center'}}>
          <Image
            source={{
              uri: 'https://user-images.githubusercontent.com/66546079/193845296-69d3618a-e5ba-46c6-99bd-0a2c891fa789.png',
            }}
            style={styles.cheongpa_18}></Image>
          <Text style={styles.text}>
            청파{'\n'}남영{'\n'}효창
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flex:1, alignItems:'center', marginTop: '8%', marginRight: '8%'}}>
          <Image
            source={{
              uri: 'https://user-images.githubusercontent.com/66546079/193848026-58edaadd-35c1-4c0f-b920-50ed41751a43.png',
            }}
            style={styles.itaewon_1}></Image>
          <Text style={styles.text}>이태원</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, flexDirection: 'row', alignItems:'center'}}>
        <TouchableOpacity style={{flex:1, alignItems:'center', marginBottom: '15%', marginRight: '8%'}}>
          <Image
            source={{
              uri: 'https://user-images.githubusercontent.com/66546079/193843990-59905ede-2b48-46ea-bf80-2001e3ee0b58.png',
            }}
            style={styles.yongsan_3}></Image>
          <Text style={styles.text}>용산동</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, flexDirection: 'row', position:'relative', bottom: '5%'}}>
        <TouchableOpacity style={{flex:1, alignItems:'center', marginBottom: '5%', marginRight: '10%'}}>
          <Image
            source={{
              uri: 'https://user-images.githubusercontent.com/66546079/193846268-0ba53d6e-f25a-40d2-8236-b3b7b5b64972.png',
            }}
            style={styles.wonhyoro_10}></Image>
          <Text style={styles.text}>원효로</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flex:1, alignItems:'center', marginLeft: '10%'}}>
          <Image
            source={{
              uri: 'https://user-images.githubusercontent.com/66546079/193842872-d78d057b-d09f-4953-8a04-7f201d78b48a.png',
            }}
            style={styles.hannam_2}></Image>
          <Text style={styles.text}>한남동</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, flexDirection: 'row', position:'relative', bottom: '10%'}}>
        <TouchableOpacity style={{flex:1, alignItems:'center', marginBottom: '20%', marginRight: '8%'}}>
          <Image
            source={{
              uri: 'https://user-images.githubusercontent.com/66546079/193844402-37576296-b6e0-4895-a344-96108661ce47.png',
            }}
            style={styles.hangangro_4}></Image>
          <Text style={styles.text}>한강로</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 1, flexDirection: 'row', position:'relative', bottom: '20%'}}>
        <TouchableOpacity style={{flex:1, alignItems:'center', marginBottom: '8%', marginRight: '8%'}}>
          <Image
            source={{
              uri: 'https://user-images.githubusercontent.com/66546079/193846926-3cb410f8-02d0-4461-8f92-f22e03e21dcf.png',
            }}
            style={styles.ichon_5}></Image>
          <Text style={styles.text}>이촌동</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{flex:1, alignItems:'center', marginBottom: '8%', marginLeft: '8%'}}>
          <Image
            source={{
              uri: 'https://user-images.githubusercontent.com/66546079/193843300-3ed58ebe-fbb7-47a7-b5ea-10e01004e64b.png',
            }}
            style={styles.dongbingo_7}></Image>
          <Text style={styles.text}>동빙고{'\n'}서빙고</Text>
        </TouchableOpacity>
      </View>
      {/* 데이트할 동 선택 페이지로 이동 */}
      <View style={{flex:1.4}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SelectDong', {offset: offset});
          }}
          style={styles.goBtn}>
          <Text style={{color: 'white', fontSize: 30, textAlign: 'center'}}>
            Go
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.counrseInProcess}>
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
      </ImageBackground>
      <View>
        <Button
          onPress={() => {
            navigation.navigate('FinalReview', {});
          }}
          title="파이널리뷰"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
  },
  counrseInProcess: {
    position: 'absolute',
    // left: width * 1,
    // top: height * 1,
    // top: t * 0.7,
    // left: l * 0.25,
    // width: l * 0.5,
    alignItems: 'center',
  },
  goBtn: {
    position: 'absolute',
    // left: width * 1,
    // top: height * 1,
    // top: t * 0.6,
    // left: l * 0.3,
    // width: l * 0.4,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 15,
    alignItems: 'center',
  },
  itaewon_1: {
    position: 'absolute',
    // left: width * 0.01,
    // top: height * 1,
    width: 100,
    height: 100,
    justifyContent: 'center',
    // flex: 5,
  },
  hannam_2: {
    position: 'absolute',
    // left: width * 1,
    // top: height * 1,
    width: 100,
    height: 100,
    justifyContent: 'center',
  },
  yongsan_3: {
    position: 'absolute',
    // left: width * 1,
    // top: height * 1,
    width: 100,
    height: 100,
    justifyContent: 'center',
  },
  hangangro_4: {
    position: 'absolute',
    // left: width * 1,
    // top: height * 1,
    width: 100,
    height: 100,
    justifyContent: 'center',
  },
  ichon_5: {
    position: 'absolute',
    // left: width * 1,
    // top: height * 1,
    width: 100,
    height: 100,
    justifyContent: 'center',
  },
  dongbingo_7: {
    position: 'absolute',
    // left: width * 1,
    // top: height * 1,
    width: 100,
    height: 100,
    justifyContent: 'center',
  },
  wonhyoro_10: {
    position: 'absolute',
    // left: width * 1,
    // top: height * 1,
    width: 100,
    height: 100,
    justifyContent: 'center',
  },
  cheongpa_18: {
    position: 'absolute',
    // left: width * 1,
    // top: height * 1,
    width: 100,
    height: 100,
    justifyContent: 'center',
  },
  text: {
    position: 'relative',
    top: 100,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
  },
});
export default Home;
