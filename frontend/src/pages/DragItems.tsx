import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  Pressable,
  Animated,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {DraxProvider, DraxView, DraxList} from 'react-native-drax';
import {useEffect, useState} from 'react';
import {useAppDispatch} from '../store';
import categorySlice from '../slices/category';
import storeSlice from '../slices/stores';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import axios from 'axios';
import algolistSlice from '../slices/algolist';
import courseSlice from '../slices/course';
import userSpotSlice from '../slices/userSpot';

const gestureRootViewStyle = {flex: 1};

// export default function DragItems({navigation}) {
function DragItems() {
  const navigation = useNavigation();
  const dongId = useSelector((state: RootState) => state.user.dongId);
  const userId = useSelector((state: RootState) => state.user.id);
  const myfood = useSelector((state: RootState) => state.category.myfood);
  const mycafe = useSelector((state: RootState) => state.category.mycafe);
  const myplay = useSelector((state: RootState) => state.category.myplay);
  const mydrink = useSelector((state: RootState) => state.category.mydrink);
  const myprice = useSelector((state: RootState) => state.category.myprice);

  const draggableItemList = [
    {
      id: 1,
      name: '밥',
      image: 'https://cdn-icons-png.flaticon.com/512/894/894483.png',
      background_color: '#FFE79C',
    },
    {
      id: 2,
      name: '카페',
      image: 'https://cdn-icons-png.flaticon.com/512/590/590836.png',
      background_color: '#FFEAD6',
    },
    {
      id: 3,
      name: '음주',
      image: 'https://cdn-icons-png.flaticon.com/512/1744/1744761.png',
      background_color: '#FFE79C',
    },
    {
      id: 4,
      name: '활동',
      image: 'https://cdn-icons-png.flaticon.com/512/1886/1886385.png',
      background_color: '#FFEAD6',
    },
  ];
  const FirstReceivingItemList = [
    {
      id: 0,
      name: '채워주세요',
      image: 'https://cdn-icons-png.flaticon.com/512/2476/2476199.png',
      background_color: '#D8D8D8',
    },
    {
      id: 0,
      name: '채워주세요',
      image: 'https://cdn-icons-png.flaticon.com/512/2476/2476199.png',
      background_color: '#D8D8D8',
    },
    {
      id: 0,
      name: '채워주세요',
      image: 'https://cdn-icons-png.flaticon.com/512/2476/2476199.png',
      background_color: '#D8D8D8',
    },
    {
      id: 0,
      name: '채워주세요',
      image: 'https://cdn-icons-png.flaticon.com/512/2476/2476199.png',
      background_color: '#D8D8D8',
    },
    {
      id: 0,
      name: '채워주세요',
      image: 'https://cdn-icons-png.flaticon.com/512/2476/2476199.png',
      background_color: '#D8D8D8',
    },
  ];

  const [receivingItemList, setReceivedItemList] = React.useState(
    FirstReceivingItemList,
  );
  const [dragItemMiddleList, setDragItemListMiddle] =
    React.useState(draggableItemList);

  const DragUIComponent = ({item, index}) => {
    return (
      <DraxView
        style={{
          borderRadius: 5,
          width: Dimensions.get('window').width / 4 - 30,
          height: Dimensions.get('window').width / 4 - 30,
          justifyContent: 'center',
          marginRight: 5,
          backgroundColor: item.background_color,
        }}
        draggingStyle={styles.dragging}
        dragReleasedStyle={styles.dragging}
        hoverDraggingStyle={styles.hoverDragging}
        dragPayload={index}
        longPressDelay={100}
        key={index}>
        <Image
          style={{height: '60%', width: '100%', resizeMode: 'contain'}}
          source={{uri: item.image}}
        />
        <Text style={{fontSize: 12, textAlign: 'center', color: 'black'}}>
          {item.name}
        </Text>
      </DraxView>
    );
  };

  const ReceivingZoneUIComponent = ({item, index}) => {
    return (
      <DraxView
        style={{
          borderRadius: 5,
          height: Dimensions.get('window').width / 4 - 40,
          width: Dimensions.get('window').width / 4 - 40,
          justifyContent: 'center',
          backgroundColor: item.background_color,
        }}
        receivingStyle={styles.receiving}
        renderContent={({viewState}) => {
          const receivingDrag = viewState && viewState.receivingDrag;
          const payload = receivingDrag && receivingDrag.payload;
          return (
            <View>
              <Image
                style={{
                  height: '60%',
                  width: '100%',
                  resizeMode: 'contain',
                }}
                source={{uri: item.image}}
              />
              <Text
                style={
                  item.name.length > 3
                    ? {fontSize: 8, textAlign: 'center', color: 'black'}
                    : {fontSize: 9, textAlign: 'center', color: 'black'}
                }>
                {item.name}
              </Text>
            </View>
          );
        }}
        key={index}
        onReceiveDragDrop={event => {
          let selected_item = dragItemMiddleList[event.dragged.payload];
          let newReceivingItemList = [...receivingItemList];
          newReceivingItemList[index] = selected_item;
          setReceivedItemList(newReceivingItemList);

          let newDragItemMiddleList = [...dragItemMiddleList];

          newDragItemMiddleList[event.dragged.payload] =
            receivingItemList[index];
          // 기본으로 있는 밥, 카페, 음주, 활동을 옮겼을때 셋팅해주는 곳
          // setDragItemListMiddle(newDragItemMiddleList);
        }}
      />
    );
  };
  const dispatch = useAppDispatch();
  const [currentcourse, setMyCourse] = useState([]);

  useEffect(() => {
    async function setStateCourse() {
      let checklist = [];
      for (let i = 0; i < receivingItemList.length; i++) {
        if (receivingItemList[i].id) {
          checklist.push(receivingItemList[i].id);
        }
      }
      setMyCourse(checklist);
    }
    setStateCourse();
  }, [receivingItemList]);

  // useEffect(() => {
  //   console.log('현재내코스 설정');
  //   dispatch(
  //     categorySlice.actions.setCourse({
  //       mycourse: currentcourse,
  //     }),
  //   );
  // }, [currentcourse]);

  const FlatListItemSeparator = () => {
    return <View style={styles.itemSeparator} />;
  };
  const [modalVisible, setModalVisible] = useState(false);

  console.log('모달상태보자');
  console.log(modalVisible);
  console.log('모달상태보자');

  async function deletemodal() {
    console.log('닫을게');
    setModalVisible(false);
    console.log(modalVisible);
  }
  async function openModal() {
    console.log('열게');
    setModalVisible(true);
    console.log(modalVisible);
  }
  const goNext = async () => {
    console.log('닫아');
    await deletemodal();
    console.log('닫았어');
    navigation.navigate('Course', {});
  };
  console.log('dragItem 입니다');
  async function setPreference() {
    if (currentcourse.length > 2) {
      console.log('열어');
      await openModal();
      console.log(modalVisible);

      console.log('열었어');

      console.log('현재코스', currentcourse);
      console.log('음식', myfood);
      console.log('카페', mycafe);
      console.log('놀이', myplay);
      console.log('음주', mydrink);
      console.log('가격', myprice[0]);
      console.log('동', dongId);
      console.log('유저아이디', userId);
      const missionList = [];
      const userSpotLists = [];
      for (let i = 0; i < currentcourse.length; i++) {
        missionList.push(i);
        userSpotLists.push(0);
      }
      dispatch(
        userSpotSlice.actions.setUserSpot({
          userSpotList: userSpotLists,
        }),
      );
      console.log('미션리스트');
      console.log(missionList);
      dispatch(
        courseSlice.actions.setCourse({
          missions: {
            unclearMissions: missionList,
            clearMissions: [],
          },
        }),
      );

      const response = await axios.post(
        `http://j7a104.p.ssafy.io:8000/courses/${dongId}`,
        {
          course: currentcourse,
          categoryList: {
            food: myfood,
            cafe: mycafe,
            play: myplay,
            drink: mydrink,
          },
          price: myprice[0],
          id: userId,
        },
      );
      console.log(response);

      dispatch(
        storeSlice.actions.setstore({
          stores: response.data.responseData.Spots,
        }),
      );
      const stores = response.data.responseData.Spots;
      if (stores?.length == 2) {
        dispatch(
          algolistSlice.actions.setalgolist({
            one: response.data.responseData.spotIds[0].first,
            two: response.data.responseData.spotIds[1].second,
          }),
        );
      } else if (stores?.length == 3) {
        dispatch(
          algolistSlice.actions.setalgolist({
            one: response.data.responseData.spotIds[0].first,
            two: response.data.responseData.spotIds[1].second,
            thr: response.data.responseData.spotIds[2].third,
          }),
        );
      } else if (stores?.length == 4) {
        dispatch(
          algolistSlice.actions.setalgolist({
            one: response.data.responseData.spotIds[0].first,
            two: response.data.responseData.spotIds[1].second,
            thr: response.data.responseData.spotIds[2].third,
            fou: response.data.responseData.spotIds[3].fourth,
          }),
        );
      } else if (stores?.length == 5) {
        dispatch(
          algolistSlice.actions.setalgolist({
            one: response.data.responseData.spotIds[0].first,
            two: response.data.responseData.spotIds[1].second,
            thr: response.data.responseData.spotIds[2].third,
            fou: response.data.responseData.spotIds[3].fourth,
            fiv: response.data.responseData.spotIds[4].fifth,
          }),
        );
      }
      goNext();
    } else {
      Alert.alert('코스 순서를 설정해주세요 (3개이상)');
    }
  }

  return (
    <GestureHandlerRootView style={gestureRootViewStyle}>
      <DraxProvider>
        <View style={styles.container}>
          <View
            style={{
              backgroundColor: '#FFA856',
              flex: 0.5,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: 22,
                marginLeft: 10,
              }}>
              코스 순서 설정
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flex: 1,
            }}>
            {dragItemMiddleList.map((item, index) =>
              DragUIComponent({item, index}),
            )}
          </View>
          <Text style={{fontSize: 9, color: 'black'}}>
            ※ 위 아이콘을 아래로 드래그해서 설정해주세요.
          </Text>
          <Text style={{fontSize: 12, color: 'black'}}>
            코스순서 ( 3개 이상 넣어주세요. )
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flex: 0.8,
            }}>
            {receivingItemList.map((item, index) =>
              ReceivingZoneUIComponent({item, index}),
            )}
          </View>
          <TouchableOpacity
            style={{backgroundColor: '#FFA856'}}
            onPress={() => {
              setPreference();
            }}>
            <Text style={{textAlign: 'center', fontSize: 20, color: '#fff'}}>
              순서 설정 완료
            </Text>
          </TouchableOpacity>
        </View>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
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
      </DraxProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredContent: {
    borderRadius: 5,
  },
  receivingZone: {},
  receiving: {
    borderColor: 'red',
    borderWidth: 2,
  },
  draggableBox: {},
  dragging: {
    opacity: 0.5,
  },
  hoverDragging: {
    borderColor: 'magenta',
    borderWidth: 2,
  },
  receivingContainer: {},
  itemSeparator: {
    height: 15,
  },
  draxListContainer: {
    flex: 1,
  },
  receivingZoneContainer: {
    padding: 5,
    height: 100,
  },
  textStyle: {},
  headerStyle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  DragContainer: {
    backgroundColor: 'black',
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: 'powderblue',
  },
});

export default DragItems;