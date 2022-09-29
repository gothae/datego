import * as React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Button } from "@react-native-material/core";
import { Item, styles } from './ChangeSpot';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import { useAppDispatch } from '../store';
import storeSlice from '../slices/stores';
// type ChangeSpotProps = NativeStackScreenProps<ParamListBase, 'ChangeSpot'>
type Props = {
  item: Item
  navigation : any
}
function SpotItem({ item, navigation }: Props) {
  const stores: any = useSelector((state: RootState) => state.stores).stores;
  const storeindex: any = useSelector((state: RootState) => state.stores).storeindex;
  const dispatch = useAppDispatch();
  function dispatchCourse(c: any) {
    dispatch(
      storeSlice.actions.setstore({
        stores: c,
        storeindex: storeindex
      }),
    );
  }
  const replaceSelectedElement = (arr: any[], selectedIndex: number, newElement: any): any[] => {
    return arr.map((element: any, index: number) => {
      if (index === selectedIndex) {
        return newElement;
      }
      return element;
    });
  };
  return (
    <View>
      <Pressable style={styles.storeList}
  
        onPress={() => {
          if (!navigation) return;
      navigation.navigate('DetailSpot',{spotId: item.id});
    }}
    >
    <View style={{flex:4}}>
        <Image style={styles.imageBox} source={{uri: item.image}}></Image>
      </View>
      <View style={{flex: 8, justifyContent:'space-between'}}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 8 }}>{item.name}</Text>
        <View style={{ alignItems:'flex-end',  marginBottom:8, marginRight:8}}>
            <Button title='변경' color={'#FFA856'}
              titleStyle={{
                color: "white",
                fontSize: 14,
                fontWeight: 'bold'
              }}
              style={{
                borderRadius: 60,
                height: 24,
                justifyContent: 'center'
              }}
              onPress={() => {
                if (!navigation) return;
                // console.log({ 지정인덱스: storeindex })
                const newCourse = replaceSelectedElement(stores, storeindex, item);
                dispatchCourse(newCourse)
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