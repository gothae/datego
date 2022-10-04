import {useEffect, useState} from 'react';
import * as React from 'react';
import {View, Text, Button} from 'react-native';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import {useAppDispatch} from '../store';
import {Alert} from 'react-native';
import {
  ViroARScene,
  ViroARSceneNavigator,
  Viro3DObject,
  ViroAmbientLight,
  ViroNode,
  ViroAnimations,
  ViroMaterials,
} from '@viro-community/react-viro';
import courseSlice from '../slices/course';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import userSpotSlice from '../slices/userSpot';
type Mission = {
  clearMissions: number[];
  unclearMissions: number[];
};
var number = -1;
const ArScene1 = () => {
  console.log('넘버입니다.');
  console.log(number);
  const [coinPosition, setPosition] = useState([1, -3, 1]);
  const [coinVisible1, setCoinVisible1] = useState(true);
  const [coinVisible2, setCoinVisible2] = useState(true);
  const [coinVisible3, setCoinVisible3] = useState(true);
  const [coinVisible4, setCoinVisible4] = useState(true);
  const [coinVisible5, setCoinVisible5] = useState(true);
  const [counter, setCounter] = useState(1);

  const missionList: any = useSelector(
    (state: RootState) => state.course,
  ).missions;

  const stores: any = useSelector((state: RootState) => state.stores).stores;
  const userSpotList = useSelector(
    (state: RootState) => state.userSpot,
  ).userSpotList;
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const [clearM, setClearM] = useState<number[]>(missionList.clearMissions);
  const [unclearM, setUnclearM] = useState<number[]>(
    missionList.unclearMissions,
  );
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const spotId = stores[number].id;
  var userSpotId = 0;
  console.log(spotId);
  const getData = async () => {
    const res = await axios.get(
      `http://j7a104.p.ssafy.io:8080/courses/mission/${spotId}`,
      {
        headers: {accessToken},
      },
    );
    console.log(res.data.responseData);
    userSpotId = res.data.responseData.id;
    console.log(userSpotId);
    const newSpotList = [];
    for (var i = 0; i < userSpotList.length; i++) {
      if (i === number) {
        newSpotList.push(userSpotId);
      } else {
        newSpotList.push(userSpotList[i]);
      }
    }
    dispatch(
      userSpotSlice.actions.setUserSpot({
        userSpotList: newSpotList,
      }),
    );
    console.log(newSpotList);
  };

  useEffect(() => {
    if (counter === 4) {
      Alert.alert('Alert Title', '미션 성공!!', [
        {
          text: '클리어!!!',
          onPress: () => navigation.navigate('CourseIng', {}),
          style: 'cancel',
        },
      ]);
      getData(), console.log({미션번호: number});
      const clearList = [];
      for (var i = 0; i < clearM.length; i++) {
        clearList.push(clearM[i]);
      }
      clearList.push(number);
      const unclearList = [];
      for (var i = 0; i < unclearM.length; i++) {
        if (unclearM[i] != number) {
          unclearList.push(unclearM[i]);
        }
      }
      setUnclearM(unclearList);
      console.log('성공한 미션 리스트', clearM);
      console.log('남은 미션', unclearList);
      dispatch(
        courseSlice.actions.setCourse({
          missions: {
            clearMissions: clearList,
            unclearMissions: unclearList,
          },
        }),
      );
    }
  }, [counter]);
  const countCoin = () => {
    console.log('클리어');
    setCounter(counter + 1);
    console.log(counter);
  };

  const moveObject1 = (dragToPos, source) => {
    //console.log(dragToPos);
    if (coinVisible1) {
      let distance =
        (dragToPos[0] - 1) * (dragToPos[0] - 1) +
        (dragToPos[1] + 2) * (dragToPos[1] + 2);
      if (distance < 1.3) {
        console.log(distance);
        setCoinVisible1(false);
        countCoin();
      }
    }
  };
  const moveObject2 = (dragToPos, source) => {
    //console.log(dragToPos);
    if (coinVisible2) {
      let distance =
        (dragToPos[0] - 1) * (dragToPos[0] - 1) +
        (dragToPos[1] + 2) * (dragToPos[1] + 2);
      if (distance < 1.3) {
        console.log(distance);
        setCoinVisible2(false);
        countCoin();
      }
    }
  };
  const moveObject3 = (dragToPos, source) => {
    //console.log(dragToPos);
    if (coinVisible3) {
      let distance =
        (dragToPos[0] - 1) * (dragToPos[0] - 1) +
        (dragToPos[1] + 2) * (dragToPos[1] + 2);
      if (distance < 1.3) {
        console.log(distance);
        setCoinVisible3(false);
        countCoin();
      }
    }
  };
  const moveObject4 = (dragToPos, source) => {
    //console.log(dragToPos);
    if (coinVisible4) {
      let distance =
        (dragToPos[0] - 1) * (dragToPos[0] - 1) +
        (dragToPos[1] + 2) * (dragToPos[1] + 2);
      if (distance < 1.3) {
        console.log(distance);
        setCoinVisible4(false);
        countCoin();
      }
    }
  };
  const moveObject5 = (dragToPos, source) => {
    //console.log(dragToPos);
    if (coinVisible5) {
      let distance =
        (dragToPos[0] - 1) * (dragToPos[0] - 1) +
        (dragToPos[1] + 2) * (dragToPos[1] + 2);
      if (distance < 1.3) {
        console.log(distance);
        setCoinVisible5(false);
        countCoin();
      }
    }
  };
  return (
    <ViroARScene>
      <ViroAmbientLight color={'#ffffff'} influenceBitMask={1} />
      <ViroNode>
        <Viro3DObject
          source={{uri:'https://popoimages.s3.ap-northeast-2.amazonaws.com/DateGo/stellar.obj'}}
          position={[1, 3, -2]}
          scale={[5, 5, 5]}
          rotation={[0, 90, 0]}
          type="OBJ"
          dragType="FixedDistance"
          onDrag={moveObject1}
          visible={coinVisible1}
          animation={{name: 'rotate', run: true, loop: true}}
          //animation={{name: 'move', run: true, loop: true}}
          resources={[require('../assets/res/stellar.mtl')]}
        />
      </ViroNode>
      <ViroNode>
        <Viro3DObject
          source={{uri:'https://popoimages.s3.ap-northeast-2.amazonaws.com/DateGo/stellar.obj'}}
          position={[1.5, 3, -2]}
          scale={[5, 5, 5]}
          rotation={[0, 90, 0]}
          type="OBJ"
          dragType="FixedDistance"
          onDrag={moveObject2}
          visible={coinVisible2}
          animation={{name: 'rotate', run: true, loop: true}}
          //animation={{name: 'move', run: true, loop: true}}
          resources={[require('../assets/res/stellar.mtl')]}
        />
      </ViroNode>
      <ViroNode>
        <Viro3DObject
          source={{uri:'https://popoimages.s3.ap-northeast-2.amazonaws.com/DateGo/stellar.obj'}}
          position={[-2, 2, 1]}
          scale={[5, 5, 5]}
          rotation={[0, 90, 0]}
          type="OBJ"
          dragType="FixedDistance"
          onDrag={moveObject3}
          visible={coinVisible3}
          animation={{name: 'rotate', run: true, loop: true}}
          //animation={{name: 'move', run: true, loop: true}}
          resources={[require('../assets/res/stellar.mtl')]}
        />
      </ViroNode>
      <ViroNode>
        <Viro3DObject
          source={{uri:'https://popoimages.s3.ap-northeast-2.amazonaws.com/DateGo/stellar.obj'}}
          position={[2, 0, -1]}
          scale={[5, 5, 5]}
          rotation={[0, 90, 0]}
          type="OBJ"
          dragType="FixedDistance"
          onDrag={moveObject4}
          visible={coinVisible4}
          animation={{name: 'rotate', run: true, loop: true}}
          //animation={{name: 'move', run: true, loop: true}}
          resources={[require('../assets/res/stellar.mtl')]}
        />
      </ViroNode>
      <ViroNode>
        <Viro3DObject
          source={{uri:'https://popoimages.s3.ap-northeast-2.amazonaws.com/DateGo/stellar.obj'}}
          position={[-1, 3, 0]}
          scale={[5, 5, 5]}
          rotation={[0, 90, 0]}
          dragType="FixedDistance"
          type="OBJ"
          onDrag={moveObject5}
          visible={coinVisible5}
          animation={{name: 'rotate', run: true, loop: true}}
          //animation={{name: 'move', run: true, loop: true}}
          resources={[require('../assets/res/stellar.mtl')]}
        />
      </ViroNode>
      <ViroNode position={[-0.5, -0.5, -0.5]}>
        <Viro3DObject
          source={{uri:'https://popoimages.s3.ap-northeast-2.amazonaws.com/DateGo/gold_bag.obj'}}
          position={[1, -2, -2]}
          scale={[0.05, 0.05, 0.05]}
          rotation={[-90, 0, 0]}
          type="OBJ"
          animation={{name: 'rotate', run: true, loop: true}}
          // onClick={console.log("hey")}
          lightReceivingBitMask={3}
          shadowCastingBitMask={2}
          materials={['bag']}
          // transformBehaviors={['billboardX']}
          resources={[
            require('../assets/res/gold_bag.mtl'),
            require('../assets/res/gold_bag.jpg'),
          ]}
        />
      </ViroNode>
    </ViroARScene>
  );
};
function Ar1({route, navigation}) {
  number = route.params.num;
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: ArScene1,
      }}
      style={styles.f1}
    />
  );
}
ViroAnimations.registerAnimations({
  move: {
    properties: {
      positionY: '-=0.1',
      rotateY: '+=90',
    },
    duration: 250,
  },
});
ViroMaterials.createMaterials({
  bag: {
    lightingModel: 'Blinn',
    diffuseTexture: require('../assets/res/gold_bag.jpg'),
  },
});
var styles = StyleSheet.create({
  f1: {flex: 1},
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
export default Ar1;
