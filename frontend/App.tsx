import * as React from 'react';
import {NavigationContainer, ParamListBase} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import {useCallback} from 'react';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};
type HomeScreenProps = NativeStackScreenProps<RootStackParamList>;
type DetailsScreenProps = NativeStackScreenProps<ParamListBase>;

function HomeScreen({navigation}: HomeScreenProps) {
  const image = {
    uri: 'https://blog.kakaocdn.net/dn/xIoxp/btrB5V8Gf2a/LMWasLuAC6tkdo8hauzm10/img.jpg',
  };
  const onClick = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  return (
    <>
      <View style={{flex: 1}}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View
            style={{
              flex: 6,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <TouchableHighlight onPress={onClick}>
              <Text style={{fontSize: 40, color: 'white'}}>DATE GO</Text>
            </TouchableHighlight>
          </View>
          <View
            style={{
              flex: 4,
              alignItems: 'center',
            }}>
            <Text
              style={{
                margin: 10,
                fontSize: 20,
                backgroundColor: 'white',
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 10,
              }}>
              카카오톡 로그인
            </Text>
          </View>
        </ImageBackground>
      </View>
    </>
  );
}

function DetailsScreen({navigation}: DetailsScreenProps) {
  const onClick = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  return (
    <>
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'orange',
            paddingHorizontal: 10,
            paddingVertical: 15,
          }}>
          <Text style={{color: 'white', fontSize: 30, fontWeight: 'bold'}}>
            DATE GO
            <TouchableHighlight onPress={onClick}>
              <Text>Login페이지로 가기</Text>
            </TouchableHighlight>
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            paddingHorizontal: 10,
            paddingVertical: 20,
          }}>
          <View
            style={{
              width: '25%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'orange',
              borderRadius: 20,
            }}>
            <Text
              style={{
                fontSize: 20,
                color: 'white',
                borderRadius: 20,
              }}>
              서울
            </Text>
          </View>
        </View>
        <View style={{flex: 4}}>
          <Text>map</Text>
        </View>
        <View style={{flex: 2, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              backgroundColor: 'orange',
              color: 'white',
              paddingHorizontal: 45,
              paddingVertical: 15,
              borderRadius: 25,
              fontSize: 40,
            }}>
            GO
          </Text>
        </View>
        <View
          style={{
            flex: 2,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'orange', fontSize: 30, fontWeight: 'bold'}}>
            진행중인 코스
          </Text>
          <Text>!!</Text>
        </View>
      </View>
    </>
  );
}

const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Login"
          component={HomeScreen}
          options={{title: 'Login', headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={DetailsScreen}
          options={{title: 'Home', headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
});

export default App;
