import * as React from 'react';
import { ImStarFull } from "react-icons/im";
import styled from 'styled-components';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
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
type Review ={
  id: number;
  name: string;
}
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


let reviewLength: number;
function Review({navigation, route}: Props) {
  const spotId: number = 1;
  const [hovered, setHovered] = useState(null);
  const [clicked, setClicked] = useState(null);
  // console.log('페이지아이디', spotId)
  // stores에 id에 해당되는 정보 불러오기
  const [detailstores, setstores] = useState<Store>({} as Store);
  const [reviews, setreviews] = useState<Review>({id:1,name:"test"} as Review);
  let response;
  let response2;
  const getData = async () => {
    response = await axios.get(
      `http://j7a104.p.ssafy.io:8080/courses/spots/${spotId}`,
    );
    response2 = await axios.get(
      `http://j7a104.p.ssafy.io:8080/spots/${spotId}/reviews`,
    );
    reviewLength = response2.data.responseData.length;
    setstores(response.data.responseData);
    setreviews(response2.data.responseData);
  };
  useEffect(() => {
    getData();
    
  }, []);

  let images;

  if (detailstores.images) {
    //console.log('스토어 받은거', detailstores.images[0]);
    images = <Image style={{height: 250}} source={{uri: detailstores.images[0]}} />;
  } else {
    images = <Text>이미지 없음</Text>;
  };
  var i: number;
  let reviewList;
  const rs:Review[] = [];
  for(i=0;i<reviewLength;i++){
    //console.log(reviews[i]);
    rs.push(reviews[i]);
  };
  console.log(rs);
  reviewList = rs.map((review, index)=>(
    <Button
            title={review.name}
            key={review.id}
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
    //<Text key={review['id']} style={{color:'#000000'}}>{review['name']}</Text>
  ));
  return (
    <ScrollView>
      <View>
        <View>
          {/* 로딩중 이미지 먼저 넣어서 만들거나 다른 방법 찾아보기 */}

          {/* {<Image style={{height: 250}} source={{uri: stores.images[0]}} />} */}
          {images}
        </View>
        <View style={{alignItems: 'center', marginVertical: 8}}>
          <Text style={{ fontSize: 20, color:'#000000' }}>{detailstores.name}</Text>
          <View style={{flexDirection: 'row', marginVertical: '3%'}}>
            {reviewList}
          </View>
        </View>
        <View>
        {[1, 2, 3, 4, 5].map(el => (
          <View className={`fas fa-star ${(clicked >= el) | (hovered >= el) && 'yellowStar'}`}
            key={el}
            onMouseEnter={() => setHovered(el)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => setClicked(el)}
          />
        ))}
        </View>
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
const textList = [
  '별로에요',
  '그저 그래요',
  '보통이에요',
  '좋아요',
  '최고예요',
];
const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    backfaceVisibility: 'visible',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderRadius: 8,
    marginHorizontal: 8,
    marginVertical: 8,
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 16, marginHorizontal: '10%', marginVertical: '2%', color:'#000000'
  }
})
export default Review;