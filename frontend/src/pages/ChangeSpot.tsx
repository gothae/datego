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
  latitude: number;
  longitude: number;
  menus: string[];
  price: number[];
  image: string;
  rate: number;
  tags: string[];
  images: string[];
  quest: string;
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
      console.log(response.data.responseData);
      return response.data.responseData
  };
  const setData = async () => { 
    const arr = [];
    if (storeindex == 0) {
      // console.log({ ChangeSpotStores: algoList.one });
      changeList = algoList.one
    }
    else if (storeindex == 1) {
      // console.log({ ChangeSpotStores: algoList });
      changeList = algoList.two
    }
    else if (storeindex == 2) {
      console.log({ ChangeSpotStores: algoList.thr });
      changeList = algoList.thr
    }
    else if (storeindex == 3) {
      console.log({ ChangeSpotStores: algoList.fou });
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
