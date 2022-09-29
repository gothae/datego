import * as React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Button } from "@react-native-material/core";
import { Item, styles } from './ChangeSpot';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
// type ChangeSpotProps = NativeStackScreenProps<ParamListBase, 'ChangeSpot'>
type Props = {
  item: Item
  navigation : any
}
function SpotItem({ item, navigation } : Props) {
  return (
    <View>
      <Pressable style={styles.storeList}
  
        onPress={() => {
          if (!navigation) return;
      navigation.navigate('DetailSpot', {});
    }}
    >
    <View style={{flex:4}}>
        <Image style={styles.imageBox} source={{uri: item.thumb}}></Image>
      </View>
      <View style={{flex: 8, justifyContent:'space-between'}}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 8 }}>{item.name}</Text>
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
                if (!navigation) return;
              navigation.navigate('Course', {});
            }}
          ></Button>
          
          </View>
      </View>
    </Pressable>
    </View>
  )
}
// const styles = StyleSheet.create({
//   storeList: {
//     flexDirection: "row",
//     backfaceVisibility: 'visible',
//     flexWrap: "wrap",
//     borderWidth: 1,
//     borderRadius: 15,
//     marginHorizontal: 8,
//     marginVertical: 8
//   },
//   imageBox: {
//     justifyContent: "center",
//     alignItems: "center",
//     borderRadius: 15,
//     margin: 8, 
//     height: 100,
//     width: 100
//   }
// })
export default SpotItem;