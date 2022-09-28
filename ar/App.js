import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
  Viro,
  ViroBox,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlane,
  ViroARPlaneSelector,
  ViroQuad,
  ViroNode,
  ViroAnimations,
  ViroMaterials,
  ViroConstants,
  ViroImage
} from '@viro-community/react-viro';
const HelloWorldSceneAR = () => {
  var counter = 0;
  const handleSwitchAnimation= () => {
    counter+=1;
    console.log(counter);
    if(counter===5){
      alert("미션 클리어");
    }
  }
  const pigClick = () => {
    alert("돼지찾기 미션 클리어");
  }
  
  const squidClick = () => {
    alert("빨강이 미션 클리어");
  }

  return (
    <ViroARScene>
      <ViroAmbientLight color={"#ffffff"} influenceBitMask={1} />
      <ViroNode>
        <Viro3DObject
          source={require('./res/stellar.obj')}
          position={[0,1,-2]}
          scale={[2, 2, 2]}
          visible ={true}
          rotation={[0, 90, 0]}
          type="OBJ"
          animation={{ name: 'move', run: true, loop: true }}
          onClick={handleSwitchAnimation}
          resources={[require('./res/stellar.mtl'),
          ]}
        />
      </ViroNode>
      

      <ViroNode dragType="FixedToWorld" onDrag={() => { }} >
        <Viro3DObject
          source={require('./res/pig.obj')}
          position={[1, -1, -2]}
          scale={[1, 1, 1]}
          rotation={[0, 0, 0]}
          visible={true}
          type="OBJ"
          materials={["fox"]}
          onClick={(position,source)=>console.log(source.visible)}
          animation={{ name: 'rotate', run: true, loop: true }}
        />

      </ViroNode>
      <ViroNode dragType="FixedDistance" onDrag={() => { }}>
        <ViroAmbientLight color="#FF0000" />
        <Viro3DObject
          source={require('./res/Sphere_Guy.obj')}
          position={[3, -2, -2]}
          scale={[0.05, 0.05, 0.05]}
          rotation={[0, 0, 0]}
          type="OBJ"
          materials={["heart"]}
          animation={{ name: 'rotate', run: true, loop: true }}
          onClick={squidClick}
          resources={[require('./res/Sphere_Guy.mtl'),
          require("./res/red_suits_texture.png"),
          ]}

        />

      </ViroNode>

      {/* <ViroNode position={[-.5, -.5, -.5]} dragType="FixedToWorld" onDrag={() => { }} >
        <Viro3DObject
          source={require('./res/13450_Bag_of_Gold_v1_L3.obj')}
          position={[1, -2, -2]}
          scale={[0.05, 0.05, 0.05]}
          rotation={[-90, 0, 0]}
          type="OBJ"
          animation={{ name: 'rotate', run: true, loop: true }}
          // onClick={console.log("hey")}
          onClick={handleSwitchAnimation}
          lightReceivingBitMask={3}
          shadowCastingBitMask={2}

          // transformBehaviors={['billboardX']}
          resources={[require('./res/13450_Bag_of_Gold_v1_L3.mtl'),
          require("./res/13450_Bag_of_Gold_diff.jpg")
          ]}

        />
      </ViroNode> */}

    </ViroARScene>


  );

};
ViroMaterials.createMaterials({
  heart: {
    lightingModel: "Blinn",
    diffuseTexture: require('./res/red_suits_texture.png'),
  },
});
ViroMaterials.createMaterials({
  fox: {
    lightingModel: "Blinn",
    diffuseTexture: require('./res/Pig_BaseColor.png'),
  },
});
ViroAnimations.registerAnimations({
  move:{
    properties:{
      positionY: "-=0.1",
      rotateY : "+=90",
    },
    duration: 250,
  }  
})
ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=30",
      // rotateZ: "+=45",

    },
    duration: 250, //.25 seconds
  },
});
export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />

  );

};

var styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
