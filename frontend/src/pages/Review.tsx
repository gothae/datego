import React from 'react';
import {ImStarFull} from 'react-icons/im';
import styled from 'styled-components';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';
import {Button} from '@react-native-material/core';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faLocationDot,
  faPhone,
  faClipboard,
} from '@fortawesome/free-solid-svg-icons';
import {useState, useEffect, useMemo} from 'react';
import axios from 'axios';
import store from '../store';
import {Item} from './ChangeSpot';
import {Menu} from 'react-native-paper';
// type DetailSpotProps = NativeStackScreenProps<ParamListBase, 'DetailSpot'>
type Props = {
  route: any;
  navigation: any;
};
type Review = {
  id: number;
  name: string;
};
type Store = {
  id: number;
  name: string;
  phone: string;
  address: string;
  // addr2: string
  latitude: number;
  longitude: number;
  menus: any;
  price: number[];
  images: string[];
  rate: number;
  tags: any;
};
const rs: Review[] = [];
const cafeTags = [
  [1, '가성비 좋은'],
  [2, '분위기 좋은'],
  [3, '감성카페'],
  [4, '고급스러운'],
  [5, '조용한'],
  [6, '깔끔한'],
  [7, '디저트'],
  [8, '인테리어'],
  [9, '이색적인'],
  [10, '뷰가좋은'],
  [11, '예쁜'],
  [12, '동네핫플'],
  [45, '사진찍기좋은'],
];
const foodTags = [
  [25, '가성비 좋은'],
  [26, '분위기 좋은'],
  [27, '푸짐한'],
  [28, '격식있는'],
  [29, '고급스러운'],
  [30, '또먹고싶다'],
  [31, '조용한'],
  [32, '깔끔한'],
  [33, '예쁜'],
  [34, '동네핫플'],
  [35, '친절한'],
  [36, '존맛탱'],
  [37, '데이트'],
];
let reviewLength: number = 0;

function Review({navigation, route}: Props) {
  const spotId: number = 1;

  const numColumns = 3;
  const [selectTag, setTag] = useState([]);
  const [containerWidth, setContainerWidth] = useState(0);

  const [tags, setTags] = useState([
    [0, ''],
    [1, ''],
  ]);
  const [hovered, setHovered] = useState(null);
  const [clicked, setClicked] = useState(null);
  // console.log('페이지아이디', spotId)
  // stores에 id에 해당되는 정보 불러오기
  const [detailstores, setstores] = useState<Store>({} as Store);
  const [reviews, setreviews] = useState<Review>({
    id: 1,
    name: 'test',
  } as Review);
  let response;
  let response2;
  const getData = async () => {
    response = await axios.get(
      `http://j7a104.p.ssafy.io:8080/courses/spots/${spotId}`,
    );
    response2 = await axios.get(
      `http://j7a104.p.ssafy.io:8080/spots/${spotId}/reviews`,
    );
    setstores(response.data.responseData);
    setreviews(response2.data.responseData);
    reviewLength = response2.data.responseData.length;
    console.log('as', response2.data.responseData[0].id);
    if (response2.data.responseData[0].id == 1) {
      setTags(cafeTags);
      console.log('c', cafeTags);
      console.log('t', tags);
      reviewLength = 13;
    }
  };
  useEffect(() => {
    getData();
  }, []);
  let images;
  const rendering = () => {
    const result = [];
    for (let i = 0; i < reviewLength; i++) {
      if (i % 3 == 0) {
        result.push(<View />);
      }
      // eslint-disable-next-line prettier/prettier
      result.push(<Button title={cafeTags[i][1]} />);
    }
    return result;
  };
  if (detailstores.images) {
    console.log('스토어 받은거', detailstores.images[0]);
    images = (
      <Image style={{height: 250}} source={{uri: detailstores.images[0]}} />
    );
  } else {
    images = <Text>이미지 없음</Text>;
  }
  const Item = ({item}) => (
    <View>
      <FlatList
        data={item[0][1]}
        onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
        renderItem={({item}) => (
          <Items item={item} width={containerWidth / numColumns} />
        )}
        numColumns={numColumns}
      />
    </View>
  );

  return (
    <ScrollView>
      <View>
        <View>
          {/* 로딩중 이미지 먼저 넣어서 만들거나 다른 방법 찾아보기 */}
          {/* {<Image style={{height: 250}} source={{uri: stores.images[0]}} />} */}
          {images}
        </View>
        <View style={{alignItems: 'center', marginVertical: 8}}>
          <Text style={{fontSize: 20, color: '#000000'}}>
            {detailstores.name}
          </Text>
          <View style={{marginVertical: '3%'}}>{rendering()}</View>
        </View>
        <View style={{flex: 1}}>
          <FlatList
            data={cafeTags}
            renderItem={({item}) => <Item item={item} />}
          />
        </View>
        {/* <View>
        {[1, 2, 3, 4, 5].map(el => (
          <View className={`fas fa-star ${(clicked >= el) | (hovered >= el) && 'yellowStar'}`}
            key={el}
            onMouseEnter={() => setHovered(el)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setClicked(el)}
          />
        ))}
        </View> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 16,
            marginVertical: 8,
          }}>
          <Button
            title="평가안하기"
            color={'#FFA856'}
            titleStyle={{
              color: 'white',
              fontSize: 16,
            }}
            style={{
              borderRadius: 60,
              width: 100,
            }}
          />
          <Button
            title="확인"
            color={'#FFA856'}
            titleStyle={{
              color: 'white',
              fontSize: 16,
            }}
            style={{
              borderRadius: 60,
              width: 100,
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    backfaceVisibility: 'visible',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 8,
    marginVertical: 8,
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    marginHorizontal: '10%',
    marginVertical: '2%',
    color: '#000000',
  },
});
export default Review;
