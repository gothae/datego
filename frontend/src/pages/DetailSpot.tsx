import * as React from 'react';
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
// type Menu = {
//   name: string
//   price: number
// }

function DetailSpot({navigation, route}: Props) {
  const spotId: number = route.params.spotId;
  // console.log('페이지아이디', spotId)
  // stores에 id에 해당되는 정보 불러오기
  const [detailstores, setstores] = useState<Store>({} as Store);
  const getData = async () => {
    console.log('페이지아이디', spotId);

    const response = await axios.get(
      `http://j7a104.p.ssafy.io:8080/courses/spots/${spotId}`,
    );
    // console.log('상세페이지', response.data.responseData)
    console.log({menu: response.data.responseData.tags});

    setstores(response.data.responseData);
  };
  useEffect(() => {
    getData();
  }, []);
  let images;

  if (detailstores.images) {
    console.log('스토어 받은거', detailstores.images[0]);
    images = (
      <Image style={{height: 250}} source={{uri: detailstores.images[0]}} />
    );
  } else {
    images = <Text>이미지 없음</Text>;
  }
  var i;
  let menuList;
  let priceList;
  let tagList;
  if (detailstores.tags) {
    const tags: string[] = [];
    for (i = 0; i < 3; i++) {
      tags.push('#' + detailstores.tags[i].name + ' ');
    }
    tagList = tags.map((tag, index) => <Text key={index}>{tag}</Text>);
  } else {
    tagList = <Text>태그 없음</Text>;
  }

  if (detailstores.menus) {
    const len = detailstores.menus.length;
    const menus: string[] = [];
    const prices: number[] = [];
    for (i = 0; i < len; i++) {
      menus.push(detailstores.menus[i].name);
      prices.push(detailstores.menus[i].price);
    }
    if (menus) {
      menuList = menus.map((menu, index) => <Text key={index}>{menu}</Text>);
      priceList = prices.map((price, index) => (
        <Text key={index}>{price}</Text>
      ));
    }
  } else {
    menuList = <Text>메뉴없음</Text>;
    priceList = <Text>메뉴없음</Text>;
  }
  let ratescore;
  if (detailstores.rate >= 4.5) {
    ratescore = <Text>★ ★ ★ ★ ★</Text>;
  } else if (detailstores.rate >= 3.5) {
    ratescore = <Text>★ ★ ★ ★ ☆</Text>;
  } else if (detailstores.rate >= 2.5) {
    ratescore = <Text>★ ★ ★ ☆ ☆</Text>;
  } else if (detailstores.rate > 1.5) {
    ratescore = <Text>★ ★ ☆ ☆ ☆</Text>;
  } else {
    ratescore = <Text>★ ☆ ☆ ☆ ☆ </Text>;
  }
  let scorerate;
  if (detailstores.rate) {
    scorerate = detailstores.rate.toFixed(1);
  } else {
    scorerate = 0;
  }
  let tag1;
  let tag2;
  let tag3;
  let tag4;
  let tag5;
  if (detailstores.tags) {
    tag1 = (
      <View style={styles.tag}>
        <Text style={styles.text}>{detailstores.tags[0].description}</Text>
        <Text style={styles.text}>{detailstores.tags[0].count}</Text>
      </View>
    );
    tag2 = (
      <View style={styles.tag}>
        <Text style={styles.text}>{detailstores.tags[1].description}</Text>
        <Text style={styles.text}>{detailstores.tags[1].count}</Text>
      </View>
    );
    tag3 = (
      <View style={styles.tag}>
        <Text style={styles.text}>{detailstores.tags[2].description}</Text>
        <Text style={styles.text}>{detailstores.tags[2].count}</Text>
      </View>
    );
    tag4 = (
      <View style={styles.tag}>
        <Text style={styles.text}>{detailstores.tags[3].description}</Text>
        <Text style={styles.text}>{detailstores.tags[3].count}</Text>
      </View>
    );
    tag5 = (
      <View style={styles.tag}>
        <Text style={styles.text}>{detailstores.tags[4].description}</Text>
        <Text style={styles.text}>{detailstores.tags[4].count}</Text>
      </View>
    );
  } else {
    tag1 = <Text> 태그 없음 </Text>;
    tag2 = <Text> 태그 없음 </Text>;
    tag3 = <Text> 태그 없음 </Text>;
    tag4 = <Text> 태그 없음 </Text>;
    tag5 = <Text> 태그 없음 </Text>;
  }
  // var sortingField = "count"

  // tagList.sort()
  // if (stores.tags) {

  // }
  // if (stores.menus) {
  //   for (i = 0 i < len i++) {
  //     menu.push(stores.menus.name)
  //     price.push(stores.menus.price)
  //     console.log(menu)
  //   }
  // }
  // if (stores.menus) {
  //   const menuList = stores.menus.map((menu, index) => (
  //     <Text key={index}>{menu}</Text>
  //   ))
  //   const priceList = stores.menus.map((price, index) => (
  //     <Text key={index}>{price}</Text>
  //   ))

  // if (stores.menus){
  //   menus = <Text style={{ marginLeft: 8, marginVertical: 8, fontSize: 16 }}>{stores.menus} {stores.price}</Text>
  // }
  // else{
  //   menus = <Text>메뉴 없음</Text>
  // }
  // const stores =  { name: 'STUN HOUS', tel: '0507-1304-1597', addr1: '갈월동 19-4', addr2: '갈월동', Latitude: 37.5454352, Longitude: 126.9726477, menu: ['Popresso', '아메리카노'], price: [4500, 3000], thumb: 'https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190826_277%2F1566788683492Jeaet_JPEG%2FUAX7h1H3Lg2fsyUL8-4vd8Vk.jpg', rating: 2.65 }
  //   const menuList = useMemo(() => {
  //     if (stores.menus)
  //   return stores.menus.map((menu, index) => (<Text key={index}>{menu}</Text>))
  //   },
  //  [stores])
  //   const priceList = useMemo(() => {
  //     if (stores.price)
  //     return stores.price.map((price, index) => (<Text key={index}>{price}</Text>))
  //   },
  //   [stores])
  return (
    <ScrollView>
      <View>
        <View>
          {/* 로딩중 이미지 먼저 넣어서 만들거나 다른 방법 찾아보기 */}

          {/* {<Image style={{height: 250}} source={{uri: stores.images[0]}} />} */}
          {images}
        </View>
        <View style={{alignItems: 'center', marginVertical: 8}}>
          <Text style={{fontSize: 20}}>{detailstores.name}</Text>
          <View style={{flexDirection: 'row', marginVertical: '3%'}}>
            {tagList}
          </View>
          <Text style={{color: '#FFA856', fontSize: 32}}>{ratescore}</Text>
          <Text>{scorerate} / 5.0 </Text>
        </View>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesomeIcon
              icon={faLocationDot}
              style={{alignItems: 'flex-end', marginLeft: 8}}
            />
            <Text style={{marginLeft: 8, marginVertical: 8, fontSize: 16}}>
              {detailstores.address}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <FontAwesomeIcon
              icon={faPhone}
              style={{alignItems: 'flex-end', marginLeft: 8}}
            />
            <Text style={{marginLeft: 8, marginVertical: 8, fontSize: 16}}>
              {detailstores.phone}
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <FontAwesomeIcon
              icon={faClipboard}
              style={{alignItems: 'flex-end'}}
            />
            {/* <Text style={{ marginLeft: 8, marginVertical: 8, fontSize: 16 }}>{stores.menu} {stores.price}</Text> */}

            <View style={{flexDirection: 'row'}}>
              <View style={{marginVertical: 12, marginRight: '12%'}}>
                {menuList}
              </View>
              <View style={{marginVertical: 12}}>{priceList}</View>
            </View>
          </View>
        </View>
        <View>
          {tag1}
          {tag2}
          {tag3}
          {tag4}
          {tag5}
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
  },
});
export default DetailSpot;
