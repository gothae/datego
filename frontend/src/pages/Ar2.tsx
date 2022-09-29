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

const ArScene2 = () => {

  const [pigScale, setScale] = useState([1, 1, 1]);
  const scaleObject = (scaleFactor, source) => {
    let newScale = pigScale[0] * 1.1;
    let newScaleAry = [newScale, newScale, newScale];
    setScale(newScaleAry);
    if (newScale > 5) {
      Alert.alert('돼지 키우기 미션 클리어');
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
function Ar2({navigation}) {
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
