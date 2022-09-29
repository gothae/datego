import * as React from 'react';
import {View, Text, Button, FlatList, Image, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useAppDispatch} from '../store';
import categorySlice from '../slices/category';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import DrinkItem from './DrinkItem';

type PreferenceProps = NativeStackScreenProps<ParamListBase, 'Preference'>;

function Preference({navigation}: PreferenceProps) {
  const Item = ({item, width}) => (
    <View
      style={{
        width,
        backgroundColor: '#f9c2ff',
        padding: 20,
      }}>
      <Image
        style={{height: '20%', width: '100%', resizeMode: 'contain'}}
        source={require('../assets/별5개.png')}
      />
      <Text style={{color: 'black', fontSize: 10}}>{item.name}</Text>
    </View>
  );
  const [containerWidth, setContainerWidth] = useState(0);
  const margins = 50 * 2;
  const numColumns = 3;
  const category = useSelector((state: RootState) => state.category);
  const dispatch = useAppDispatch();

  const getData = async () => {
    const response = await axios.get('http://j7a104.p.ssafy.io:8080/categories');
    dispatch(
      categorySlice.actions.setCategory({
        cafe: response.data.responseData.cafes,
        drink: response.data.responseData.drinks,
      }),
    );
  };

  useEffect(() => {
    getData();
  }, []);
  console.log('카테고리입니다.');
  console.log(category.cafe);
  console.log(category.drink);

  return (
    <View>
      <View>
        <Text>음식</Text>
      </View>

      <View>
        <Text>----------------</Text>
      </View>
      <View>
        <View>
          <FlatList
            data={category.drink}
            onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
            renderItem={({item}) => (
              <Item
                item={item}
                width={(containerWidth - margins) / numColumns}
              />
            )}
            numColumns={numColumns}
          />
        </View>
        <View>
          <Text>가격</Text>
          <Text>가격그래프</Text>
        </View>
      </View>

      <Button
        title="코스 설정완료"
        onPress={() => {
          navigation.navigate('Course', {});
        }}
      />
    </View>
  );
}

export default Preference;
