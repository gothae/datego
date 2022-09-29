import * as React from 'react';
import { RootState } from '../store/reducer';
import courseSlice from '../slices/course';
import {useSelector} from 'react-redux';
import {useState, useEffect, useCallback, useMemo} from 'react';
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
import store from '../store';
type Store={
  name: string;
  image: string;
  id: number;
  tags: string[];
  location : K
}
type K = {
  latitude: number;
  longitude: number;
};


function CourseIng({navigation}) {
  // const spotId: number = 1;
  // const stores: any = useSelector((state:RootState) => state.course).stores;
  // const medal: number = useSelector((state:RootState) => state.course).medal;
  // const [store, setStore] = useState<Store>({
  //   name: " ",
  //   image: " ",
  //   id: 1,
  //   tags: [],
  //   location : {latitude:stores[0].location.latitude, longitude:stores[0].location.longitude}
  // });
  const location = {latitude: 37.53698, longitude: 127.0017};
  return (
    <View style={{flex:1}}>
      <View style={{flex: 1, flexDirection:'column'}}>
        <NaverMapView
            style={{marginHorizontal: 10, marginVertical: 10}}
            showsMyLocationButton={true}
            center={{...location, zoom: 14}}
            // onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
            onCameraChange={e =>
              console.warn('onCameraChange', JSON.stringify(e))
            }
            onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
            <Marker
              coordinate={location}
              onClick={() => console.warn('onClick! p0')}
            />
            </NaverMapView>
            <View style={{flex:1, flexDirection:'row', justifyContent: 'center', backgroundColor:'blue'}}>
              <Image style={{width:'10%', height:'5%'}} source={require('../assets/medal.png')}></Image>
              <Image style={{width:'5%', height:'5%'}} source={require('../assets/medal.png')}></Image>
              <Image style={{width:'5%', height:'5%'}} source={require('../assets/medal.png')}></Image>
            </View>
            </View>
          </View>
)
}


export default CourseIng;
