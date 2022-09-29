import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { StyleSheet } from 'react-native';
import { Alert } from 'react-native';
import {
    ViroARScene,
    ViroARSceneNavigator,
    Viro3DObject,
    ViroAmbientLight,
    ViroNode,
    ViroAnimations,
    ViroMaterials,
} from '@viro-community/react-viro';


const ArScene1 = () => {
    var counter = 0;
    function a() {
        counter += 1;
        console.log(counter);
        if (counter === 5) {
            Alert.alert("미션 클리어");
        }
    }
    function pigClick() {
        Alert.alert("돼지를 찾았어요!");
    }
    function squidClick() {
        Alert.alert("빨강이를 찾았어요!");
    }
    return (
        <ViroARScene>
            <ViroAmbientLight color={"#ffffff"} influenceBitMask={1} />
            <ViroNode>
                <Viro3DObject
                    source={require('./res/stellar.obj')}
                    position={[0, 1, -2]}
                    scale={[2, 2, 2]}
                    visible={true}
                    rotation={[0, 90, 0]}
                    type="OBJ"
                    animation={{ name: 'move', run: true, loop: true }}
                    onClick={a}
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
                    onClick={() => console.log("돼지")}
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
        </ViroARScene>
    );
}
function Ar({ navigation }) {
    return (
        <ViroARSceneNavigator
            autofocus={true}
            initialScene={{
                scene: ArScene1,
            }}
            style={styles.f1}
        />
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
    move: {
        properties: {
            positionY: "-=0.1",
            rotateY: "+=90",
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
export default Ar;