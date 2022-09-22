import * as React from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
} from 'react-native';
import {useState} from 'react';
import {RadioButton} from 'react-native-paper';

function SelectDong() {
  const [modalVisible, setModalVisible] = useState(false);
  const [gender, setGender] = useState('M');
  const [age, setAge] = useState('');

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
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
                  setModalVisible(!modalVisible), setGender('M'), setAge('');
                }}
                disabled={!age}>
                <Text style={styles.textStyle}>로그인</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible), setGender('M'), setAge('');
                }}>
                <Text style={styles.textStyle}>닫기</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
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

export default SelectDong;
