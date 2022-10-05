import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
  TextInput,
  Dimensions,
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
import DragItems from '../pages/DragItems';
import storeSlice from '../slices/stores';
import userSlice from '../slices/user';

type PreferenceProps = NativeStackScreenProps<ParamListBase, 'Preference'>;

function Preference({route, navigation}: PreferenceProps) {
  const dongId = route.params.selected;
  const [modalVisible, setModalVisible] = useState(false);
  const [modal2Visible, setModal2Visible] = useState(false);

  const [containerWidth, setContainerWidth] = useState(0);

  const numColumns = 5;
  const category = useSelector((state: RootState) => state.category);
  const dispatch = useAppDispatch();

  const getData = async () => {
    const response = await axios.get(
      'http://j7a104.p.ssafy.io:8080/categories',
    );
    console.log('서버에서 카페, 드링크가져왔음.');
    dispatch(
      categorySlice.actions.setCategory({
        cafe: response.data.responseData.cafes,
        drink: response.data.responseData.drinks,
      }),
    );
    dispatch(
      userSlice.actions.setPreference({
        dongId: dongId,
      }),
    );
  };
  const deleteData = async () => {
    dispatch(
      categorySlice.actions.deletCourse({
        mycourse: [],
        myfood: [],
        mycafe: [],
        myplay: [],
        mydrink: [],
        myprice: [],
      }),
    );
  };

  useEffect(() => {
    getData();
    deleteData();
  }, []);

  const arr = [
    [
      {
        category: '음식',
        name: [
          {
            image:
              'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F28fd41b0-20a9-48ce-a8b2-ec61b1836be3%2FUntitled.png?table=block&id=ca8d7ee9-aa22-4319-8618-fdcc7601ad65&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2',
            name: '한식',
            id: 1,
            categoryId: 1,
          },
          {
            image:
              'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F8176fa3c-2294-46da-ace4-91a44e61881b%2FUntitled.png?table=block&id=55de2f54-cc4f-41be-9edb-6e3fde0b9a8c&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2',
            name: '일식',
            id: 2,
            categoryId: 1,
          },
          {
            image:
              'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F2a18fb8f-401b-4b55-b758-b6c983292916%2Framen.png?table=block&id=d6c3f58d-13a6-4391-8a4a-3078521f0662&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2',
            name: '중식',
            id: 3,
            categoryId: 1,
          },
          {
            image:
              'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F35b00dfc-3ca5-45fb-ae1c-9ef95e1114a3%2Fpizza.png?table=block&id=b4e14a03-598f-497d-a52a-17851376b90e&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2',
            name: '양식',
            id: 4,
            categoryId: 1,
          },
          {
            image:
              'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F2dac789f-3dc8-44f7-9695-2c06abc7722e%2FUntitled.png?table=block&id=b8d5a4cd-4712-438a-a0f8-9c4142575e5d&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2',
            name: '고기',
            id: 5,
            categoryId: 1,
          },
          {
            image:
              'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F632a676b-f1c3-4386-b9aa-09ef5c5dadf3%2Fnoodles.png?table=block&id=da0b8697-69a5-4bb3-af09-fcd8a4cf47ff&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2',
            name: '면',
            id: 6,
            categoryId: 1,
          },
          {
            image:
              'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F83fff454-bf1c-4976-9f5f-eda807ba873c%2Ffried-rice.png?table=block&id=bd25712d-68f4-4dea-862a-ff87a161f41e&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2',
            name: '아시안',
            id: 7,
            categoryId: 1,
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
            id: 9,
            categoryId: 4,
          },
          {
            image:
              'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F82524ea8-4356-43b6-85d5-b9499c462892%2FUntitled.png?table=block&id=64f1150e-91cc-46d6-963f-6f20557b2357&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2',
            name: '게임',
            id: 10,
            categoryId: 4,
          },
          {
            image:
              'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F8104c490-aef9-4760-bb7e-4fc222249d61%2F2397304.png?table=block&id=d8c89e96-b201-48e8-a38a-34da30b42c3a&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2',
            name: '노래방',
            id: 11,
            categoryId: 4,
          },
          {
            image:
              'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F108d1a40-6cdb-4cdb-bcfb-fc9da45e1c6a%2F1719853.png?table=block&id=1d3e8487-662b-4e63-8e7f-0c24d2218aef&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2',
            name: '산책',
            id: 12,
            categoryId: 4,
          },
          {
            image:
              'https://salty-bell-a42.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fddf98b89-aa51-44eb-9356-b92c8cc5a746%2Fmall.png?table=block&id=79552fa2-b108-4621-8106-a66ffa79471f&spaceId=a4c83547-e899-439d-8e96-46d975d1103e&width=2000&userId=&cache=v2',
            name: '쇼핑몰 / 영화관',
            id: 8,
            categoryId: 4,
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
            id: 20000,
            categoryId: 5,
          },
          {
            image: 'https://cdn-icons-png.flaticon.com/512/639/639365.png',
            name: '2 - 4만원',
            id: 40000,
            categoryId: 5,
          },
          {
            image: 'https://cdn-icons-png.flaticon.com/512/639/639365.png',
            name: '4 - 6만원',
            id: 60000,
            categoryId: 5,
          },
          {
            image: 'https://cdn-icons-png.flaticon.com/512/639/639365.png',
            name: '6 - 8만원',
            id: 80000,
            categoryId: 5,
          },
          {
            image: 'https://cdn-icons-png.flaticon.com/512/639/639365.png',
            name: '8만원 이상',
            id: 100000,
            categoryId: 5,
          },
        ],
      },
    ],
  ];
  const [selectFood, setFood] = useState([]);
  const [selectCafe, setCafe] = useState([]);
  const [selectDrink, setDrink] = useState([]);
  const [selectActivity, setActivity] = useState([]);
  const [selectPrice, setPrice] = useState([]);

  const addPreference = (SelectedCategory: string) => {
    if (SelectedCategory.categoryId === 1) {
      if (!selectFood.includes(SelectedCategory.id)) {
        setFood([...selectFood, SelectedCategory.id]);
      }
      if (selectFood.includes(SelectedCategory.id)) {
        selectFood.splice(selectFood.indexOf(SelectedCategory.id), 1);
        setFood([...selectFood]);
      }
    }
    if (SelectedCategory.categoryId === 2) {
      if (!selectCafe.includes(SelectedCategory.id)) {
        setCafe([...selectCafe, SelectedCategory.id]);
      }
      if (selectCafe.includes(SelectedCategory.id)) {
        selectCafe.splice(selectCafe.indexOf(SelectedCategory.id), 1);
        setCafe([...selectCafe]);
      }
    }

    if (SelectedCategory.categoryId === 3) {
      if (!selectDrink.includes(SelectedCategory.id)) {
        setDrink([...selectDrink, SelectedCategory.id]);
      }
      if (selectDrink.includes(SelectedCategory.id)) {
        selectDrink.splice(selectDrink.indexOf(SelectedCategory.id), 1);
        setDrink([...selectDrink]);
      }
    }

    if (SelectedCategory.categoryId === 4) {
      if (!selectActivity.includes(SelectedCategory.id)) {
        setActivity([...selectActivity, SelectedCategory.id]);
      }
      if (selectActivity.includes(SelectedCategory.id)) {
        selectActivity.splice(selectActivity.indexOf(SelectedCategory.id), 1);
        setActivity([...selectActivity]);
      }
    }

    if (SelectedCategory.categoryId === 5) {
      if (selectPrice == false) {
        setPrice([...selectPrice, SelectedCategory.id]);
      }
      if (selectPrice.includes(SelectedCategory.id)) {
        selectPrice.splice(selectPrice.indexOf(SelectedCategory.id), 1);
        setPrice([...selectPrice]);
      } else {
        selectPrice.splice(selectPrice.indexOf(selectPrice[0]), 1);
        setPrice([...selectPrice]);
        setPrice([...selectPrice, SelectedCategory.id]);
      }
    }
  };
  useEffect(() => {}, [
    selectFood,
    selectCafe,
    selectDrink,
    selectActivity,
    selectPrice,
  ]);

  const Items = ({item, width}) => (
    <View
      style={{
        width,
        height: 70,
      }}>
      <TouchableOpacity
        onPress={() => {
          addPreference(item);
        }}>
        <Image
          style={
            (item.categoryId == 1 && selectFood.includes(item.id)) ||
            (item.categoryId == 2 && selectCafe.includes(item.id)) ||
            (item.categoryId == 3 && selectDrink.includes(item.id)) ||
            (item.categoryId == 4 && selectActivity.includes(item.id)) ||
            (item.categoryId == 5 && selectPrice.includes(item.id))
              ? {height: '70%', width: '100%', resizeMode: 'contain'}
              : {height: '60%', width: '100%', resizeMode: 'contain'}
          }
          source={{uri: item.image}}
        />
        <Text
          style={
            (item.categoryId == 1 && selectFood.includes(item.id)) ||
            (item.categoryId == 2 && selectCafe.includes(item.id)) ||
            (item.categoryId == 3 && selectDrink.includes(item.id)) ||
            (item.categoryId == 4 && selectActivity.includes(item.id)) ||
            (item.categoryId == 5 && selectPrice.includes(item.id))
              ? {color: 'orange', fontSize: 11, textAlign: 'center'}
              : {color: 'black', fontSize: 11, textAlign: 'center'}
          }>
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

  const myfood = useSelector((state: RootState) => state.category.myfood);
  const mycafe = useSelector((state: RootState) => state.category.mycafe);
  const mydrink = useSelector((state: RootState) => state.category.mydrink);
  const myplay = useSelector((state: RootState) => state.category.myplay);
  const myprice = useSelector((state: RootState) => state.category.myprice);
  const missionList = useSelector(
    (state: RootState) => state.course.missions.unclearMissions,
  );
  const stores = useSelector((state: RootState) => state.stores.stores);
  const userSpotLists = useSelector(
    (state: RootState) => state.userSpot.userSpotList,
  );
  useEffect(() => {
    if (userSpotLists.length > 2) {
      console.log('preference페이지입니다.');
      setModalVisible(false);
      setModal2Visible(true);
    }
  }, [userSpotLists]);

  useEffect(() => {
    console.log('스토어가 변경됩니다.');
    console.log(stores);
    setModal2Visible(false);
  }, [stores]);

  async function setMyCourse() {
    let courseLength =
      (selectFood.length > 0 ? 1 : 0) +
      (selectCafe.length > 0 ? 1 : 0) +
      (selectDrink.length > 0 ? 1 : 0) +
      (selectActivity.length > 0 ? 1 : 0);
    const checkblank = courseLength < 3 ? 0 : 1;

    if (checkblank === 0) {
      Alert.alert('코스를 더 선택해주세요');
    } else {
      dispatch(
        categorySlice.actions.setCourse({
          myfood: selectFood,
          mycafe: selectCafe,
          mydrink: selectDrink,
          myplay: selectActivity,
          myprice: selectPrice,
        }),
      );
      setModalVisible(true);
    }
  }

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <FlatList data={arr} renderItem={({item}) => <Item item={item} />} />
      </View>

      <TouchableOpacity
        style={styles.customBtnBG}
        onPress={() => {
          setMyCourse();
        }}>
        <Text style={styles.customBtnText}>취향 설정 완료</Text>
      </TouchableOpacity>

      {/* 모달부분 */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          deleteData();
          navigation.navigate('Home', {});
        }}>
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          onPress={() => {
            setModalVisible(false);
            navigation.navigate('Home', {});
          }}
        />
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <DragItems />
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" transparent={true} visible={modal2Visible}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: Dimensions.get('window').width / 2,
              height: Dimensions.get('window').width / 2,
            }}
            source={require('../assets/KakaoTalk_20221004_150552857.png')}
          />
          <Text style={{fontSize: 15, color: 'black'}}>기다려주세요.</Text>
        </View>
      </Modal>
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
  centeredView: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    top: '30%',
    width: '80%',
    height: '40%',
  },
  modalView: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 3,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    height: '100%',
    width: '100%',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
});

export default Preference;
