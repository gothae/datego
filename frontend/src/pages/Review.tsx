import * as React from 'react';
import {ImStarFull} from 'react-icons/im';
import styled from 'styled-components';
import {View, Text, Image, ScrollView, StyleSheet, Pressable} from 'react-native';
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
import {stores} from './ChangeSpot';
import {Menu} from 'react-native-paper';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
// type DetailSpotProps = NativeStackScreenProps<ParamListBase, 'DetailSpot'>
type Props = {
  route: any;
  navigation: any;
};
// type Review = {
//   id: number;
//   name: string;
// };
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
  image: string;
  rate: number;
  tags: any;
};

let reviewLength: number;
function Review({navigation, route}: Props) {
  const spotId: number = 1;
  // const stores = useSelector((state: RootState) => state.stores).stores;
  const [stores, setStores] = useState<Store>({} as Store);
  const [hovered, setHovered] = useState(null);
  const [clicked, setClicked] = useState(null);
  // console.log('페이지아이디', spotId)
  // stores에 id에 해당되는 정보 불러오기
  const [detailstores, setDetailstores] = useState<Store>({} as Store);
  const [reviews, setReviews] = useState([]);
  let title;

  const getData = async () => {
    const response = await axios.get(
      `http://j7a104.p.ssafy.io:8080/courses/spots/${spotId}`,
    );
    const response2 = await axios.get(
      `http://j7a104.p.ssafy.io:8080/spots/${spotId}/reviews`,
    );
    reviewLength = response2.data.responseData.length;
    setDetailstores(response.data.responseData);
    setReviews(response2.data.responseData);
  };
  useEffect(() => {
    getData();
    setStores({ "address": "서울특별시 용산구 이촌동 301-155", "id": 1079, "image": "\"https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjAzMTJfOTEg%2FMDAxNjQ3MDY5Mzk2NzU0.dnC7J2ToMGXAwratpmje1zqTEvC8iGBGK5i2OmN34eog.Av_Z8KB903Mg-ZUmfuggdf6JZ2YCDr3e0z0z6rtTSJ8g.JPEG.yangrijjang%2F20220118_151854.jpg\"", "latitude": 37.5217268, "longitude": 126.9671423, "name": "브루클린더버거조인트 동부이촌점", "phone": "02-790-7180", "price": 9800, "quest": "빨강이를 키우자", "rate": 5, "tags": [Array] })
    console.log("디테일스토어", detailstores)
    console.log('스토어', stores)
    console.log('리뷰', reviews.length)
  }, []);

  let images;
  if (stores.image) {
    if (stores.image[0] == '\"') {
      images = <Image style={{height: 250}} source={{ uri: stores.image.slice(1, stores.image.length) }} />
    } else {
      images = <Image style={{height: 250}} source={{ uri: stores.image }} />
    }
  }
  // if (stores.images) {
  //   if (stores.images[0][0] == 'h') {
  //     images = <Image style={styles.imageBox} source={{ uri: stores.images[0] }} />;
  //   }
  //   else if (stores.images[0][1] == 'h') {
  //     images = <Image style={styles.imageBox} source={{ uri: stores.images[0].slice(1, stores.images[0].length - 1) }} />
  //   } else {
  //     images = <Image style={styles.imageBox} source={{ uri: stores.images[0].slice(1, stores.images[0].length - 1) }} />
  //   }
  // }


  // if (stores.images) {
  //   //console.log('스토어 받은거', detailstores.images[0]);
  //   images = (
  //     <Image style={{height: 250}} source={{uri: stores.images[0]}} />
  //   );
  // } else {
  //   images = <Text>이미지 없음</Text>;
  // }
  let reviewList;
  useEffect(() => {
    let i: number;
    const rs: Review[] = [];
    for (i = 0; i < reviews.length; i++) {
      //console.log(reviews[i]);
      rs.push(reviews[i]);
    }
    console.log('rs',rs);

  }, [stores])
  //reviewList = rs.map((review, index)=>(
  //console.log(review.name)
  // <Button
  //         title={review.name}
  //         key={review.id}
  //         color={'#FFA856'}
  //         titleStyle={{
  //           color: 'white',
  //           fontSize: 16,
  //         }}
  //         style={{
  //           borderRadius: 60,
  //           width: 100,
  //         }}
  //       />
  //<Text key={review['id']} style={{color:'#000000'}}>{review['name']}</Text>
  //));
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
            {stores.name}
          </Text>
          <View style={{flexDirection: 'row', marginVertical: '3%'}}>
            {reviewList}
          </View>
        </View>
        <View>
          {reviews?.map((review: any) => {
            return <Pressable
              onPress={() => {
              console.log('추가', review.id);
              }}>
              <Text style={{ color: '#000000' }}>{review.name}</Text></Pressable>
          })}
        </View>
        {/* <View>
          {[1, 2, 3, 4, 5].map(el => (
            <View
              className={`fas fa-star ${
                (clicked >= el) | (hovered >= el) && 'yellowStar'
              }`}
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
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 16,
    marginHorizontal: '10%',
    marginVertical: '2%',
    color: '#000000',
  },
  storeList: {
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
export default Review;
