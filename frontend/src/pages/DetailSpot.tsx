import * as React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Animated,
} from 'react-native';
import {Button} from '@react-native-material/core';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faLocationDot,
  faPhone,
  faClipboard,
  faFire,
} from '@fortawesome/free-solid-svg-icons';
import {useState, useEffect, useMemo} from 'react';
import axios from 'axios';
import store, {useAppDispatch} from '../store';
import {Item} from './ChangeSpot';
import {Menu} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import storeSlice from '../slices/stores';
import AnimatedBar from 'react-native-animated-bar';
// type DetailSpotProps = NativeStackScreenProps<ParamListBase, 'DetailSpot'>
type Props = {
  route: any;
  navigation: any;
};
export type Store = {
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
  const stores: any = useSelector((state: RootState) => state.stores).stores;
  const storeindex: any = useSelector(
    (state: RootState) => state.stores,
  ).storeindex;
  const dispatch = useAppDispatch();
  function dispatchCourse(c: any) {
    dispatch(
      storeSlice.actions.setstore({
        stores: c,
        storeindex: storeindex,
      }),
    );
  }
  const replaceSelectedElement = (
    arr: any[],
    selectedIndex: number,
    newElement: any,
  ): any[] => {
    return arr.map((element: any, index: number) => {
      if (index === selectedIndex) {
        return newElement;
      }
      return element;
    });
  };
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
    if (detailstores.images[0][0] == 'h') {
      images = (
        <Image style={{height: 250}} source={{uri: detailstores.images[0]}} />
      );
    } else if (detailstores.images[0][1] == 'h') {
      images = (
        <Image
          style={{height: 250}}
          source={{
            uri: detailstores.images[0].slice(
              1,
              detailstores.images[0].length - 1,
            ),
          }}
        />
      );
    } else {
      images = (
        <Image
          style={{height: 250}}
          source={{
            uri: detailstores.images[0].slice(
              1,
              detailstores.images[0].length - 1,
            ),
          }}
        />
      );
    }
    // images = <Image style={{height: 250}} source={{uri: detailstores.images[0]}} />;
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
    tagList = tags.map((tag, index) => (
      <Text key={index} style={{color: '#000000'}}>
        {tag}
      </Text>
    ));
  } else {
    tagList = <Text style={{color: '#000000'}}>태그 없음</Text>;
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
      menuList = menus.map((menu, index) => (
        <Text key={index} style={{color: '#000000', fontSize: 18}}>
          {menu}
        </Text>
      ));
      priceList = prices.map((price, index) => (
        <Text key={index} style={{color: '#000000', fontSize: 18}}>
          {price}
        </Text>
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
    var countList = [];
    for (let index = 0; index < 5; index++) {
      countList.push(detailstores.tags[index].count);
    }
    const tempMaxCount = Math.max.apply(1, countList);
    tag1 = (
      <View style={styles.tag}>
        <AnimatedBar
          progress={detailstores.tags[0].count / tempMaxCount}
          // progress={0.7}
          height={40}
          borderColor="#DDD"
          fillColor="#DDD"
          barColor="#ffee58"
          borderRadius={8}
          borderWidth={4}
          row>
          <View style={styles.tag}>
            <View>
              <FontAwesomeIcon icon={faFire} style={{color: 'red'}} />
            </View>
            <View>
              <Text style={styles.barText}>
                {detailstores.tags[0].description}
              </Text>
            </View>
            <View>
              <Text style={{fontSize: 18, color: 'gray'}}>
                {detailstores.tags[0].count}
              </Text>
            </View>
          </View>
        </AnimatedBar>
      </View>
    );
    tag2 = (
      <View style={styles.tag}>
        <AnimatedBar
          progress={detailstores.tags[1].count / tempMaxCount}
          // progress={0.5}
          height={40}
          borderColor="#DDD"
          fillColor="#DDD"
          barColor="#fff176"
          borderRadius={8}
          borderWidth={3}
          row>
          <View style={styles.tag}>
            <View>
              <FontAwesomeIcon icon={faFire} style={{color: 'red'}} />
            </View>
            <View>
              <Text style={styles.barText}>
                {detailstores.tags[1].description}
              </Text>
            </View>
            <View>
              <Text style={{fontSize: 18, color: 'gray'}}>
                {detailstores.tags[1].count}
              </Text>
            </View>
          </View>
        </AnimatedBar>
      </View>
    );
    tag3 = (
      <View style={styles.tag}>
        <AnimatedBar
          progress={detailstores.tags[2].count / tempMaxCount}
          // progress={0.4}
          height={40}
          borderColor="#DDD"
          fillColor="#DDD"
          barColor="#fff59d"
          borderRadius={8}
          borderWidth={3}
          row>
          <View style={styles.tag}>
            <View>
              <FontAwesomeIcon icon={faFire} style={{color: 'red'}} />
            </View>
            <View>
              <Text style={styles.barText}>
                {detailstores.tags[2].description}
              </Text>
            </View>
            <View>
              <Text style={{fontSize: 18, color: 'gray'}}>
                {detailstores.tags[2].count}
              </Text>
            </View>
          </View>
        </AnimatedBar>
      </View>
    );
    tag4 = (
      <View style={styles.tag}>
        <AnimatedBar
          progress={detailstores.tags[3].count / tempMaxCount}
          // progress={0.3}
          height={40}
          borderColor="#DDD"
          fillColor="#DDD"
          barColor="#fff9c4"
          borderRadius={8}
          borderWidth={3}
          row>
          <View style={styles.tag}>
            <View>
              <FontAwesomeIcon icon={faFire} style={{color: 'red'}} />
            </View>
            <View>
              <Text style={styles.barText}>
                {detailstores.tags[3].description}
              </Text>
            </View>
            <View>
              <Text style={{fontSize: 18, color: 'gray'}}>
                {detailstores.tags[3].count}
              </Text>
            </View>
          </View>
        </AnimatedBar>
      </View>
    );
    tag5 = (
      <View style={styles.tag}>
        <AnimatedBar
          progress={detailstores.tags[4].count / tempMaxCount}
          // progress={0.2}
          height={40}
          borderColor="#DDD"
          fillColor="#DDD"
          barColor="#fffde7"
          borderRadius={8}
          borderWidth={3}
          row>
          <View style={styles.tag}>
            <View>
              <FontAwesomeIcon icon={faFire} style={{color: 'red'}} />
            </View>
            <View>
              <Text style={styles.barText}>
                {detailstores.tags[4].description}
              </Text>
            </View>
            <View>
              <Text style={{fontSize: 18, color: 'gray'}}>
                {detailstores.tags[4].count}
              </Text>
            </View>
          </View>
        </AnimatedBar>
      </View>
    );
  } else {
    tag1 = <Text> 태그 없음 </Text>;
    tag2 = <Text> 태그 없음 </Text>;
    tag3 = <Text> 태그 없음 </Text>;
    tag4 = <Text> 태그 없음 </Text>;
    tag5 = <Text> 태그 없음 </Text>;
  }

  return (
    <ScrollView>
      <View>
        <View>
          {/* 로딩중 이미지 먼저 넣어서 만들거나 다른 방법 찾아보기 */}

          {/* {<Image style={{height: 250}} source={{uri: stores.images[0]}} />} */}
          {images}
        </View>
        <View style={{alignItems: 'center', marginVertical: 8}}>
          <Text style={{fontSize: 30, color: '#000000', fontWeight: 'bold'}}>
            {detailstores.name}
          </Text>
          <View
            style={{flexDirection: 'row', marginVertical: '3%', fontSize: 15}}>
            {tagList}
          </View>
          <Text style={{color: '#FFA856', fontSize: 32}}>{ratescore}</Text>
          <Text style={{color: '#000000', fontSize: 15}}>
            {scorerate} / 5.0{' '}
          </Text>
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 10,
              backgroundColor: '#ECECEC',
            }}>
            <FontAwesomeIcon
              icon={faLocationDot}
              style={{alignItems: 'flex-end', marginLeft: 8}}
            />
            <Text
              style={{
                marginLeft: 8,
                marginVertical: 8,
                fontSize: 18,
                color: '#000000',
              }}>
              {detailstores.address}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#FAFAFA',
            }}>
            <FontAwesomeIcon
              icon={faPhone}
              style={{alignItems: 'flex-end', marginLeft: 8}}
            />
            <Text
              style={{
                marginLeft: 8,
                marginVertical: 8,
                fontSize: 18,
                color: '#000000',
              }}>
              {detailstores.phone}
            </Text>
          </View>
          <View style={{alignItems: 'center', marginTop: 20}}>
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
        <View style={{marginTop: 20, marginBottom: 50}}>
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
          color={'#FFA856'}
          titleStyle={{
            color: 'white',
            fontSize: 30,
            fontWeight: 'bold',
          }}
          style={{
            height: 48,
            justifyContent: 'center',
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginHorizontal: 16,
            marginVertical: 8,
          }}
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    backfaceVisibility: 'visible',
    flexWrap: 'wrap',
    marginHorizontal: '5%',
    // marginVertical: '1%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  text: {
    fontSize: 17,
    // marginHorizontal: '10%',
    // marginVertical: '2%',
    color: 'black',
  },
  barText: {
    fontSize: 18,
    // marginHorizontal: '5%',
    // marginVertical: '0%', //'0.8%',
    color: 'black',
  },
});
export default DetailSpot;
