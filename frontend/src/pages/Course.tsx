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
type CourseProps = NativeStackScreenProps<ParamListBase, 'Course'>;

type Store = {
  name: string;
  id: number;
  tel: string;
  addr1: string;
  addr2: string;
  Latitude: number;
  Longitude: number;
  menu: string[];
  price: number[];
  thumb: string;
  rating: number;
  tags: string[];
};

type K = {
  latitude: number;
  longitude: number;
};

type Location = {
  P0: K;
  P1: K;
  P2: K;
};

function Course({navigation}: CourseProps) {
  const spotId: number = 1;
  const stores: any = useSelector((state: RootState) => state.stores).stores;
  // console.log('이미지', stores);
  // const P0 = { latitude: 37.53698, longitude: 127.0017 };
  // const P1 = { latitude: 37.53154, longitude: 127.007 };
  // const P2 = { latitude: 37.55392, longitude: 126.9767 };

  const [location, setLocation] = useState<Location>({
    P0: {latitude: 37.53698, longitude: 127.0017},
    P1: {latitude: 37.53154, longitude: 127.007},
    P2: {latitude: 37.55392, longitude: 126.9767},
  });

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (stores?.length === 0) {
      return;
    }
    // console.log({ hyunuk: stores[0] })
    else if (stores?.length === 2){
    setLocation({
      P0: { latitude: stores[0].latitude, longitude: stores[0].longitude },
      P1: { latitude: stores[1].latitude, longitude: stores[1].longitude },
      P2: { latitude: stores[1].latitude, longitude: stores[1].longitude },
    });
    } else if (stores?.length > 2) {
      setLocation({
      P0: { latitude: stores[0].latitude, longitude: stores[0].longitude },
      P1: { latitude: stores[1].latitude, longitude: stores[1].longitude },
      P2: { latitude: stores[2].latitude, longitude: stores[2].longitude },
      })
    }
  }, [stores]);

  useEffect(() => {
    console.log({location});
  }, [location]);
  // if (stores.length == 2) {
  //   P0 = { latitude: stores[0].latitude, longitude: stores[0].longitude }
  //   P1 = { latitude: stores[1].latitude, longitude: stores[1].longitude }
  //   P2 = { latitude: stores[1].latitude, longitude: stores[1].longitude }
  // } else {
  //   P0 = { latitude: stores[0].latitude, longitude: stores[0].longitude }
  //   P1 = { latitude: stores[1].latitude, longitude: stores[1].longitude }
  //   P2 = { latitude: stores[2].latitude, longitude: stores[2].longitude }
  // }
  // else {
  // P0 = {latitude: 37.53698, longitude: 127.0017};
  // P1 = {latitude: 37.53154, longitude: 127.007};
  // P2 = {latitude: 37.55392, longitude: 126.9767};
  // }
  // const stores = temp.stores
  // const onClick = useCallback(() => {
  //   console.log(1);
  //   const getData = async () => {
  //     const response = await axios.post(`http://j7a104.p.ssafy.io:8080/courses/${spotId}?page=1`, {

  //       spots: [1, 2, 3, 4, 5, 7]

  //     });
  //     console.log(response.data.responseData.spots);
  //     const inputStores: StoreLists = response.data.responseData.spots;
  //     console.log(inputStores)
  //   };
  //   getData();
  // }, []);
  const dispatch = useAppDispatch();
  const getData = async () => {
    const dongId: number = 1;
    const response = await axios.post(`http://j7a104.p.ssafy.io:8000/courses/${dongId}`,{
      course: [1, 2, 3],
      categoryList: {
        'food': [1, 4, 5],
        'cafe': [1, 4, 5],
        'play': [1, 4, 5],
        'drink': [1, 4, 5]
      },);

    // response.data.responseData.map(res => {
    //   console.log("map", res);

    //   console.log(res.data.responseData.Spots.image.substring(3));
    //   인덱스 0번이 h가 아니면 잘라버려서 이미지 뜨게 해주기;

    //   // res = res.data.responseData.Spots.image.substring(3, res.data.responseData.Spots.image.length() - 2);
    // })

    console.log('리스폰스 데이터', response.data.responseData.spotIds);

    // console.log('리스폰스 데이터', response.data.responseData.spots);
    // const inputStores: StoreLists = response.data.responseData.spots;
    dispatch(
      storeSlice.actions.setstore({
        stores: response.data.responseData.Spots,
      }),
    );
  };

  if (!location) {
    return null;
  }
  // console.log('스토어즈:', stores)
  return (
    <ScrollView>
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <NaverMapView
            style={{height: 270, marginHorizontal: 10, marginVertical: 10}}
            showsMyLocationButton={true}
            center={{...location.P0, zoom: 14}}
            // onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
            onCameraChange={e =>
              console.warn('onCameraChange', JSON.stringify(e))
            }
            onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
            <Marker
              coordinate={location.P0}
              onClick={() => console.warn('onClick! p0')}
            />
            <Marker
              coordinate={location.P1}
              pinColor="blue"
              onClick={() => console.warn('onClick! p1')}
            />
            <Marker
              coordinate={location.P2}
              pinColor="red"
              onClick={() => console.warn('onClick! p2')}
            />
            <Path
              coordinates={[location.P0, location.P1]}
              onClick={() => console.warn('onClick! path')}
              width={10}
            />
            <Polyline
              coordinates={[location.P1, location.P2]}
              onClick={() => console.warn('onClick! polyline')}
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
          {stores?.map((store, idx) => {
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
          <Button
            title="코스 시작"
            color={'#FFA856'}
            titleStyle={{
              color: 'white',
              fontSize: 30,
              fontWeight: 'bold',
            }}
            style={{
              height: 48,
              justifyContent: 'center',
            }}
            onPress={() => {
              // console.log('스토어어', stores);
              // console.log('스토어길이', stores.length);
              // navigation.navigate('CourseIng', {});
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}
// const spotId = 1
// const getData = async () => {
//   const response = await axios.post(`http://j7a104.p.ssafy.io:8080/courses/${spotId}?page=1`, {

//     spots: [1, 2, 3, 4, 5, 7]

//   });
//   console.log(response.data.responseData.spots);
//   const inputStores: StoreLists = response.data.responseData.spots;
//   console.log(inputStores)
// };

const styles = StyleSheet.create({
  storeList: {
    flexDirection: 'row',
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
