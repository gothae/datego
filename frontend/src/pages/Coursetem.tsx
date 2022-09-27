import * as React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Button } from "@react-native-material/core";
import { Item, styles } from './ChangeSpot';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSort, faRotate } from '@fortawesome/free-solid-svg-icons'
// type ChangeSpotProps = NativeStackScreenProps<ParamListBase, 'ChangeSpot'>
type Props = {
  item: Item
  navigation : any
}
function CourseItem({ item, navigation } : Props) {
  return (
    <View>
      <Pressable style={styles.storeList}
  
        onPress={() => {
          if (!navigation) return;
      console.log('페이지 넘김', item.id)
      navigation.navigate('DetailSpot', {spotId : item.id});
    }}
    >
    <View style={{flex:4}}>
        <Image style={styles.imageBox} source={{uri: item.image}}></Image>
      </View>
      <View style={{flex: 8, justifyContent:'space-between'}}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 8 }}>{item.name}</Text>
        <View
              style={{ alignItems: 'flex-end',justifyContent: 'space-between' , marginBottom: 8, marginRight: 8 , flexDirection: 'row',}}>

              <Pressable style={{ flexDirection: 'row', marginLeft: 70 }}
                  onPress={() => {
                  navigation.navigate('ChangeSpot', {});
                }}>
              <FontAwesomeIcon icon={ faRotate } style={{ alignItems: 'flex-end', marginTop: 5  }} />
              <Button
                  title="장소변경"
                  variant="text"
                  titleStyle={{
                    color: '#000000',
                    fontSize: 14,
                    fontWeight: '600',
                  }}
                  style={{
                    borderRadius: 60,
                    height: 24,
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    navigation.navigate('ChangeSpot', {});
                  }}
                 />
                </Pressable>

      <FontAwesomeIcon icon={ faSort } />
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
export default CourseItem;