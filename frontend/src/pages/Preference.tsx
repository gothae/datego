import * as React from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {useAppDispatch} from '../store';
import categorySlice from '../slices/category';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import PriceBar from '../pages/PriceBar';

type PreferenceProps = NativeStackScreenProps<ParamListBase, 'Preference'>;

function Preference({navigation}: PreferenceProps) {
  const [count, setCount] = useState(0);

  const [containerWidth, setContainerWidth] = useState(0);

  const numColumns = 5;
  const category = useSelector((state: RootState) => state.category);
  const dispatch = useAppDispatch();

  const getData = async () => {
    console.log(2);
    const response = await axios.get(
      'http://j7a104.p.ssafy.io:8080/categories',
    );
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

  console.log(1);
  // console.log(category);
  // console.log(category.cafe);
  // console.log(category.drink);

  const arr = [
    [
      {
        category: '음식',
        name: [
          {
            image:
              'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F28fd41b0-20a9-48ce-a8b2-ec61b1836be3%2FUntitled.png?table=block&id=ca8d7ee9-aa22-4319-8618-fdcc7601ad65&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2',
            name: '한식',
          },
          {
            image:
              'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F8176fa3c-2294-46da-ace4-91a44e61881b%2FUntitled.png?table=block&id=55de2f54-cc4f-41be-9edb-6e3fde0b9a8c&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2',
            name: '일식',
          },
          {
            image:
              'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F2a18fb8f-401b-4b55-b758-b6c983292916%2Framen.png?table=block&id=d6c3f58d-13a6-4391-8a4a-3078521f0662&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2',
            name: '중식',
          },
          {
            image:
              'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F35b00dfc-3ca5-45fb-ae1c-9ef95e1114a3%2Fpizza.png?table=block&id=b4e14a03-598f-497d-a52a-17851376b90e&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2',
            name: '양식',
          },
          {
            image:
              'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F2dac789f-3dc8-44f7-9695-2c06abc7722e%2FUntitled.png?table=block&id=b8d5a4cd-4712-438a-a0f8-9c4142575e5d&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2',
            name: '고기',
          },
          {
            image:
              'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F632a676b-f1c3-4386-b9aa-09ef5c5dadf3%2Fnoodles.png?table=block&id=da0b8697-69a5-4bb3-af09-fcd8a4cf47ff&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2',
            name: '면',
          },
          {
            image:
              'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F83fff454-bf1c-4976-9f5f-eda807ba873c%2Ffried-rice.png?table=block&id=bd25712d-68f4-4dea-862a-ff87a161f41e&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2',
            name: '아시안',
          },
        ],
      },
    ],
    [{category: '카페', name: category.cafe}],
    [{category: '음주', name: category.drink}],
    [
      {
        category: '활동',
        name: [
          {
            image:
              'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fc9d977c0-8800-4e67-9717-2133f57dad9a%2FUntitled.png?table=block&id=233a9777-d388-497d-a8a4-0b79a607c60e&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2',
            name: '실내스포츠',
          },
          {
            image:
              'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F82524ea8-4356-43b6-85d5-b9499c462892%2FUntitled.png?table=block&id=64f1150e-91cc-46d6-963f-6f20557b2357&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2',
            name: '게임',
          },
          {
            image:
              'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F8104c490-aef9-4760-bb7e-4fc222249d61%2F2397304.png?table=block&id=d8c89e96-b201-48e8-a38a-34da30b42c3a&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2',
            name: '노래방',
          },
          {
            image:
              'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F108d1a40-6cdb-4cdb-bcfb-fc9da45e1c6a%2F1719853.png?table=block&id=1d3e8487-662b-4e63-8e7f-0c24d2218aef&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2',
            name: '산책',
          },
          {
            image:
              'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fddf98b89-aa51-44eb-9356-b92c8cc5a746%2Fmall.png?table=block&id=79552fa2-b108-4621-8106-a66ffa79471f&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2',
            name: '쇼핑몰 / 영화관',
          },
        ],
      },
    ],
    [
      {
        category: '가격',
        name: [
          {
            image: 'https://cdn-icons-png.flaticon.com/512/639/639365.png',
            name: '2만원이하',
          },
          {
            image: 'https://cdn-icons-png.flaticon.com/512/639/639365.png',
            name: '2 - 4만원',
          },
          {
            image: 'https://cdn-icons-png.flaticon.com/512/639/639365.png',
            name: '4 - 6만원',
          },
          {
            image: 'https://cdn-icons-png.flaticon.com/512/639/639365.png',
            name: '6 - 8만원',
          },
          {
            image: 'https://cdn-icons-png.flaticon.com/512/639/639365.png',
            name: '8만원 이상',
          },
        ],
      },
    ],
  ];
  const test = (SelectedCategory: string) => {
    console.log(SelectedCategory);
  };
  const Items = ({item, width}) => (
    <View
      style={{
        width,
        height: 70,
      }}>
      <TouchableOpacity
        onPress={() => {
          test(item.name);
        }}>
        <Image
          style={{height: '60%', width: '100%', resizeMode: 'contain'}}
          source={{uri: item.image}}
        />
        <Text style={{color: 'black', fontSize: 11, textAlign: 'center'}}>
          {item.name}
        </Text>
      </TouchableOpacity>
    </View>
  );

  const Item = ({item}) => (
    <View>
      <Text style={{color: 'black', fontSize: 20, marginLeft: 10}}>
        {item[0].category}
      </Text>
      <FlatList
        data={item[0].name}
        onLayout={e => setContainerWidth(e.nativeEvent.layout.width)}
        renderItem={({item}) => (
          <Items item={item} width={containerWidth / numColumns} />
        )}
        numColumns={numColumns}
      />
    </View>
  );

  const CourseItem: Object = ({item}) => {
    <View>
      <Text style={{color: 'black', fontSize: 20, marginLeft: 10}}>
        {item[0].title}
      </Text>
    </View>;
  };
  const CourseItemarr = [
    [
      {
        category: '코스 설정',
        name: [
          {
            image: 'https://cdn-icons-png.flaticon.com/512/639/639365.png',
            name: '음식',
          },
          {
            image: 'https://cdn-icons-png.flaticon.com/512/639/639365.png',
            name: '카페',
          },
          {
            image: 'https://cdn-icons-png.flaticon.com/512/639/639365.png',
            name: '음주',
          },
          {
            image: 'https://cdn-icons-png.flaticon.com/512/639/639365.png',
            name: '활동',
          },
        ],
      },
    ],
  ];

  return (
    <View style={{flex: 1}}>
      {/* <View>
          <PriceBar totalStep={12} nowStep={count} />
          <Button onPress={() => setCount(prev => prev + 3)} title="1증가" />
          <Button onPress={() => setCount(prev => --prev)} title="1감소" />
        </View> */}
      <View style={{flex: 1}}>
        <FlatList data={arr} renderItem={({item}) => <Item item={item} />} />
      </View>
      <View>
        <FlatList
          data={CourseItemarr}
          renderItem={({item}) => <Item item={item} />}
        />
      </View>
      <TouchableOpacity
        style={styles.customBtnBG}
        onPress={() => {
          navigation.navigate('Course', {});
        }}>
        <Text style={styles.customBtnText}>설정 완료</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  customBtnText: {
    textAlign: 'center',
    fontSize: 30,
    color: '#fff',
  },

  customBtnBG: {
    backgroundColor: '#FFA856',
  },
});

export default Preference;
