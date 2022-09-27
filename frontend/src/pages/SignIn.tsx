import * as React from 'react';
import {
  View,
  Modal,
  Pressable,
  TextInput,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  TouchableHighlight,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button} from '@react-native-material/core';
import {RootStackParamList} from '../../AppInner';
import {useCallback, useEffect, useState} from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';
import {useSelector} from 'react-redux';
import {RootState} from '../../src/store/reducer';
import {RadioButton} from 'react-native-paper';
import {
  login,
  getProfile as getKakaoProfile,
  logout,
} from '@react-native-seoul/kakao-login';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignIn({navigation}: SignInScreenProps) {
  const image = {
    uri: 'https://blog.kakaocdn.net/dn/xIoxp/btrB5V8Gf2a/LMWasLuAC6tkdo8hauzm10/img.jpg',
  };
  const code = useSelector((state: RootState) => state.user.code);
  const email = useSelector((state: RootState) => state.user.email);
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const domain = useSelector((state: RootState) => state.user.domain);

  const dispatch = useAppDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [gender, setGender] = useState('M');
  const [age, setAge] = useState('');

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '18642094345-6ok4m4de04aukci5sdl5vkqranqtbbuf.apps.googleusercontent.com',
    });
  }, []);
  async function test() {
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  }
  async function onGoogleButtonPress() {
    const data = await GoogleSignin.signIn();
    // 구글로 앱로그인 필요할때 사용
    // const googleCredential = auth.GoogleAuthProvider.credential(data.idToken);
    // return auth().signInWithCredential(googleCredential)

    const response = await axios.post('http://10.0.2.2:8080/users/login', {
      // const response = await axios.post('http://121.129.17.91/users/login', {
      email: data.user.email,
      domain: 'GOOGLE',
    });
    console.log('구글로그인요청');
    console.log(response.data);

    if (response.data.code === 200) {
      dispatch(
        userSlice.actions.setUser({
          email: data.user.email,
          code: response.data.code,
          accessToken: response.data.responseData.accessToken,
          domain: 'GOOGLE',
        }),
      );
    }
    if (response.data.code === 201) {
      setModalVisible(true);
      dispatch(
        userSlice.actions.setUser({
          email: data.user.email,
          code: response.data.code,
          domain: 'GOOGLE',
        }),
      );
    }
    return;
  }

  async function signInWithKakao() {
    await login();
    const profile = await getKakaoProfile();
    const response = await axios.post('http://10.0.2.2:8080/users/login', {
      email: profile.email,
      domain: 'KAKAO',
    });
    console.log('카카오로그인요청');
    console.log(response.data);
    if (response.data.code === 200) {
      dispatch(
        userSlice.actions.setUser({
          email: profile.email,
          code: response.data.code,
          accessToken: response.data.responseData.accessToken,
          domain: 'KAKAO',
        }),
      );
    }
    if (response.data.code === 201) {
      setModalVisible(true);
      dispatch(
        userSlice.actions.setUser({
          email: profile.email,
          code: response.data.code,
          domain: 'KAKAO',
        }),
      );
    }
    return;
  }

  async function userInfo() {
    const response = await axios.post('http://10.0.2.2:8080/users/info', {
      email: email,
      domain: domain,
      age: age,
      gender: gender,
    });
    console.log(response.data);
    dispatch(
      userSlice.actions.setUser({
        email: email,
        code: response.data.code,
        accessToken: response.data.responseData.accessToken,
        domain: domain,
      }),
    );
  }

  if (code === 201) {
    <View>
      <Text>로그인</Text>
    </View>;
  }
  return (
    <>
      <View style={{flex: 1}}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View
            style={{
              flex: 2,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 50, color: 'white'}}>DATE GO</Text>
          </View>
          <View />
          <View style={{flex: 1}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <GoogleSigninButton
                size={GoogleSigninButton.Size.Standard}
                color={GoogleSigninButton.Color.Light}
                onPress={() => onGoogleButtonPress()}
              />
              <Button onPress={() => test()} title="구글회원가입" />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableHighlight onPress={() => signInWithKakao()}>
                <Image
                  style={{width: 220}}
                  source={require('../assets/kakao_login_medium_narrow.png')}
                />
              </TouchableHighlight>
            </View>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>성별과 나이가 필요합니다.</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.title}>성별</Text>
                  <RadioButton.Group
                    onValueChange={checkvalue => setGender(checkvalue)}
                    value={gender}>
                    <RadioButton.Item label="남자" value="M" />
                    <RadioButton.Item label="여자" value="W" />
                  </RadioButton.Group>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.title}>나이</Text>
                  <TextInput
                    style={styles.input}
                    onChangeText={setAge}
                    value={age}
                    maxLength={2}
                    placeholder="나이를 입력해주세요."
                    keyboardType="number-pad"
                  />
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Pressable
                    style={
                      !age ? styles.button : [styles.button, styles.buttonClose]
                    }
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      userInfo();
                      setAge('');
                      setGender('M');
                    }}
                    disabled={!age}>
                    <Text style={styles.textStyle}>로그인</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => {
                      setModalVisible(!modalVisible);
                      setAge('');
                      setGender('M');
                    }}>
                    <Text style={styles.textStyle}>닫기</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        </ImageBackground>
      </View>
    </>
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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  title: {
    margin: 10,
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
export default SignIn;
