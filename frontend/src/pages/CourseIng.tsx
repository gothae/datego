import * as React from 'react';
import { RootState } from '../store/reducer';
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
import { statusCodes } from '@react-native-google-signin/google-signin';
type Store={
  name: string;
  image: string;
  id: number;
  tags: string[];
  location : K
  mission: string;
}
type K = {
  latitude: number;
  longitude: number;
};
type Mission = {
  clearMissions : number[];
  unclearMissions : number[];
}

function CourseIng({navigation}) {
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



  function _onPress(mission:string){
    console.log(mission);
    if(mission==="꿀꿀이를 키우자!"){
      navigation.navigate('Ar2', {});
    }
    else if(mission==="돈을 줍자!"){
      navigation.navigate('Ar1', {});
    }
    else if(mission==="빨강이를 키우자!"){
      navigation.navigate('Ar3', {});
    }
  }
  const stores: any = useSelector((state:RootState) => state.course).stores;
  const missionList: any = useSelector((state:RootState)=> state.course).missions;
  const [store, setStore] = useState<Store>({
    name: "김씨 고깃집",
    image: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA5MDJfMjM1%2FMDAxNjYyMTA5MDk3Njcx.ayvBzFbHugL03yMrrSYJ-4qqBVHjVT7W83CVQ6FkY2og.vshkd-ZSSYK2yJtEfyMJhlt6wovfMPPX5i0_grtLh-gg.JPEG.bomin78%2FDSCF9485.JPG&type=a340",
    id:0,
    tags: ["맛집","분위기가 좋은", "가성비","한식"],
    location : {latitude:37.53698, longitude:127.0017},
    mission: "꿀꿀이를 키우자!"
});

useEffect(() => {
  setStore(stores[0]);
}, [stores])

const [myPosition, setMyPosition] = useState<K>({
  latitude: 123.456,
  longitude: 123.567
});

useEffect(()=>{
  Geolocation.getCurrentPosition(
    info => {
      setMyPosition({
        latitude : info.coords.latitude,
        longitude : info.coords.longitude
      });
    },
    console.error,
    {
      enableHighAccuracy:true,
    }
  );
},[]);
// function getDist(){
//   console.log(myPosition.longitude);
//   console.log(myPosition.latitude);
//   return "HI";
//   // var x = (Math.cos(store.location.latitude)*6400*2*Math.PI/360) * Math.abs(store.location.longitude-myPosition.longitude);
//   // var y = 111*Math.abs(store.location.latitude-myPosition.latitude);
//   // return Math.round((Math.sqrt(x*x+y*y))*1000/1000*1000)+" M"; 
// }
const[number, setNumber] = useState(0);

  const [x, setX] = useState<Mission>({
    clearMissions: [1,2,3],
    unclearMissions: [4,5]
  });  
  const onIncrease = () =>{
    console.log("increase");
    // setNumber((number+1)%stores.length);
    // setStore(stores[number]);
  }
  const onDecrease = () => {
    console.log("decrease");
    // setNumber(number-1>=0?number-1:0);
    // setStore(stores[number]);
  }


  let clearMedal;
  let unclearMedal;
  clearMedal = x.clearMissions.map((a, index)=>(
    <Image style={{width:'15%', height:'70%'}} source={require('../assets/medal.png')}></Image>));  

  unclearMedal= x.unclearMissions.map((a,index)=>(
    <Image style={{width:'15%', height:'70%',opacity:0.5}} source={require('../assets/medal.png')}></Image>
  )) 
  ;
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
    
    <View style={{flex:1}}>
      

        <NaverMapView
            style={{flex:2.5, marginHorizontal: 10, marginVertical: 10}}
            showsMyLocationButton={true}
            center={{...myPosition, zoom: 14}}
            // onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
            onCameraChange={e =>
              console.warn('onCameraChange', JSON.stringify(e))
            }
            onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
            <Marker
              coordinate={myPosition}
              onClick={() => console.warn('onClick! p0')}
            />
            </NaverMapView>
            <View style={{flex:5}}>
            <View style={{flex:1, flexDirection:'row', justifyContent:'center'}}>
              <View style={{width:'70%',flexDirection:'row', justifyContent: 'space-around', alignItems:'center', 
              borderWidth:1, borderColor:'gray', borderRadius:15, marginBottom:'5%'}}>                
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
            <View style={{flex:1, alignItems:'center'}}>
              <View style={{width:'80%',flex:5}}>
                <View style={{flex:1,flexDirection:'row', borderWidth:1, borderRadius: 15, borderColor:'gray'}}>
                  <Image style={{flex:3, resizeMode:'cover', borderRadius: 15}} source={{uri:store.image}}></Image>
                  <View style={{flex:2, alignItems:'center'}}>
                    <Text style={{flex:3, marginTop:'25%',color:'black', fontSize:25}}>{store.name}</Text>
                    <Text style={{flex:2, color:'black'}}>HI</Text>
                    <View style={{flex:2, flexDirection:'column', alignItems:'center', justifyContent:'space-around'}}>
                      <View style={{flex:2, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                      <Text style={{paddingLeft:'5%', paddingRight:'5%',marginRight:'2%', backgroundColor:'orange', borderRadius:5}}>{store.tags[0]}</Text>
                      <Text style={{paddingLeft:'5%', paddingRight:'5%',backgroundColor:'orange', borderRadius:5}}>{store.tags[1]}</Text>
                      </View>
                      <View style={{flex:2, flexDirection:'row', alignItems:'baseline'}}>
                      <Text style={{paddingLeft:'5%', marginRight:'2%', paddingRight:'5%',backgroundColor:'orange', borderRadius:5}}>{store.tags[2]}</Text>
                      <Text style={{paddingLeft:'5%', paddingRight:'5%',backgroundColor:'orange', borderRadius:5}}>{store.tags[3]}</Text>
                      </View>
                      </View>
                  </View>                  
                </View>
              </View>
              <View style={{flex:2, width:'70%', flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
                <Image style={{flex:1, resizeMode:'contain', marginRight: '10%'}}source={require('../assets/scroll.png')}></Image>
                <Text style={{flex: 5, color:'black', fontSize:18}}>{store.mission}</Text>
                <Button style={{flex:2, backgroundColor:'white'}} titleStyle={{color:'orange'}}title="GO!!" onPress={()=>_onPress(store.mission)}></Button></View>
              <View style={{flex:2, alignItems:'center'}}><Button style={{width:'100%', backgroundColor:'orange'}} 
              title='그만하기' titleStyle={{fontSize:25}} onPress={requestCameraPermission}></Button></View>
            </View>
            </GestureRecognizer>
            </View>
          </View>
)
}


export default CourseIng;
