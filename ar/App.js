import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
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
  const [text, setText] = useState('Initializing AR...');
  function onInitialized(state, reason) {
    console.log('guncelleme', state, reason);
    setText('Hello World!');
  }  
  
  const handleSwitchAnimation = () => {
    alert("미션 클리어!!");
  }

  return (
    <ViroARScene onTrackingUpdated={this._onTrackingUpdated}>
      <ViroAmbientLight color={"#ffffff"} influenceBitMask={1} />
      <ViroNode position={[-.5, -.5, -.5]} dragType="FixedToWorld" onDrag={()=>{}} >

{/* Spotlight to cast light on the object and a shadow on the surface, see
    the Viro documentation for more info on lights & shadows */}
<ViroSpotLight
  innerAngle={5}
  outerAngle={45}
  direction={[0,-1,-.2]}
  position={[0, 0, 0]}

  castsShadow={true}
  influenceBitMask={2}
  shadowMapSize={2048}
  shadowNearZ={2}
  shadowFarZ={5}
  shadowOpacity={.7} />

<Viro3DObject
    source={require('./res/stellar.obj')}
    position={[0, 0, -2]}
    scale={[5, 5, 5]}
    rotation={[0,90,0]}
    type="OBJ"
    animation={{name:'rotate', run:true, loop:true}}  
    onClick={handleSwitchAnimation}

 
  
  // transformBehaviors={['billboardX']}
  resources={[require('./res/stellar.mtl'),
                      ]}
  
  />

{/* <ViroQuad
  arShadowReceiver={true}
  lightReceivingBitMask={2} /> */}

</ViroNode>
<ViroNode position={[-.5, -.5, -.5]} dragType="FixedToWorld" onDrag={()=>{}} >

          {/* Spotlight to cast light on the object and a shadow on the surface, see
              the Viro documentation for more info on lights & shadows */}


          <Viro3DObject
              source={require('./res/pig.obj')}
              position={[1, -1, -2]}
              scale={[1, 1, 1]}
              rotation={[0,0,0]}
              type="OBJ"
              materials={["fox"]}
              // onClick={console.log("hey")}
              onClick={handleSwitchAnimation}
            lightReceivingBitMask={3}
            shadowCastingBitMask={2}  
            
            transformBehaviors={['billboardY']}
            animation={{name:'rotate', run:true, loop:true}}
            
            />

          <ViroQuad
            arShadowReceiver={true}
            lightReceivingBitMask={2} />

        </ViroNode>
<ViroNode position={[-.5, -.5, -.5]} dragType="FixedToWorld" onDrag={()=>{}} >

          {/* Spotlight to cast light on the object and a shadow on the surface, see
              the Viro documentation for more info on lights & shadows */}
          <ViroSpotLight 
    position={[0, -0.25, 0]}
    color="#777777"
    direction={[0, 0, -1]}
    attenuationStartDistance={5}
    attenuationEndDistance={10}
    innerAngle={5}
    outerAngle={20}/>

  <ViroAmbientLight color="#FF0000" />


          <Viro3DObject
              source={require('./res/Sphere_Guy.obj')}
              position={[3, -2, -2]}
              scale={[0.05, 0.05, 0.05]}
              rotation={[0,0,0]}
              type="OBJ"
              materials={["heart"]}
              // onClick={console.log("hey")}
              onClick={handleSwitchAnimation}
            lightReceivingBitMask={3}
            shadowCastingBitMask={2}  
            
            transformBehaviors={['billboardY']}
            resources={[require('./res/Sphere_Guy.mtl'),
            require("./res/red_suits_texture.png"),
            require("./res/bubble_texture.png")
                                ]}
            
            />

          <ViroQuad
            arShadowReceiver={true}
            lightReceivingBitMask={2} />

        </ViroNode>

        {/* Text to show whether or not the AR system has initialized yet, see ViroARScene's onTrackingInitialized*/}
        
        

        {/* Node that contains a light, an object and a surface to catch its shadow
            notice that the dragType is "FixedToWorld" so the object can be dragged
            along real world surfaces and points. */}
        <ViroNode position={[-.5, -.5, -.5]} dragType="FixedToWorld" onDrag={()=>{}} >

          {/* Spotlight to cast light on the object and a shadow on the surface, see
              the Viro documentation for more info on lights & shadows */}
          {/* <ViroSpotLight
            innerAngle={5}
            outerAngle={45}
            direction={[0,-1,-.2]}
            position={[0, 0, 0]}

            castsShadow={true}
            influenceBitMask={2}
            shadowMapSize={2048}
            shadowNearZ={2}
            shadowFarZ={5}
            shadowOpacity={.7} /> */}

          <Viro3DObject
              source={require('./res/13450_Bag_of_Gold_v1_L3.obj')}
              position={[1, -2, -2]}
              scale={[0.05, 0.05, 0.05]}
              rotation={[-90,0,0]}
              type="OBJ"
              animation={{name:'rotate', run:true, loop:true}}
              // onClick={console.log("hey")}
              onClick={handleSwitchAnimation}
            lightReceivingBitMask={3}
            shadowCastingBitMask={2}  
            
            // transformBehaviors={['billboardX']}
            resources={[require('./res/13450_Bag_of_Gold_v1_L3.mtl'),
            require("./res/13450_Bag_of_Gold_diff.jpg")
                                ]}
            
            />

          <ViroQuad
            arShadowReceiver={true}
            lightReceivingBitMask={2} />

        </ViroNode>

        {/* Node that contains a light, an object and a surface to catch its shadow
          notice that the dragType is "FixedToWorld" so the object can be dragged
          along real world surfaces and points. */}
        <ViroNode position={[.5,-.5,-.5]} dragType="FixedToWorld" onDrag={()=>{}} >

          {/* Spotlight to cast light on the object and a shadow on the surface, see
              the Viro documentation for more info on lights & shadows */}
          <ViroSpotLight
            innerAngle={5}
            outerAngle={45}
            direction={[0,-1,-.2]}
            position={[0, 3, 0]}
            color="#ffffff"
            castsShadow={true}
            influenceBitMask={4}
            shadowMapSize={2048}
            shadowNearZ={2}
            shadowFarZ={5}
            shadowOpacity={.7} />

          <Viro3DObject
            source={require('./res/object_soccerball/object_soccer_ball.vrx')}
            position={[0, .15, 0]}
            scale={[.3, .3, .3]}
            type="VRX"
            lightReceivingBitMask={5}
            shadowCastingBitMask={4}
            transformBehaviors={['billboardY']}
            resources={[require('./res/object_soccerball/object_soccer_ball_diffuse.png'),
                       require('./res/object_soccerball/object_soccer_ball_normal.png'),
                       require('./res/object_soccerball/object_soccer_ball_specular.png')]}/>
          <ViroQuad
            rotation={[-90,0,0]}
            width={.5} height={.5}
            arShadowReceiver={true}
            lightReceivingBitMask={4} />

        </ViroNode>

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
  rotate: {
    properties: {
      rotateY: "+=90",
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
  f1: {flex: 1},
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
