import * as React from 'react';
import CourseItem from './Coursetem';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
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
import {useState, useEffect, useCallback, useMemo} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';
import axios from 'axios';
import {getDefaultMiddleware} from '@reduxjs/toolkit';
import {useAppDispatch} from '../store';
import storeSlice from '../slices/stores';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import {Item} from './ChangeSpot';
import algolistSlice from '../slices/algolist';
import Geolocation from 'react-native-geolocation-service';
import { Platform, PermissionsAndroid } from 'react-native';

type CourseProps = NativeStackScreenProps<ParamListBase, 'Course'>;

type K = {
  latitude: number;
  longitude: number;
};

type Location = {
  P0: K;
  P1: K;
  P2: K;
  P3: K;
  P4: K;
};

function Course({ navigation }: CourseProps) {
  // 위치정보 허용 함수
  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      const granted2 = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the geo");
      } else {
        console.log("Geo permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }; 
  useEffect(() => { requestCameraPermission },
    [])

  const stores: any = useSelector((state: RootState) => state.stores).stores;
  const first: any = useSelector((state: RootState) => state.algolist).one;
  const second: any = useSelector((state: RootState) => state.algolist).two;
  const third: any = useSelector((state: RootState) => state.algolist).thr;
  const fourth: any = useSelector((state: RootState) => state.algolist).fou;
  const fifth: any = useSelector((state: RootState) => state.algolist).fiv;

  const [location, setLocation] = useState<Location>({
    P0: {latitude: 37.53698, longitude: 127.0017},
    P1: {latitude: 37.53154, longitude: 127.007},
    P2: {latitude: 37.55392, longitude: 126.9767},
    P3: {latitude: 37.55392, longitude: 126.9767},
    P4: {latitude: 37.55392, longitude: 126.9767},
  });
  const [recomList, setRecomList] = useState<any>({
    one: [],
    two: [],
    thr: [],
    fou: [],
    fiv: [],
  });

  useEffect(() => {
    getData();
  }, []);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => { 
    var currentPrice = 0;
    for (var i = 0; i < stores.length; i++) {
      currentPrice = currentPrice + stores[i].price
    }
    setTotal(Math.round( currentPrice / 10000))
  }, [stores])
  useEffect(() => {
    if (stores?.length === 0) {
      return;
    }

    else if (stores?.length === 2) {
      setLocation({
        P0: {latitude: stores[0].latitude, longitude: stores[0].longitude},
        P1: {latitude: stores[1].latitude, longitude: stores[1].longitude},
        P2: {latitude: stores[1].latitude, longitude: stores[1].longitude},
        P3: {latitude: stores[1].latitude, longitude: stores[1].longitude},
        P4: {latitude: stores[1].latitude, longitude: stores[1].longitude},
      });
      setRecomList({
        one: [first],
        two: [second],
      });
    } else if (stores?.length === 3) {
      setLocation({
        P0: {latitude: stores[0].latitude, longitude: stores[0].longitude},
        P1: {latitude: stores[1].latitude, longitude: stores[1].longitude},
        P2: {latitude: stores[2].latitude, longitude: stores[2].longitude},
        P3: {latitude: stores[2].latitude, longitude: stores[2].longitude},
        P4: {latitude: stores[2].latitude, longitude: stores[2].longitude},
      });
      setRecomList({
        one: [first],
        two: [second],
        thr: [third],
      });
    } else if (stores?.length === 4) {
      setLocation({
        P0: {latitude: stores[0].latitude, longitude: stores[0].longitude},
        P1: {latitude: stores[1].latitude, longitude: stores[1].longitude},
        P2: {latitude: stores[2].latitude, longitude: stores[2].longitude},
        P3: {latitude: stores[3].latitude, longitude: stores[3].longitude},
        P4: {latitude: stores[3].latitude, longitude: stores[3].longitude},
      }),
        setRecomList({
          one: [first],
          two: [second],
          thr: [third],
          fou: [fourth],
        });
    } else if (stores?.length === 5) {
      setLocation({
        P0: {latitude: stores[0].latitude, longitude: stores[0].longitude},
        P1: {latitude: stores[1].latitude, longitude: stores[1].longitude},
        P2: {latitude: stores[2].latitude, longitude: stores[2].longitude},
        P3: {latitude: stores[3].latitude, longitude: stores[3].longitude},
        P4: {latitude: stores[4].latitude, longitude: stores[4].longitude},
      }),
        setRecomList({
          one: [first],
          two: [second],
          thr: [third],
          fou: [fourth],
          fiv: [fifth],
        });
    }
  }, [stores, first, second, third, fourth, fifth]);

  const [myPosition, setMyPosition] = useState<K>({
    latitude: 123.456,
    longitude: 123.567
  });
  
  useEffect(() => {
    Geolocation.getCurrentPosition(
      info => {
        console.log( '현재위치',myPosition )
        setMyPosition({
          latitude: info.coords.latitude,
          longitude: info.coords.longitude
        });
      },
      console.error,
      {
        enableHighAccuracy: true,
      }
    );
  }, [location]);

  const dispatch = useAppDispatch();
  const getData = async () => {
    const dongId: number = 1;
    console.log('추천코스받아오기')
    const response = await axios.post(
      `http://j7a104.p.ssafy.io:8000/courses/${dongId}`,
      {
        course: [1, 2, 3],
        categoryList: {
          food: [1],
          cafe: [1],
          play: [9],
          drink: [1],
        },
        price: 60000,
        id: 45,
      },
    );
    console.log('추천코스 받기 완료')
    dispatch(
      storeSlice.actions.setstore({
        stores: response.data.responseData.Spots,
      }),
    );
    // const stores = response.data.responseData.Spots;
    // if (stores?.length == 2) {
    //   dispatch(
    //     algolistSlice.actions.setalgolist({
    //       one: response.data.responseData.spotIds[0].first,
    //       two: response.data.responseData.spotIds[1].second,
    //     }),
    //   );
    // } else if (stores?.length == 3) {
    //   dispatch(
    //     algolistSlice.actions.setalgolist({
    //       one: response.data.responseData.spotIds[0].first,
    //       two: response.data.responseData.spotIds[1].second,
    //       thr: response.data.responseData.spotIds[2].third,
    //     }),
    //   );
    // } else if (stores?.length == 4) {
    //   dispatch(
    //     algolistSlice.actions.setalgolist({
    //       one: response.data.responseData.spotIds[0].first,
    //       two: response.data.responseData.spotIds[1].second,
    //       thr: response.data.responseData.spotIds[2].third,
    //       fou: response.data.responseData.spotIds[3].fourth,
    //     }),
    //   );
    // } else if (stores?.length == 5) {
    //   dispatch(
    //     algolistSlice.actions.setalgolist({
    //       one: response.data.responseData.spotIds[0].first,
    //       two: response.data.responseData.spotIds[1].second,
    //       thr: response.data.responseData.spotIds[2].third,
    //       fou: response.data.responseData.spotIds[3].fourth,
    //       fiv: response.data.responseData.spotIds[4].fifth,
    //     }),
    //     );
    //   }
    };
    const markerImg = require('../assets/현재위치.png');
    
    if (!location) {
    return null;
  }
  
  return (
    <ScrollView>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <NaverMapView
            style={{height: 270, marginHorizontal: 10, marginVertical: 10}}
            // showsMyLocationButton={true}
            center={{...location.P0, zoom: 14}}
            // onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
            onCameraChange={e =>
              console.warn('onCameraChange', JSON.stringify(e))
            }
            onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
              <Marker
              coordinate={myPosition}
              onClick={() => console.warn('onClick! p0')}
              image={markerImg}
              width={36}
              height={36}
              />
            <Marker
              coordinate={location.P0}
              pinColor={'orange'}
              width={36}
              height={36}
              onClick={() => console.warn('onClick! p0')}
            />
            <Marker
              coordinate={location.P1}
              pinColor="blue"
              onClick={() => console.warn('onClick! p1')}
              width={36}
              height={36}
            />
            <Marker
              coordinate={location.P2}
              pinColor="red"
              onClick={() => console.warn('onClick! p2')}
              width={36}
              height={36}
            />
            <Marker
              coordinate={location.P3}
              pinColor="#FFA856"
              onClick={() => console.warn('onClick! p2')}
              width={36}
              height={36}
            />
            <Marker
              coordinate={location.P4}
              pinColor="purple"
              onClick={() => console.warn('onClick! p2')}
              width={36}
              height={36}
            />
            <Path
              coordinates={[location.P0, location.P1]}
              onClick={() => console.warn('onClick! path')}
              width={6}
              color={'#FFA856'}
            />
            <Path
              coordinates={[location.P1, location.P2]}
              onClick={() => console.warn('onClick! polyline')}
              color={'skyblue'}
              width={6}
            />
            <Path
              coordinates={[location.P2, location.P3]}
              onClick={() => console.warn('onClick! polyline')}
              color={'skyblue'}
              width={6}
            />
            <Path
              coordinates={[location.P3, location.P4]}
              onClick={() => console.warn('onClick! polyline')}
              color={'skyblue'}
              width={6}
            />
            <Circle
              coordinate={location.P0}
              color={'rgba(255,0,0,0.3)'}
              radius={200}
              onClick={() => console.warn('onClick! circle')}
            />
            {/* <Polygon
              coordinates={[P0, P1, P2]}
              color={'rgba(0, 0, 0, 0.5)'}
              onClick={() => console.warn('onClick! polygon')}
            /> */}
          </NaverMapView>
        </View>
        <View>
          {stores?.map((store: any, idx: number) => {
            return (
              <CourseItem
                key={idx}
                idx={idx}
                item={store}
                navigation={navigation}
                />
            );
          })}
        </View>
                
        <View>
          <Text style={{color:'#000000', fontSize: 24, marginLeft: '4%', marginVertical: '1.5%' , fontWeight: 'bold'}}> 예상가격 : {total} 만원</Text>
        </View>
      {/* <View style={{flex:2, alignItems:'center'}}><Button style={{width:'100%', backgroundColor:'orange'}} 
      title='위치허용' titleStyle={{fontSize:25}} onPress={requestCameraPermission}></Button></View> */}
        <View >
          <Button
            title="코스 시작"
            color={'#FFA856'}
            titleStyle={{
              color: 'white',
              fontSize: 26,
              fontWeight: 'bold',
            }}
            style={{
              height: 48,
            }}
            onPress={() => {
              navigation.navigate('CourseIng', {});
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  storeList: {
    backfaceVisibility: 'visible',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderRadius: 15,
    marginHorizontal: 8,
    marginVertical: 8,
  },
  imageBox: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    margin: 8,
    height: 100,
    width: 100,
  },
});
export default Course;
