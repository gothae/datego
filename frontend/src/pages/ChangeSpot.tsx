import * as React from 'react';
import {View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Button } from "@react-native-material/core";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
type ChangeSpotProps = NativeStackScreenProps<ParamListBase, 'ChangeSpot'>

function ChangeSpot({ navigation }: ChangeSpotProps) {
  
  return (
    <View>
      <Text>Spot1</Text>
      <Button
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
      />
      <Text>Spot2</Text>
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
        }}></Button>
    </View>
  );
}
const stores = {name: 'STUN HOUS', tel:	'0507-1304-1597', addr1:	'갈월동 19-4', addr2:	'갈월동', Latitude:	37.5454352, Longitude:	126.9726477, menu:	['Popresso'], price:	[4500], thumb:	'https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190826_277%2F1566788683492Jeaet_JPEG%2FUAX7h1H3Lg2fsyUL8-4vd8Vk.jpg', rating:	2.65}
const styles = StyleSheet.create({
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
