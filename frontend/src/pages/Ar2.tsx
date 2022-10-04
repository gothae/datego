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
import { RootState } from '../store/reducer';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../store';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import userSpotSlice from '../slices/userSpot';
var number=-1;
const ArScene2 = () => {
  const missionList: any = useSelector((state:RootState)=> state.course).missions

  const [clearM, setClearM] = useState<number[]>(missionList.clearMissions);
  const [unclearM, setUnclearM] = useState<number[]>(missionList.unclearMissions);
  const dispatch = useAppDispatch();
  const stores: any = useSelector((state: RootState) => state.stores).stores;
  const userSpotList = useSelector((state: RootState) => state.userSpot).userSpotList;
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const navigation = useNavigation();
  const spotId = stores[number].id;
  var userSpotId = 0;
  console.log(spotId);
  const getData =async () => {
    const res = await axios.get(`http://j7a104.p.ssafy.io:8080/courses/mission/${spotId}`, {
        headers: {accessToken},
      });
      console.log(res.data.responseData);
      userSpotId = res.data.responseData.id;
      console.log(userSpotId);
      const newSpotList=[];
      for(var i =0;i<userSpotList.length;i++){
        if(i===number){
          newSpotList.push(userSpotId);
        }
        else{
          newSpotList.push(userSpotList[i]);
        }
      }
      dispatch(
        userSpotSlice.actions.setUserSpot({
          userSpotList:newSpotList
        })        
      );
      console.log(newSpotList);
    }



  const [pigScale, setScale] = useState([1, 1, 1]);
  const scaleObject = (scaleFactor, source) => {
    let newScale = pigScale[0] * 1.1;
    let newScaleAry = [newScale, newScale, newScale];
    setScale(newScaleAry);
    if (newScale > 5) {
      Alert.alert('돼지 키우기 미션 클리어');
      const clearList=[];
      for(var i=0;i<clearM.length;i++){
        clearList.push(clearM[i]);
      }
      clearList.push(number);
      const unclearList=[];
      for(var i =0; i < unclearM.length; i++){
        if(unclearM[i] != number){
          unclearList.push(unclearM[i]);
        }
      }
      getData();
      setUnclearM(unclearList);
      console.log('성공한 미션 리스트',clearM)
      console.log('남은 미션', unclearList)
      dispatch(
        courseSlice.actions.setCourse({
          missions: {
            clearMissions: clearList,
            unclearMissions: unclearList
          }
        }),
      )
    }
  };
  return (
    <ViroARScene>
      <ViroAmbientLight color={'#ffffff'} influenceBitMask={1} />
      <ViroNode dragType="FixedToWorld">
        <Viro3DObject
          source={require('./res/pig.obj')}
          position={[0, 0, -4]}
          scale={pigScale}
          rotation={[0, 0, 0]}
          visible={true}
          type="OBJ"
          materials={['fox']}
          onClick={scaleObject}
          animation={{name: 'rotate', run: true, loop: true}}
        />
      </ViroNode>
    </ViroARScene>
  );
};
function Ar2({ navigation, route }) {
  number = route.params.num;
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: ArScene2,
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
export default Ar2;
