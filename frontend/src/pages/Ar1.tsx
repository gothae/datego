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
        </ViroARScene>
    );
}
function Ar1({ navigation }) {
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
ViroAnimations.registerAnimations({
    move: {
        properties: {
            positionY: "-=0.1",
            rotateY: "+=90",
        },
        duration: 250,
    }
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
export default Ar1;