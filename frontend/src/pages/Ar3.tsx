import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import {StyleSheet} from 'react-native';
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
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import { useAppDispatch } from '../store';

var number=-1;
const ArScene3 = () => {
  const missionList: any = useSelector((state:RootState)=> state.course).missions

  const [clearM, setClearM] = useState<number[]>(missionList.clearMissions);
  const [unclearM, setUnclearM] = useState<number[]>(missionList.unclearMissions);
  const dispatch = useAppDispatch();
  const [redScale, setScale] = useState([0.05, 0.05, 0.05]);
  const scaleObject = (scaleFactor, source) => {
    let newScale = redScale[0] * 1.1;
    let newScaleAry = [newScale, newScale, newScale];
    setScale(newScaleAry);
    if (newScale > 0.2) {
      Alert.alert('미니언 키우기 미션 클리어');
      setClearM([...clearM, number])
      const unclearList=[];
      for(var i =0; i < unclearM.length; i++){
        if(unclearM[i] != number){
          unclearList.push(unclearM[i]);
        }
      }
      setUnclearM(unclearList)
      console.log('성공한 미션 리스트',clearM)
      console.log('남은 미션', unclearList)
      dispatch(
        courseSlice.actions.setCourse({
          missions: {
            clearMissions: clearM,
            unclearMissions: unclearList
          }
        }),
      )
    }
  };
  return (
    <ViroARScene>
      <ViroAmbientLight color={'#ffffff'} influenceBitMask={1} />
      <ViroNode dragType="FixedDistance" onDrag={() => {}}>
        <ViroAmbientLight color="#FF0000" />
        <Viro3DObject
          source={require('./res/Sphere_Guy.obj')}
          position={[0, -1, -7]}
          scale={redScale}
          rotation={[0, 0, 0]}
          type="OBJ"
          materials={['heart']}
          animation={{name: 'rotate', run: true, loop: true}}
          onClick={scaleObject}
          resources={[
            require('./res/Sphere_Guy.mtl'),
            require('./res/red_suits_texture.png'),
          ]}
        />
      </ViroNode>
    </ViroARScene>
  );
};
function Ar3({ navigation, route }) {
  number = route.params.num;
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: ArScene3,
      }}
      style={styles.f1}
    />
  );
}
ViroMaterials.createMaterials({
  heart: {
    lightingModel: 'Blinn',
    diffuseTexture: require('./res/red_suits_texture.png'),
  },
});
ViroMaterials.createMaterials({
  fox: {
    lightingModel: 'Blinn',
    diffuseTexture: require('./res/Pig_BaseColor.png'),
  },
});
ViroAnimations.registerAnimations({
  move: {
    properties: {
      positionY: '-=0.1',
      rotateY: '+=90',
    },
    duration: 250,
  },
});
ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: '+=30',
      // rotateZ: "+=45",
    },
    duration: 250, //.25 seconds
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
export default Ar3;
