import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
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

const gestureRootViewStyle = {flex: 1};

// export default function DragItems({navigation}) {
function DragItems() {
  const navigation = useNavigation();
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
      background_color: 'red',
    },
    {
      id: 2,
      name: '카페',
      image: 'https://cdn-icons-png.flaticon.com/512/590/590836.png',
      background_color: 'pink',
    },
    {
      id: 3,
      name: '음주',
      image: 'https://cdn-icons-png.flaticon.com/512/1744/1744761.png',
      background_color: 'orange',
    },
    {
      id: 4,
      name: '활동',
      image: 'https://cdn-icons-png.flaticon.com/512/1223/1223479.png',
      background_color: '#aaaaff',
    },
  ];
  const FirstReceivingItemList = [
    {
      id: 0,
      name: '채워',
      image: 'https://cdn-icons-png.flaticon.com/512/1223/1223479.png',
      background_color: '#D8D8D8',
    },
    {
      id: 0,
      name: '채워',
      image: 'https://cdn-icons-png.flaticon.com/512/1223/1223479.png',
      background_color: '#D8D8D8',
    },
    {
      id: 0,
      name: '채워',
      image: 'https://cdn-icons-png.flaticon.com/512/1223/1223479.png',
      background_color: '#D8D8D8',
    },
    {
      id: 0,
      name: '채워',
      image: 'https://cdn-icons-png.flaticon.com/512/1223/1223479.png',
      background_color: '#D8D8D8',
    },
    {
      id: 0,
      name: '채워',
      image: 'https://cdn-icons-png.flaticon.com/512/1223/1223479.png',
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
          width: Dimensions.get('window').width / 4 - 20,
          height: Dimensions.get('window').width / 4 - 30,
          justifyContent: 'center',
          alignItems: 'center',
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
        <Text style={{fontSize: 12, textAlign: 'center'}}>{item.name}</Text>
      </DraxView>
    );
  };

  const ReceivingZoneUIComponent = ({item, index}) => {
    return (
      <DraxView
        style={{
          borderRadius: 5,
          height: Dimensions.get('window').width / 4 - 30,
          width: Dimensions.get('window').width / 4 - 35,
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
                style={{height: '60%', width: '100%', resizeMode: 'contain'}}
                source={{uri: item.image}}
              />
              <Text style={{fontSize: 10, textAlign: 'center'}}>
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
  
  const goNext = () => {
    console.log(3);
    navigation.navigate('Course', {});
  };

  async function setPreference() {
    console.log('코스 및 취향설정');
    console.log(myfood);
    console.log(mycafe);
    console.log(mydrink);
    console.log(myplay);
    console.log(myprice);
    console.log(currentcourse);
    const response = await axios.post(
      'http://j7a104.p.ssafy.io:8000/courses/1',
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
    console.log('여기', response.data.responseData.Spots);
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
    console.log(2);
  }
  goNext();
  }
  return (
    <GestureHandlerRootView style={gestureRootViewStyle}>
      <DraxProvider>
        <View style={styles.container}>
          <View style={{backgroundColor: '#FFA856'}}>
            <Text
              style={{
                color: 'white',
                fontSize: 20,
                marginLeft: 10,
              }}>
              코스 순서 설정
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              flex: 1,
            }}>
            <DraxList
              data={dragItemMiddleList}
              renderItemContent={DragUIComponent}
              keyExtractor={(item, index) => index.toString()}
              numColumns={4}
              ItemSeparatorComponent={FlatListItemSeparator}
              scrollEnabled={true}
            />
            <Text style={{fontSize: 9}}> ※ 아래로 드래그해서 설정해주세요</Text>
          </View>
          <Text style={{fontSize: 12}}> 코스순서</Text>
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
});

export default DragItems;