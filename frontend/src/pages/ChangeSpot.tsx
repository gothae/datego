import * as React from 'react';
import SpotItem from './SpotItem'
import {View, Text, StyleSheet, Pressable, Image, ScrollView } from 'react-native';
import { Button } from "@react-native-material/core";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
type ChangeSpotProps = NativeStackScreenProps<ParamListBase, 'ChangeSpot'>
export interface Item {
  id: number
  name: string
  phone: string
  address: string
  // addr2: string
  latitude: number
  longitude: number
  menus: string[]
  price: number[]
  image: string
  rate: number,
  tags: string[]
}
function ChangeSpot({ navigation }: ChangeSpotProps) {
  const stores = useSelector((state: RootState) => state.stores).stores;
  console.log(stores)
  return (
    <ScrollView>
    <View>
      {stores.map((store, idx) => {
        return <SpotItem key={idx} item={store} navigation={navigation} />
      })}

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
      </View>
      </ScrollView>
  );
}
// const stores = [{ name: 'STUN HOUS', tel: '0507-1304-1597', addr1: '갈월동 19-4', addr2: '갈월동', Latitude: 37.5454352, Longitude: 126.9726477, menu: ['Popresso'], price: [4500], thumb: 'https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190826_277%2F1566788683492Jeaet_JPEG%2FUAX7h1H3Lg2fsyUL8-4vd8Vk.jpg', rating: 2.65 },
// {name: '꼬마카롱'	, tel: '0507-1312-4137', addr1:	'갈월동 51-2', addr2:	'갈월동', Latitude:	37.5462755, Longitude:	126.9747784, menu:	['마카롱', '오늘의마카롱 6구', '아이스아메리카노'], price:	[2000, 10000, 3000], thumb:	'https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20211014_158%2F1634177123299kMQew_JPEG%2Fug6uk7NNIZPpctbjtLseRCZh.jpeg.jpg', rating:	4.42}
// ]

export const styles = StyleSheet.create({
  storeList: {
    flexDirection: "row",
    backfaceVisibility: 'visible',
    flexWrap: "wrap",
    borderWidth: 1, 
    borderRadius: 15,
    marginHorizontal: 8,
    marginVertical: 8
  }, 
  imageBox: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    margin: 8, 
    height: 100,
    width: 100
  }
});


export default ChangeSpot;
