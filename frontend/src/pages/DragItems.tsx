import * as React from 'react';
import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {DraxProvider, DraxView, DraxList} from 'react-native-drax';
import {useEffect, useState} from 'react';
import {useAppDispatch} from '../store';
import categorySlice from '../slices/category';

const gestureRootViewStyle = {flex: 0.5};

export default function DragItems() {
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
      name: '채워주세요',
      image: 'https://cdn-icons-png.flaticon.com/512/1223/1223479.png',
      background_color: '#ffaaff',
    },
    {
      id: 0,
      name: '채워',
      image: 'https://cdn-icons-png.flaticon.com/512/1223/1223479.png',
      background_color: '#ffaaff',
    },
    {
      id: 0,
      name: '채워',
      image: 'https://cdn-icons-png.flaticon.com/512/1223/1223479.png',
      background_color: 'white',
    },
    {
      id: 0,
      name: '채워',
      image: 'https://cdn-icons-png.flaticon.com/512/1223/1223479.png',
      background_color: '#ffaaff',
    },
    {
      id: 0,
      name: '채워',
      image: 'https://cdn-icons-png.flaticon.com/512/1223/1223479.png',
      background_color: '#ffaaff',
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
        style={[
          styles.centeredContent,
          styles.draggableBox,
          {backgroundColor: item.background_color},
        ]}
        draggingStyle={styles.dragging}
        dragReleasedStyle={styles.dragging}
        hoverDraggingStyle={styles.hoverDragging}
        dragPayload={index}
        longPressDelay={150}
        key={index}>
        <Image
          style={{height: '60%', width: '100%', resizeMode: 'contain'}}
          source={{uri: item.image}}
        />
        <Text style={styles.textStyle}>{item.name}</Text>
      </DraxView>
    );
  };

  const ReceivingZoneUIComponent = ({item, index}) => {
    return (
      <DraxView
        style={[
          styles.centeredContent,
          styles.receivingZone,
          {backgroundColor: item.background_color},
        ]}
        receivingStyle={styles.receiving}
        renderContent={({viewState}) => {
          const receivingDrag = viewState && viewState.receivingDrag;
          const payload = receivingDrag && receivingDrag.payload;
          return (
            <View
              style={{
                borderColor: 'black',
                borderStyle: 'solid',
                borderWidth: 3,
                borderRadius: 30,
              }}>
              <Image
                style={{height: '70%', width: '100%', resizeMode: 'contain'}}
                source={{uri: item.image}}
              />
              <Text style={{fontSize: 8, textAlign: 'center'}}>
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
  const [mycourse, setMyCourse] = useState([]);

  useEffect(() => {
    console.log('변경합니다.', receivingItemList.length);
    console.log(mycourse);
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

  useEffect(() => {
    console.log(mycourse);
    dispatch(
      categorySlice.actions.setCourse({
        course: mycourse,
      }),
    );
  }, [mycourse]);

  const FlatListItemSeparator = () => {
    return <View style={styles.itemSeparator} />;
  };

  return (
    <GestureHandlerRootView style={gestureRootViewStyle}>
      <View style={{borderTopWidth: 2, borderColor: 'orange'}}>
        <Text style={{color: 'black', fontSize: 15, marginLeft: 10}}>
          코스 순서 설정
        </Text>
      </View>
      <DraxProvider>
        <View style={styles.container}>
          <View style={styles.draxListContainer}>
            <DraxList
              data={dragItemMiddleList}
              renderItemContent={DragUIComponent}
              keyExtractor={(item, index) => index.toString()}
              numColumns={4}
              ItemSeparatorComponent={FlatListItemSeparator}
              scrollEnabled={true}
            />
          </View>
          <View style={styles.receivingContainer}>
            {receivingItemList.map((item, index) =>
              ReceivingZoneUIComponent({item, index}),
            )}
          </View>
        </View>
      </DraxProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  centeredContent: {
    borderRadius: 10,
  },
  receivingZone: {
    height: Dimensions.get('window').width / 4 - 30,
    borderRadius: 50,
    width: Dimensions.get('window').width / 4 - 30,
    justifyContent: 'center',
    marginRight: 5,
  },
  receiving: {
    borderColor: 'red',
    borderWidth: 2,
  },
  draggableBox: {
    width: Dimensions.get('window').width / 4 - 30,
    height: Dimensions.get('window').width / 4 - 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  dragging: {
    opacity: 0.5,
  },
  hoverDragging: {
    borderColor: 'magenta',
    borderWidth: 2,
  },
  receivingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  itemSeparator: {
    height: 15,
  },
  draxListContainer: {
    alignItems: 'center',
    height: 60,
  },
  receivingZoneContainer: {
    padding: 5,
    height: 100,
  },
  textStyle: {
    fontSize: 12,
    textAlign: 'center',
  },
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
