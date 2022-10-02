import * as React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {Button} from '@react-native-material/core';
import {Item, styles} from './ChangeSpot';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronUp, faChevronDown,  faRotate} from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch } from '../store';
import storeSlice from '../slices/stores';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import algolistSlice from '../slices/algolist';
// type ChangeSpotProps = NativeStackScreenProps<ParamListBase, 'ChangeSpot'>
type Props = {
  item: Item;
  navigation: any;
  idx: number;
};

function CourseItem({ item, navigation, idx }: Props) {
  const dispatch = useAppDispatch();
  const stores = useSelector((state: RootState) => state.stores).stores;
  const first: any = useSelector((state: RootState) => state.algolist).one;
  const second: any = useSelector((state: RootState) => state.algolist).two;
  const third: any = useSelector((state: RootState) => state.algolist).thr;
  const fourth: any = useSelector((state: RootState) => state.algolist).fou;
  const fifth: any = useSelector((state: RootState) => state.algolist).fiv;
  const downAlgo = (selectedIndex: number) => {
    if (selectedIndex == 0) {
      const firstAlgo: any = second;
      const secondAlgo: any = first;
      dispatch(
        algolistSlice.actions.setalgolist({
          one: firstAlgo,
          two: secondAlgo,
          thr: third,
          fou: fourth,
          fiv: fifth
        })
      )
    } 
    else if (selectedIndex == 1) { 
      const firstAlgo: any = third;
      const secondAlgo: any = second;
      dispatch(
        algolistSlice.actions.setalgolist({
          one: first,
          two: firstAlgo,
          thr: secondAlgo,
          fou: fourth,
          fiv: fifth
        })
      )
    }
    else if (selectedIndex == 2) { 
      const firstAlgo: any = fourth;
      const secondAlgo: any = third;
      dispatch(
        algolistSlice.actions.setalgolist({
          one: first,
          two: second,
          thr: firstAlgo,
          fou: secondAlgo,
          fiv: fifth
        })
      )
    }
    else if (selectedIndex == 3) { 
      const firstAlgo: any = fifth;
      const secondAlgo: any = fourth;
      dispatch(
        algolistSlice.actions.setalgolist({
          one: first,
          two: second,
          thr: third,
          fou: firstAlgo,
          fiv: secondAlgo
        })
      )
    }
  };
  
    const upAlgo = (selectedIndex: number) => {
      if (selectedIndex == 1) { 
        const firstAlgo: any = second;
        const secondAlgo: any = first;
        dispatch(
          algolistSlice.actions.setalgolist({
            one: firstAlgo,
            two: secondAlgo,
            thr: third,
            fou: fourth,
            fiv: fifth
          })
        )
      }
      else if (selectedIndex == 2) { 
        const firstAlgo: any = third;
        const secondAlgo: any = second;
        dispatch(
          algolistSlice.actions.setalgolist({
            one: first,
            two: firstAlgo,
            thr: secondAlgo,
            fou: fourth,
            fiv: fifth
          })
        )
      }
      else if (selectedIndex == 3) { 
        const firstAlgo: any = fourth;
        const secondAlgo: any = third;
        dispatch(
          algolistSlice.actions.setalgolist({
            one: first,
            two: second,
            thr: firstAlgo,
            fou: secondAlgo,
            fiv: fifth
          })
        )
      }
      else if (selectedIndex == 4) { 
        const firstAlgo: any = fifth;
        const secondAlgo: any = fourth;
        dispatch(
          algolistSlice.actions.setalgolist({
            one: first,
            two: second,
            thr: third,
            fou: firstAlgo,
            fiv: secondAlgo
          })
        )
      }
  };
  
  function dispatchIndex(i: number) {
    dispatch(
      storeSlice.actions.setstore({
        stores: stores,
        storeindex: i,
      }),
    );
  }

  const downSelectedElement = (arr: any[], selectedIndex: number): any[] => {
    if (stores.length == 2) {
      const newArr = [stores[1], stores[0]];

      return newArr
    }
    else if (stores.length == 3) {
      if (selectedIndex == 0) {
        const newArr = [stores[1], stores[0], stores[2]];
        return newArr
      }
      else {
        const newArr = [stores[0], stores[2], stores[1]];
        return newArr
      }
    }
    else {
      if (selectedIndex == stores.length - 2) {
        const prevArr = arr.slice(0, selectedIndex);
        prevArr.push(arr[selectedIndex + 1]);
        prevArr.push(arr[selectedIndex]);
        return prevArr
      }
      else {
        if (selectedIndex == 0) {
          const prevArr = [arr[1], arr[0]];
          const nextArr = arr.slice(selectedIndex + 2);
          return prevArr.concat(nextArr);
        }
        else {
          const prevArr = arr.slice(0, selectedIndex);
          prevArr.push(arr[selectedIndex + 1]);
          prevArr.push(arr[selectedIndex]);
          const nextArr = arr.slice(selectedIndex + 2);
          return prevArr.concat(nextArr); }
      }
    };
  };
  const upSelectedElement = (arr: any[], selectedIndex: number): any[] => {
    if (stores.length == 2) {
      const newArr = [stores[1], stores[0]];
      return newArr
    }
    else if (stores.length == 3) { 
      if (selectedIndex == 1) {
        const newArr = [stores[1], stores[0], stores[2]];
        return newArr
      }
      else {
        const newArr = [stores[0], stores[2], stores[1]];
        return newArr
      }
    }
    else{
    if (selectedIndex == 1) {

      const prevArr = [arr[1]];
      prevArr.push(arr[0]);
      const nextArr = arr.slice(selectedIndex + 1);
      return prevArr.concat(nextArr);
    }
    else if (selectedIndex == arr.length - 1) {
      const prevArr = arr.slice(0, selectedIndex - 1);
      prevArr.push(arr[selectedIndex]);
      prevArr.push(arr[selectedIndex - 1]);
      return prevArr
    }
    else {
      const prevArr = arr.slice(0, selectedIndex - 1);
      prevArr.push(arr[selectedIndex]);
      prevArr.push(arr[selectedIndex - 1]);
      const nextArr = arr.slice(selectedIndex + 1);
      return prevArr.concat(nextArr);
      }
    }
  };
  function dispatchCourse(c: any) {
    dispatch(
      storeSlice.actions.setstore({
        stores: c,
        storeindex: idx
      }),
    );
  }
  let images;
  if (item.image) {
    if (item.image[0] == '\"') {
    images = <Image style={styles.imageBox} source={{ uri: item.image.slice(1, item.image.length) }} />
  } else {
    images = <Image style={styles.imageBox} source={{ uri: item.image }} />
  }
  } else if (item.images) {
    if (item.images[0][0] == 'h') {
      images = <Image style={styles.imageBox} source={{uri: item.images[0]}} />;
    }
    else if (item.images[0][1] == 'h') {
      images = <Image style={styles.imageBox} source={{ uri: item.images[0].slice(1, item.images[0].length - 1) }} />
    } else {
      images = <Image style={styles.imageBox} source={{ uri: item.images[0].slice(1, item.images[0].length - 1) }} />
    }
  }
  
  return (
    <View>
      <Pressable
        style={styles.storeList}
        onPress={() => {
          if (!navigation) {
            return;
          }
          // console.log('페이지 넘김', item.id);
          // console.log({image: item.image[0]})
          navigation.navigate('DetailSpot', {spotId: item.id});
      }}>
        {/* 이미지 */}
        <View style={{flex: 4}}>
          {images}
        </View>

        
        <View style={{flex: 7}}>
          {/* 제목 */}
          <View style={{ marginTop: '4%', marginHorizontal: '1%' }}>
              <Text style={{fontSize: 21, fontWeight: 'bold', color: '#000000'}}>
                {item.name}
              </Text>
          </View>
          {/* 장소변경 */}
  
          <View
            style={{
            marginBottom: '1%',
            }}>
            <Pressable
              style={{flexDirection: 'row', marginLeft: '25%'}}
              onPress={() => {
                navigation.navigate('ChangeSpot', {});
              }}>
              <FontAwesomeIcon
              icon={faRotate}
              style={{marginTop: '6%'}}
              />
              <Button
                title="장소변경"
                variant="text"
                titleStyle={{
                  color: '#000000',
                  fontSize: 14,
                  fontWeight: '600',
                }}

                onPress={() => {
                  console.log({디스패치: idx})
                  dispatchIndex(idx)
                  navigation.navigate('ChangeSpot', {});
                }}
              />
            </Pressable>
          </View>
        </View>

        {/* 위아래 버튼 */}
        <View style={{ flex: 1, justifyContent: 'space-between', alignItems: 'center'}}>
          <View>
            <Pressable
              onPress={() => {
                if (idx !== 0) {
                  const newCourse = upSelectedElement(stores, idx);
                  console.log({ 변경된코스: newCourse })
                  console.log({ 코스갯수: newCourse.length })
                  upAlgo(idx)
                  dispatchCourse(newCourse)
                }
              }}
              style={{ marginTop:'25%'}}
            >
              <FontAwesomeIcon icon={faChevronUp} />
            </Pressable>
          </View>  
          <View>
            <Pressable
              onPress={() => {
                if (idx !== stores.length - 1) {
                  const newCourse = downSelectedElement(stores, idx);
                  console.log({ 변경된코스: newCourse })
                  console.log({ 코스갯수: newCourse.length })
                  downAlgo(idx)
                  dispatchCourse(newCourse)
                }
              }}
              style={{ marginBottom: '25%' }}
            >
              <FontAwesomeIcon icon={faChevronDown} />

            </Pressable>
          </View> 
        </View>
      </Pressable>
    </View>
  );
}
export default CourseItem;
