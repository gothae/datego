import * as React from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
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
  tags: string[];
};
// type Menu = {
//   name: string;
//   price: number;
// };

function DetailSpot({navigation, route}: Props) {
  const spotId: number = route.params.spotId;
  // console.log('페이지아이디', spotId)
  // stores에 id에 해당되는 정보 불러오기
  const [stores, setstores] = useState<Store>({} as Store);
  const getData = async () => {
    console.log('페이지아이디', spotId);

    const response = await axios.get(
      `http://10.0.2.2:8080/courses/spots/${spotId}`,
    );
    // console.log('상세페이지', response.data.responseData)
    console.log({menu: response.data.responseData.menus[0].name});

    setstores(response.data.responseData);
  };
  useEffect(() => {
    getData();
  }, []);
  let images;

  if (stores.images) {
    console.log('스토어 받은거', stores.images[0]);
    images = <Image style={{height: 250}} source={{uri: stores.images[0]}} />;
  } else {
    images = <Text>이미지 없음</Text>;
  }
  var i;
  if (stores.menus) {
    const len = stores.menus.length;
    const menus: string[] = [];
    const prices: number[] = [];
    for (i = 0; i < len; i++) {
      menus.push(stores.menus[i].name);
      prices.push(stores.menus[i].price);
      console.log(menus);
    }
    if (menus) {
      const menuList = menus.map((menu, index) => (
        <Text key={index}>{menu}</Text>
      ));
      const priceList = prices.map((price, index) => (
        <Text key={index}>{price}</Text>
      ));
    }
  } else {
    const menuList = <Text>메뉴없음</Text>;
    const priceList = <Text>메뉴없음</Text>;
  }

  // if (stores.menus) {
  //   for (i = 0; i < len; i++) {
  //     menu.push(stores.menus.name);
  //     price.push(stores.menus.price);
  //     console.log(menu);
  //   }
  // }
  // if (stores.menus) {
  //   const menuList = stores.menus.map((menu, index) => (
  //     <Text key={index}>{menu}</Text>
  //   ));
  //   const priceList = stores.menus.map((price, index) => (
  //     <Text key={index}>{price}</Text>
  //   ));

  // if (stores.menus){
  //   menus = <Text style={{ marginLeft: 8, marginVertical: 8, fontSize: 16 }}>{stores.menus} {stores.price}</Text>;
  // }
  // else{
  //   menus = <Text>메뉴 없음</Text>;
  // }
  // const stores =  { name: 'STUN HOUS', tel: '0507-1304-1597', addr1: '갈월동 19-4', addr2: '갈월동', Latitude: 37.5454352, Longitude: 126.9726477, menu: ['Popresso', '아메리카노'], price: [4500, 3000], thumb: 'https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190826_277%2F1566788683492Jeaet_JPEG%2FUAX7h1H3Lg2fsyUL8-4vd8Vk.jpg', rating: 2.65 }
  //   const menuList = useMemo(() => {
  //     if (stores.menus)
  //   return stores.menus.map((menu, index) => (<Text key={index}>{menu}</Text>));
  //   },
  //  [stores]);
  //   const priceList = useMemo(() => {
  //     if (stores.price)
  //     return stores.price.map((price, index) => (<Text key={index}>{price}</Text>));
  //   },
  //   [stores]);
  return (
    <ScrollView>
      <View>
        <View>
          {/* 로딩중 이미지 먼저 넣어서 만들거나 다른 방법 찾아보기 */}

          {/* {<Image style={{height: 250}} source={{uri: stores.images[0]}} />} */}
          {images}
        </View>
        <View style={{alignItems: 'center', marginVertical: 8}}>
          <Text style={{fontSize: 20}}>{stores.name}</Text>
          <Text>가게태그</Text>
          <Text>{stores.rate} </Text>
          <Text style={{color: '#FFA856', fontSize: 32}}>★ ★ ★ ★ ★</Text>
        </View>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesomeIcon
              icon={faLocationDot}
              style={{alignItems: 'flex-end', marginLeft: 8}}
            />
            <Text style={{marginLeft: 8, marginVertical: 8, fontSize: 16}}>
              {stores.address}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesomeIcon
              icon={faPhone}
              style={{alignItems: 'flex-end', marginLeft: 8}}
            />
            <Text style={{marginLeft: 8, marginVertical: 8, fontSize: 16}}>
              {stores.phone}
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <FontAwesomeIcon
              icon={faClipboard}
              style={{alignItems: 'flex-end', marginLeft: 8}}
            />
            {/* <Text style={{ marginLeft: 8, marginVertical: 8, fontSize: 16 }}>{stores.menu} {stores.price}</Text> */}

            <View style={{flexDirection: 'row'}}>
              <View style={{marginVertical: 8, marginHorizontal: 8}}>
                {menuList}
              </View>
              <View style={{marginVertical: 8, marginHorizontal: 8}}>
                <Text>{stores.price}</Text>
              </View>
            </View>
          </View>
        </View>
        <View>
          <Text>리뷰디테일</Text>
        </View>
        <Button
          title="장소변경페이지로"
          onPress={() => {
            navigation.navigate('ChangeSpot', {});
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 16,
            marginVertical: 8,
          }}>
          <Button
            title="닫기"
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
            title="변경"
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

export default DetailSpot;
