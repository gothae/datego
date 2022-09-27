import * as React from 'react';
import CourseItem from './Coursetem';
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  Image,
  Pressable,
  ScrollView
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
import {useState, useEffect, useCallback} from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import axios from 'axios';
import { getDefaultMiddleware } from '@reduxjs/toolkit';
import { useAppDispatch } from '../store';
import storeSlice from '../slices/stores';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import { Item } from './ChangeSpot';
type CourseProps = NativeStackScreenProps<ParamListBase, 'Course'>

type Store = {
  name: string
  id: number
  tel: string
  addr1: string
  addr2: string
  Latitude: number
  Longitude: number
  menu: string[]
  price: number[]
  thumb: string
  rating: number
  tags: string[]
}

function Course({navigation}: CourseProps) {
  const P0 = {latitude: 37.53698, longitude: 127.0017};
  const P1 = {latitude: 37.53154, longitude: 127.007};
  const P2 = { latitude: 37.55392, longitude: 126.9767 };
  const spotId: number = 1;
  const stores = useSelector((state: RootState) => state.stores).stores;
  // const stores = temp.stores
  // const onClick = useCallback(() => {
  //   console.log(1);
  //   const getData = async () => {
  //     const response = await axios.post(`http://10.0.2.2:8080/courses/${spotId}?page=1`, {

  //       spots: [1, 2, 3, 4, 5, 7]

  //     });
  //     console.log(response.data.responseData.spots);
  //     const inputStores: StoreLists = response.data.responseData.spots;
  //     console.log(inputStores)
  //   };
  //   getData();
  // }, []);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const getData = async () => {
    
    console.log('시작')
    const spotId: number = 1
    const response = await axios.post(`http://10.0.2.2:8080/courses/${spotId}?page=1`, {
  
      spots: [1, 2, 3, 4, 5, 7]
  
    });
      // console.log('리스폰스 데이터', response.data.responseData.spots)

      // console.log('리스폰스 데이터', response.data.responseData.spots);
      console.log('제발', response.data.responseData.spots)
    // const inputStores: StoreLists = response.data.responseData.spots;
      dispatch(
        storeSlice.actions.setstore({
        // name: response.data.responseData.spots.name,
        // id: response.data.responseData.spots.id,
        // tel: response.data.responseData.spots.tel,
        // addr1: response.data.responseData.spots.addr1,
        // addr2: response.data.responseData.spots.addr2,
        // Latitude: response.data.responseData.spots.Latitude,
        // Longitude: response.data.responseData.spots.Longitude,
        // menu: response.data.responseData.spots.menu,
        // price: response.data.responseData.spots.price,
        // thumb: response.data.responseData.spots.thume,
        // rating: response.data.responseData.spots.rating,
        // tags: response.data.responseData.spots.tags
          stores: response.data.responseData.spots
      }),
    );
    }
    getData();
    
    }, []);
  

  return (


<ScrollView>
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <NaverMapView
          style={{height: 270, marginHorizontal: 10, marginVertical: 10}}
          showsMyLocationButton={true}
          center={{...P0, zoom: 14
          }}
          // onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
          onCameraChange={e =>
            console.warn('onCameraChange', JSON.stringify(e))
          }
          onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
          <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} />
          <Marker
            coordinate={P1}
            pinColor="blue"
            onClick={() => console.warn('onClick! p1')}
          />
          <Marker
            coordinate={P2}
            pinColor="red"
            onClick={() => console.warn('onClick! p2')}
          />
          <Path
            coordinates={[P0, P1]}
            onClick={() => console.warn('onClick! path')}
            width={10}
          />
          <Polyline
            coordinates={[P1, P2]}
            onClick={() => console.warn('onClick! polyline')}
          />
          <Circle
            coordinate={P0}
            color={'rgba(255,0,0,0.3)'}
            radius={200}
            onClick={() => console.warn('onClick! circle')}
          />
          <Polygon
            coordinates={[P0, P1, P2]}
            color={'rgba(0, 0, 0, 0.5)'}
            onClick={() => console.warn('onClick! polygon')}
          /> 
        </NaverMapView>

        </View>
      <View>
          {stores.map((store, idx) => {
          console.log(store.thumb)
            return <CourseItem key={idx} item={store} navigation={navigation} />
        })}

      </View>
      <View >
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
            console.log('스토어어', stores)
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
//   const response = await axios.post(`http://10.0.2.2:8080/courses/${spotId}?page=1`, {

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
