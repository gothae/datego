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
  ImageBackground,
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
type TagObj={
  count: number,
  description : string,
  name : string
}
type Store={
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
    if(mission==="꿀꿀이를 키우자"){
      navigation.navigate('Ar2', {num:number});
    }
    else if(mission==="돈을 줍자!"){
      navigation.navigate('Ar1', {num:number});
    }
    else if(mission==="빨강이를 키우자"){
      navigation.navigate('Ar3', {num:number});
    }
  }
  const stores: any = useSelector((state:RootState) => state.stores).stores;
  const missionList: any = useSelector((state:RootState)=> state.course).missions
  const [store, setStore] = useState<Store>({
    id: 1,
  name: "로딩중",
  phone: "",
  address: "",
  latitude: 0,
  longitude: 0,
  menus: [],
  price: [],
  image: "",
  rate: 0,
  tags: [],
  images: ["",""],
  quest: ""
  });
  const [storePosition, setStorePosition] = useState<K>({
    latitude: 37.539455,
    longitude: 126.9916965
  })

useEffect(() => {
  setStore(stores[0]);
  setX(missionList);
  let pos :K={
    latitude : stores[0].latitude,
    longitude : stores[0].longitude
  }
  setStorePosition(pos);
  setNumber(0);
}, [])


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
    clearMissions: [],
    unclearMissions: [0,1,2,3,4]
  });  
  const onIncrease = () =>{
    console.log("increase");
    setNumber((number+1)%stores.length);
  }

  let tagList;
  if(typeof store.tags[0]==="string"){
    tagList = store.tags;
  }
  else{
    tagList=[];
    for(var i=0;i<store.tags.length;i++){
      var a : TagObj = store.tags[i];
      
      tagList.push(a.name);
    }
  }
  
  useEffect(()=>{
    setStore(stores[number]);
    let pos2 :K={
      latitude : stores[number].latitude,
      longitude : stores[number].longitude
    }
    setStorePosition(pos2);
  },[number])

  const onDecrease = () => {
    console.log("decrease");
    console.log(number);

    if(number==0){
      setNumber(stores.length-1);
    }
    else{
      setNumber(number-1);
    }
  }
    
  let images;
  if (store.image) {
    if (store.image[0] == '\"') {
    images = store.image.slice(1, store.image.length)
  } else {
    images = store.image
  }
  } else if (store.images) {
    if (store.images[0][0] == 'h') {
      images = store.images[0]
    }
    else if (store.images[0][1] == 'h') {
      images = store.images[0].slice(1, store.images[0].length - 1) 
    } else {
      images = store.images[0].slice(1, store.images[0].length - 1)
    }
  }
  // let tagList;
  // if(store.tags){
  //   if(stores.tags[0].name)
  // }
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
            center={{...storePosition, zoom: 14}}
            // onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
            onCameraChange={e =>
              console.warn('onCameraChange', JSON.stringify(e))
            }
            onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
            <Marker
              coordinate={storePosition}
              onClick={() => console.log(storePosition)}
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
                  <Image style={{flex:3, resizeMode:'cover', borderRadius: 15}} source={{uri:images}}></Image>
                  <View style={{flex:2, alignItems:'center'}}>
                    <Text style={{flex:3, marginTop:'25%',color:'black', fontSize:25}}>{store.name}</Text>
                    <Text style={{flex:2, color:'black'}}>HI</Text>
                    <View style={{flex:2, flexDirection:'column', alignItems:'center', justifyContent:'space-around'}}>
                      <View style={{flex:2, flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                      <Text style={{paddingLeft:'5%', paddingRight:'5%',marginRight:'2%', backgroundColor:'orange', borderRadius:5}}>{tagList[0]}</Text>
                      <Text style={{paddingLeft:'5%', paddingRight:'5%',backgroundColor:'orange', borderRadius:5}}>{tagList[1]}</Text>
                      </View>
                      <View style={{flex:2, flexDirection:'row', alignItems:'baseline'}}>
                      <Text style={{paddingLeft:'5%', marginRight:'2%', paddingRight:'5%',backgroundColor:'orange', borderRadius:5}}>{tagList[2]}</Text>
                      <Text style={{paddingLeft:'5%', paddingRight:'5%',backgroundColor:'orange', borderRadius:5}}>{tagList[3]}</Text>
                      </View>
                      </View>
                  </View>                  
                </View>
              </View>
              <View style={{flex:2, width:'70%', flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
                <Image style={{flex:1, resizeMode:'contain', marginRight: '10%'}}source={require('../assets/scroll.png')}></Image>
                <Text style={{flex: 5, color:'black', fontSize:18}}>{store.quest}</Text>
                <Button style={{flex:2, backgroundColor:'white'}} titleStyle={{color:'orange'}}title="GO!!" onPress={()=>_onPress(store.quest)}></Button></View>
              <View style={{flex:2, alignItems:'center'}}><Button style={{width:'100%', backgroundColor:'orange'}} 
              title='그만하기' titleStyle={{fontSize:25}} onPress={requestCameraPermission}></Button></View>
            </View>
            </GestureRecognizer>
            </View>
          </View>
)
}

var styles = StyleSheet.create({
    helloWorldTextStyle: {
    flex:1,
    flexDirection:'row',
    borderWidth:1, 
    borderRadius: 15, 
    borderColor:'gray'
  },
});

export default CourseIng;
