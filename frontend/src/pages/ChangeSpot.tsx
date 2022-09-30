import React, { useEffect, useState } from 'react';
import SpotItem from './SpotItem';
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from 'react-native';
import {Button} from '@react-native-material/core';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import { Store } from './DetailSpot';
type ChangeSpotProps = NativeStackScreenProps<ParamListBase, 'ChangeSpot'>;
export interface Item {
  id: number;
  name: string;
  phone: string;
  address: string;
  // addr2: string
  latitude: number;
  longitude: number;
  menus: string[];
  price: number[];
  image: string;
  rate: number;
  tags: string[];
  images: string[];
}

function ChangeSpot({ navigation }: ChangeSpotProps) {
  const algoList = useSelector((state: RootState) => state.algolist);
  // const stores = useSelector((state: RootState) => state.stores).stores;
  const storeindex: number = useSelector((state: RootState) => state.stores).storeindex;
  let changeList: number[];
  // useEffect(() => {
    //   // console.log({ ChangeSpotindex: storeindex });
    //   console.log({ ChangeSpotStores: stores });
    // }, [stores]);
  const [detailstores, setDetailstores] = useState<any>([]);
  const stores: any = [];
  
  const getData = async (num:number) => {    
    const response = await axios.get(
      `http://j7a104.p.ssafy.io:8080/courses/spots/${num}`,
      );
      return response.data.responseData
      // console.log('상세페이지', response.data.responseData)
    // console.log({ menu: response.data.responseData });
    // stores.push(response.data.responseData)
    // console.log({stores: stores})
    // const tmpArr = [...detailstores];
    // tmpArr.push(response.data.responseData.tags);
    // console.log({temp:tmpArr})
    // setDetailstores(tmpArr);

  };
  const setData = async () => { 
    const arr = [];
    if (storeindex == 0) {
      console.log({ ChangeSpotStores: algoList.one });
      changeList = algoList.one
    }
    else if (storeindex == 1) {
      console.log({ ChangeSpotStores: algoList });
      changeList = algoList.two
    }
    else if (storeindex == 2) {
      // console.log({ ChangeSpotStores: algoList.thr });
      changeList = algoList.thr
    }
    else if (storeindex == 3) {
      // console.log({ ChangeSpotStores: algoList.fou });
      changeList = algoList.fou
    }
    else if (storeindex == 4) {
      // console.log({ ChangeSpotStores: algoList.fiv });
      changeList = algoList.fiv
    }
    var len = changeList?.length;
    for (var i = 0; i < len; i++) {
      const stackData = await getData(changeList[i]);
      arr.push(stackData)
    }
    setDetailstores(arr);
  }

  useEffect(() => {
    setData()
    console.log({ ChangeSpotindex: storeindex });
  
   

  }, [algoList]
  );

    return (
      <ScrollView>
        <View>
          {detailstores?.map((store:any, idx:number) => {
            return <SpotItem key={idx} item={store} navigation={navigation} />;
          })}

        </View>
        {/* <Button
        title="코스보기 페이지로"
        onPress={() => {
          navigation.navigate('Course', {});
        }}
      />
      <Button
        title="디테일 페이지로"
        onPress={() => {
          navigation.navigate('DetailSpot', {});
        }}
      /> */}
        {/* stores = [딕1, 딕2]
      for => 딕1
      딕1.name,
      .addr */}
        {/* {storeList} */}
        {/* <Text>Spot2</Text>
      <Text>Spot3</Text>
      <Text>Spot4</Text>
      <Text>Spot5</Text>
      <View>

        <Pressable style={styles.storeList}
        onPress={() => {
          navigation.navigate('DetailSpot', {});
        }}
        >
        <View style={{flex:4}}>
            <Image style={styles.imageBox} source={{uri: stores.thumb}}></Image>
          </View>
          <View style={{flex: 8, justifyContent:'space-between'}}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 8 }}>{stores.name}</Text>
            <View style={{ alignItems:'flex-end',  marginBottom:8, marginRight:8}}>
              <Button title='변경' color={'#FFA856'}
                  titleStyle={{
                    color: "white",
                    fontSize: 14,
                    fontWeight:'bold'
                }}
                style={{
                  borderRadius: 60,
                  height: 24,
                  justifyContent:'center'
                }}
                onPress={() => {
                  navigation.navigate('Course', {});
                }}
              ></Button>

              </View>
          </View>
        </Pressable>
        </View>
      <Button title="콘솔용"
        onPress={() => {
        console.log(stores.thumb);
        }}></Button> */}
      </ScrollView>
    );
  }


export const styles = StyleSheet.create({
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

export default ChangeSpot;
