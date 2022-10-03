import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { RootState } from '../store/reducer';
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
type Mission = {
  clearMissions : number[];
  unclearMissions : number[];
}
var number=-1;
const ArScene1 = () => {
  console.log("넘버입니다.");
  console.log(number);
  const [coinPosition, setPosition] = useState([1, -3, 1]);
  const [coinVisible1, setCoinVisible1] = useState(true);
  const [coinVisible2, setCoinVisible2] = useState(true);
  const [coinVisible3, setCoinVisible3] = useState(true);
  const [coinVisible4, setCoinVisible4] = useState(true);
  const [coinVisible5, setCoinVisible5] = useState(true);
  const [counter, setCounter] = useState(1);
  // const [clearM, setClearM] = useState()
  const missionList: any = useSelector((state:RootState)=> state.course).missions
  var clearM : number[] = missionList.clearMissions;
  // useEffect(()=>{
  //   console.log(missionList); 
  // },[])
  var unclearM : number[] = missionList.unclearMissions;
  const dispatch = useAppDispatch();
  const countCoin = () => {
    console.log("클리어")
    console.log(clearM);
    setCounter(counter + 1);
    console.log(counter);
    if (counter === 3) {
      Alert.alert('미션 클리어');
      clearM.push(number);
      const unclearList=[];
      for(var i =0;i<unclearM.length;i++){
        if(unclearM[i]===number){
          continue;
        }
        unclearList.push(unclearM[i]);
      }
      dispatch(
        courseSlice.actions.setCourse({
          clear:clearM,
          unclear: unclearList
        }),
      )
    }
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
          source={require('./res/stellar.obj')}
          position={[1, 3, -2]}
          scale={[5, 5, 5]}
          rotation={[0, 90, 0]}
          type="OBJ"
          dragType='FixedDistance'
          onDrag={moveObject1}
          visible={coinVisible1}
          animation={{name: 'rotate', run: true, loop: true}}
          //animation={{name: 'move', run: true, loop: true}}
          resources={[require('./res/stellar.mtl')]}
        />
      </ViroNode>
      <ViroNode>
        <Viro3DObject
          source={require('./res/stellar.obj')}
          position={[1.5, 3, -2]}
          scale={[5, 5, 5]}
          rotation={[0, 90, 0]}
          type="OBJ"
          dragType='FixedDistance'
          onDrag={moveObject2}
          visible={coinVisible2}
          animation={{name: 'rotate', run: true, loop: true}}
          //animation={{name: 'move', run: true, loop: true}}
          resources={[require('./res/stellar.mtl')]}
        />
      </ViroNode>
      <ViroNode>
        <Viro3DObject
          source={require('./res/stellar.obj')}
          position={[-2, 2, 1]}
          scale={[5, 5, 5]}
          rotation={[0, 90, 0]}
          type="OBJ"
          dragType='FixedDistance'
          onDrag={moveObject3}
          visible={coinVisible3}
          animation={{name: 'rotate', run: true, loop: true}}
          //animation={{name: 'move', run: true, loop: true}}
          resources={[require('./res/stellar.mtl')]}
        />
      </ViroNode>
      <ViroNode>
        <Viro3DObject
          source={require('./res/stellar.obj')}
          position={[2, 0, -1]}
          scale={[5, 5, 5]}
          rotation={[0, 90, 0]}
          type="OBJ"
          dragType='FixedDistance'
          onDrag={moveObject4}
          visible={coinVisible4}
          animation={{name: 'rotate', run: true, loop: true}}
          //animation={{name: 'move', run: true, loop: true}}
          resources={[require('./res/stellar.mtl')]}
        />
      </ViroNode>
      <ViroNode>
        <Viro3DObject
          source={require('./res/stellar.obj')}
          position={[-1, 3, 0]}
          scale={[5, 5, 5]}
          rotation={[0, 90, 0]}
          dragType='FixedDistance'
          type="OBJ"
          onDrag={moveObject5}
          visible={coinVisible5}
          animation={{name: 'rotate', run: true, loop: true}}
          //animation={{name: 'move', run: true, loop: true}}
          resources={[require('./res/stellar.mtl')]}
        />
      </ViroNode>
      <ViroNode
        position={[-0.5, -0.5, -0.5]}>
        <Viro3DObject
          source={require('./res/gold_bag.obj')}
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
            require('./res/gold_bag.mtl'),
            require('./res/gold_bag.jpg'),
          ]}
        />
      </ViroNode>
    </ViroARScene>
  );
};
function Ar1({route,navigation}) {
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
    diffuseTexture: require('./res/gold_bag.jpg'),
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
