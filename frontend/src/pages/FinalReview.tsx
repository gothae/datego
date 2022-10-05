import * as React from 'react';
import {Rating} from 'react-native-ratings';
import {
  View,
  Text,
  Modal,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import {useEffect, useState} from 'react';
import axios from 'axios';

function FinalReview() {
  // const stores = useSelector((state: RootState) => state.stores.stores);
  const stores = [
    {
      address: '서울 용산구 서계동 219-4',
      id: 1004,
      image:
        '"https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMjA4MjhfMjMy%2FMDAxNjYxNjYzODUxNTM2.F8MKnyz0TMxlvAwB6lDWGJlx1UpYP3AfhtBPj1WoHfgg.fv49IhoR3OSClwTvgpMy6HtF_cA_xVNiHA3mdBycV7Yg.JPEG.kimigirl%2FIMG_2774.jpg"',
      latitude: 37.5546911,
      longitude: 126.9687699,
      name: '24시 용산원조감자탕',
      phone: '02-797-1900',
      price: 8000,
      quest: '빨강 이를 키우자',
      rate: 4,
      tags: ['음식점', '격식있는', '고급스러운', '또먹고싶다'],
    },
    {
      address: '서계동 193-2',
      id: 139,
      image:
        '"https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220917_150%2F1663390791350tnAvY_JPEG%2FIMG_2093-a.jpg"',
      latitude: 37.5496462,
      longitude: 126.9695875,
      name: 'KGML',
      phone: '0507-1381-5835',
      price: 5700,
      quest: '꿀꿀이를 키우자!',
      rate: 5,
      tags: ['카페', '가 성비 좋은', '분위기 좋은', '감성카페'],
    },
    {
      address: '서계동 260-1',
      id: 2075,
      image:
        'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=w750&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20200219_118%2F1582101914305AtC9h_JPEG%2Fy0HflEzoGFCFhaev0CaknxBE.jpg',
      latitude: 37.5513263,
      longitude: 126.963478,
      name: '한장빈대떡',
      phone: '02-312-9584',
      price: 25000,
      quest: '빨강이를 키우자',
      rate: 2,
      tags: ['술집', '분위기좋은', '취향저격', '힙한'],
    },
  ];
  const [modalVisible0, setModalVisible0] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);
  const [reviews0, setRevuews0] = useState([]);
  const [reviews1, setRevuews1] = useState([]);
  const [reviews2, setRevuews2] = useState([]);
  const [reviews3, setRevuews3] = useState([]);
  const [reviews4, setRevuews4] = useState([]);

  async function getData0(spotId) {
    const response = await axios.get(
      `http://j7a104.p.ssafy.io:8080/spots/${spotId}/reviews`,
    );
    setRevuews0(response.data.responseData);
  }
  async function getData1(spotId) {
    const response = await axios.get(
      `http://j7a104.p.ssafy.io:8080/spots/${spotId}/reviews`,
    );
    setRevuews1(response.data.responseData);
  }
  async function getData2(spotId) {
    const response = await axios.get(
      `http://j7a104.p.ssafy.io:8080/spots/${spotId}/reviews`,
    );
    setRevuews2(response.data.responseData);
  }
  async function getData3(spotId) {
    const response = await axios.get(
      `http://j7a104.p.ssafy.io:8080/spots/${spotId}/reviews`,
    );
    setRevuews3(response.data.responseData);
  }
  async function getData4(spotId) {
    const response = await axios.get(
      `http://j7a104.p.ssafy.io:8080/spots/${spotId}/reviews`,
    );
    setRevuews4(response.data.responseData);
  }
  useEffect(() => {
    let spotId = 0;
    for (let i = 0; i < stores.length; i++) {
      if (i === 0) {
        setModalVisible0(true);
        spotId = stores[i].id;
        getData0(spotId);
      } else if (i === 1) {
        setModalVisible1(true);
        spotId = stores[i].id;
        getData1(spotId);
      } else if (i === 2) {
        setModalVisible2(true);
        spotId = stores[i].id;
        getData2(spotId);
      } else if (i === 3) {
        setModalVisible3(true);
        spotId = stores[i].id;
        getData3(spotId);
      } else if (i === 4) {
        setModalVisible4(true);
        spotId = stores[i].id;
        getData4(spotId);
      }
    }
  }, []);

  const numColumns = 3;

  const Item = ({item}) => (
    <View
      style={{
        backgroundColor: '#FFA856',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width / 3,
        height: Dimensions.get('window').height / 15,
        borderRadius: 30,
      }}>
      <Text
        style={{
          color: 'white',
          fontSize: 12,
        }}>
        #{item.name}
      </Text>
    </View>
  );
  const handleRating = (rate: number) => {
    console.log(rate);
    // other logic
  };
  return (
    <View>
      <View>
        <FlatList
          data={reviews0}
          renderItem={({item}) => <Item item={item} />}
          numColumns={numColumns}
        />
      </View>
      <View>
          <Rating 
          type="bell" 
          ratingCount={5}
          onFinishRating={handleRating} 
          fractions = {10}
          startingValue = {0}
          style={{ 
            paddingVertical: 10 }}
          />
        </View>
      {/* <Modal animationType="slide" transparent={true} visible={modalVisible0}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>
            <Text>이미지</Text>
          </View>
          <View>
            <Text>음식점이름</Text>
          </View>
          <View />
          <View>
            <Text>평점매기기</Text>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <TouchableOpacity
              style={{backgroundColor: 'red'}}
              onPress={() => {
                setModalVisible0(false);
                console.log(0);
              }}>
              <Text>평가안하기</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <TouchableOpacity
              style={{backgroundColor: 'blue'}}
              onPress={() => {
                setModalVisible0(false);
                console.log(0);
              }}>
              <Text>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
    </View>
  );
}

export default FinalReview;
