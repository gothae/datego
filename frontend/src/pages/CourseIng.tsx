import * as React from 'react';
import {RootState} from '../store/reducer';
import Geolocation from 'react-native-geolocation-service';
import GestureRecognizer from 'react-native-swipe-gestures';
// import courseSlice from '../slices/course';
import {useSelector} from 'react-redux';
import {useState, useEffect, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  PermissionsAndroid,
  Touchable,
  Image,
  Pressable,
  ScrollView,
  ImageBackground,
  ImageSourcePropType,
  Alert,
} from 'react-native';
import {Button} from '@react-native-material/core';
import NaverMapView, {
  Align,
  Circle,
  Marker,
  Path,
  Polygon,
  Polyline,
} from 'react-native-nmap';
import {useAppDispatch} from '../store';
import store from '../store';
import {statusCodes} from '@react-native-google-signin/google-signin';

import {TouchableOpacity} from 'react-native';
import axios from 'axios';
import {launchCamera} from 'react-native-image-picker';
import {containsKey, getData, removeData, storeData} from '../../AsyncService';
import storeSlice from '../slices/stores';

type TagObj = {
  count: number;
  description: string;
  name: string;
};
type Store = {
  id: number;
  name: string;
  phone: string;
  address: string;
  latitude: number;
  longitude: number;
  menus: string[];
  price: number[];
  image: string;
  rate: number;
  tags: any;
  images: string[];
  quest: string;
};
type K = {
  latitude: number;
  longitude: number;
};
type Mission = {
  clearMissions: number[];
  unclearMissions: number[];
};

function CourseIng({navigation}) {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const dispatch = useAppDispatch();

  const takePicture = async () => {
    console.log('HI');
    const userSpotId = userSpotList[number];
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
        navigation.navigate('CourseIng', {});
      })
      .catch(error => {
        console.log(error);
        navigation.navigate('CourseIng', {});
      });
  };

  const requestCameraPermission = async () => {
    console.log('카메라요청');
    navigation.navigate('FinishCourse');
    // try {
    //   const granted = await PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    //   );
    //   const granted2 = await PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    //   );
    //   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //     console.log('You can use the geo');
    //   } else {
    //     console.log('Geo permission denied');
    //   }
    // } catch (err) {
    //   console.warn(err);
    // }
  };

  function _onPress(mission: string) {
    if (mission === '꿀꿀이를 키우자!') {
      navigation.navigate('Ar2', {num: number});
    } else if (mission === '돈을 줍자!') {
      navigation.navigate('Ar1', {num: number});
    } else if (mission === '빨강이를 키우자') {
      navigation.navigate('Ar3', {num: number});
    }
  }
  const [myPosition, setMyPosition] = useState<K>({
    latitude: 223.456,
    longitude: 123.567,
  });

  function _onReload() {
    Geolocation.getCurrentPosition(
      info => {
        setMyPosition({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
      },
      console.error,
      {
        enableHighAccuracy: true,
      },
    );
  }

  const stores: any = useSelector((state: RootState) => state.stores).stores;
  const userSpotList: any = useSelector(
    (state: RootState) => state.userSpot,
  ).userSpotList;
  const missionList: any = useSelector(
    (state: RootState) => state.course,
  ).missions;
  const [userSpots, setUserSpots] = useState([0, 0, 0, 0, 0]);
  const [checkImg, setCheckImg] = useState('');
  const [store, setStore] = useState<Store>({
    id: 1,
    name: '로딩중',
    phone: '',
    address: '',
    latitude: 0,
    longitude: 0,
    menus: [],
    price: [],
    image: '',
    rate: 0,
    tags: [],
    images: ['', ''],
    quest: '',
  });
  const [storePosition, setStorePosition] = useState<K>({
    latitude: 137.539455,
    longitude: 126.9916965,
  });
  useEffect(() => {
    setUserSpots(userSpotList);
  }, [userSpotList]);
  useEffect(() => {
    console.log({성공한미션: missionList.clearMissions});
    console.log({남은미션: missionList.unclearMissions});
    setX(missionList);
  }, [missionList]);
  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        setMyPosition({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude,
        });
      },
      console.error,
      {
        enableHighAccuracy: true,
      },
    );
  }, [storePosition]);
  useEffect(() => {
    setDist(getDist(storePosition));
  }, [myPosition]);

  console.log(stores);
  // 여기서 async storage합니다.
  async function localStorage() {
    const hasStore = await containsKey('stores');
    const hasUserSpot = await containsKey('userSpotList');
    const hasMissionList = await containsKey('missionList');
    if (!hasStore) {
      await storeData('stores', stores);
    }
    if (!hasUserSpot) {
      await storeData('userSpotList', userSpotList);
    }
    if (!hasMissionList) {
      await storeData('missionList', missionList);
    }
    const asyncStores = await getData('stores');
    const asyncUserSpot = await getData('userSpotList');
    const asyncMission = await getData('missionList');
    dispatch(
      storeSlice.actions.setstore({
        stores: asyncStores,
      }),
    );
    const test = await getData('test');
    console.log('테스트합니다.');
    console.log(test);
    console.log('테스트합니다.');
  }
  useEffect(() => {
    localStorage();
    setStore(stores[0]);
    setX(missionList);
    let pos: K = {
      latitude: stores[0].latitude,
      longitude: stores[0].longitude,
    };
    setStorePosition(pos);
    setUserSpots(userSpotList);
  }, []);
  useEffect(() => {
    let pos: K = {
      latitude: stores[number].latitude,
      longitude: stores[number].longitude,
    };
    setStorePosition(pos);
  }, [store]);

  function getDist(location: K) {
    var x =
      ((Math.cos(location.latitude) * 6400 * 2 * Math.PI) / 360) *
      Math.abs(location.longitude - myPosition.longitude);
    var y = 111 * Math.abs(location.latitude - myPosition.latitude);
    return Math.round(((Math.sqrt(x * x + y * y) * 1000) / 1000) * 1000);
  }
  const [number, setNumber] = useState(0);
  const [dist, setDist] = useState(0);
  const [opacityNum, setOpactiy] = useState(1);
  const [x, setX] = useState<Mission>({
    clearMissions: [],
    unclearMissions: [0, 1, 2, 3, 4],
  });
  const onIncrease = () => {
    console.log('increase');
    setNumber((number + 1) % stores.length);
  };

  let tagList;
  if (typeof store.tags[0] === 'string') {
    tagList = store.tags;
  } else {
    tagList = [];
    for (var i = 0; i < store.tags.length; i++) {
      var a: TagObj = store.tags[i];

      tagList.push(a.name);
    }
  }

  useEffect(() => {
    setStore(stores[number]);
    let pos2: K = {
      latitude: stores[number].latitude,
      longitude: stores[number].longitude,
    };
    if (x.clearMissions.includes(number)) {
      setCheckImg(
        'https://user-images.githubusercontent.com/66546079/193739256-b409970a-6887-461d-a513-f524324978ca.png',
      );
      setOpactiy(0.4);
    } else {
      setCheckImg('1234');
      setOpactiy(1);
    }
    setStorePosition(pos2);
  }, [number]);
  useEffect(() => {
    if (x.clearMissions.includes(number)) {
      setCheckImg(
        'https://user-images.githubusercontent.com/66546079/193739256-b409970a-6887-461d-a513-f524324978ca.png',
      );
      setOpactiy(0.4);
    }
  }, [x]);

  const onDecrease = () => {
    console.log('decrease');
    console.log(number);

    if (number == 0) {
      setNumber(stores.length - 1);
    } else {
      setNumber(number - 1);
    }
  };

  let images;
  if (store.image) {
    if (store.image[0] == '"') {
      images = store.image.slice(1, store.image.length);
    } else {
      images = store.image;
    }
  } else if (store.images) {
    if (store.images[0][0] == 'h') {
      images = store.images[0];
    } else if (store.images[0][1] == 'h') {
      images = store.images[0].slice(1, store.images[0].length - 1);
    } else {
      images = store.images[0].slice(1, store.images[0].length - 1);
    }
  }
  // let tagList;
  // if(store.tags){
  //   if(stores.tags[0].name)
  // }
  let clearMedal;
  let unclearMedal;
  clearMedal = x.clearMissions.map((a, index) => (
    <Image
      style={{width: '15%', height: '70%'}}
      source={require('../assets/medal.png')}
    />
  ));

  unclearMedal = x.unclearMissions.map((a, index) => (
    <Image
      style={{width: '15%', height: '70%', opacity: 0.5}}
      source={require('../assets/medal.png')}
    />
  ));
  // const spotId: number = 1;
  // const stores: any = useSelector((state:RootState) => state.course).stores;
  // const medal: number = useSelector((state:RootState) => state.course).medal;
  // const [store, setStore] = useState<Store>({
  // name: " ",
  // image: " ",
  // id: 1,
  // tags: [],
  // location : {latitude:stores[0].location.latitude, longitude:stores[0].location.longitude}
  // });
  return (
    <View style={{flex: 1}}>
      <NaverMapView
        style={{flex: 2.5, marginHorizontal: 10, marginVertical: 10}}
        showsMyLocationButton={true}
        center={{...storePosition, zoom: 14}}
        // onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
        onCameraChange={e => console.log('onCameraChange', JSON.stringify(e))}
        onMapClick={e => console.log('onMapClick', JSON.stringify(e))}>
        <Marker
          coordinate={storePosition}
          onClick={() => console.log(storePosition)}
        />
      </NaverMapView>
      <View style={{flex: 5}}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
          <View
            style={{
              width: '70%',
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 15,
              marginBottom: '5%',
            }}>
            {clearMedal}
            {unclearMedal}
          </View>
        </View>
        <GestureRecognizer
          onSwipeLeft={onIncrease}
          onSwipeRight={onDecrease}
          config={{
            velocityThreshold: 0.3,
            directionalOffsetThreshold: 80,
          }}
          style={{
            flex: 5,
          }}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <View style={{width: '80%', flex: 5}}>
              <ImageBackground
                resizeMode="contain"
                source={{uri: checkImg}}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  borderWidth: 1,
                  borderRadius: 15,
                  borderColor: 'gray',
                }}>
                <Image
                  style={{
                    flex: 3,
                    resizeMode: 'cover',
                    borderRadius: 15,
                    opacity: opacityNum,
                  }}
                  source={{uri: images}}
                />
                <View
                  style={{flex: 2, alignItems: 'center', opacity: opacityNum}}>
                  <Text
                    style={{
                      flex: 3,
                      marginTop: '25%',
                      color: 'black',
                      fontSize: 25,
                    }}>
                    {store.name}
                  </Text>
                  <View
                    style={{
                      flex: 2,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                    }}>
                    <Text
                      style={{
                        flex: 2,
                        paddingLeft: '15%',
                        color: 'black',
                        textAlign: 'center',
                      }}>
                      {dist} M
                    </Text>
                    <TouchableOpacity
                      onPress={() => _onReload()}
                      style={{flex: 1}}
                      activeOpacity={0.5}>
                      <Image
                        style={{width: 50, height: 15}}
                        resizeMode="contain"
                        source={{
                          uri: 'https://user-images.githubusercontent.com/66546079/193567076-b88dbfb6-ad87-45f6-953c-3ea02960ca70.png',
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flex: 2,
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                    }}>
                    <View
                      style={{
                        flex: 2,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                      <Text
                        style={{
                          paddingLeft: '5%',
                          paddingRight: '5%',
                          marginRight: '2%',
                          backgroundColor: 'orange',
                          borderRadius: 5,
                        }}>
                        {tagList[0]}
                      </Text>
                      <Text
                        style={{
                          paddingLeft: '5%',
                          paddingRight: '5%',
                          backgroundColor: 'orange',
                          borderRadius: 5,
                        }}>
                        {tagList[1]}
                      </Text>
                    </View>
                    <View
                      style={{
                        flex: 2,
                        flexDirection: 'row',
                        alignItems: 'baseline',
                      }}>
                      <Text
                        style={{
                          paddingLeft: '5%',
                          marginRight: '2%',
                          paddingRight: '5%',
                          backgroundColor: 'orange',
                          borderRadius: 5,
                        }}>
                        {tagList[2]}
                      </Text>
                      <Text
                        style={{
                          paddingLeft: '5%',
                          paddingRight: '5%',
                          backgroundColor: 'orange',
                          borderRadius: 5,
                        }}>
                        {tagList[3]}
                      </Text>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </View>
            <View
              style={{
                flex: 2,
                width: '70%',
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}>
              <Image
                style={{flex: 1, resizeMode: 'contain', marginRight: '10%'}}
                source={require('../assets/scroll.png')}
              />
              <Text style={{flex: 5, color: 'black', fontSize: 18}}>
                {store.quest}
              </Text>
              <Button
                style={
                  dist > 100
                    ? {flex: 2, backgroundColor: 'white'}
                    : {display: 'none'}
                }
                titleStyle={{color: 'orange'}}
                title="GO!!"
                onPress={() => _onPress(store.quest)}
              />
              <TouchableOpacity
                onPress={() => takePicture()}
                style={userSpots[number] === 0 ? {display: 'none'} : {flex: 1}}
                activeOpacity={0.5}>
                <Image
                  style={{width: 50, height: 20}}
                  resizeMode="contain"
                  source={{
                    uri: 'https://user-images.githubusercontent.com/66546079/193750268-94723feb-51b0-4c72-a590-b60419f966c7.png',
                  }}
                />
              </TouchableOpacity>
            </View>
            <View style={{flex: 2, alignItems: 'center'}}>
              <Button
                style={{width: '100%', backgroundColor: 'orange'}}
                title="그만하기"
                titleStyle={{fontSize: 25}}
                onPress={requestCameraPermission}
              />
            </View>
          </View>
        </GestureRecognizer>
      </View>
    </View>
  );
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 15,
    borderColor: 'gray',
  },
});

export default CourseIng;
