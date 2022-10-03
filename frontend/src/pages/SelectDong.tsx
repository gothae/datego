/* eslint-disable react/react-in-jsx-scope */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import {useState} from 'react';

function SelectDong({navigation: {navigate}, route}) {
  const [x, setX] = useState(-100);
  const [y, setY] = useState(-100);
  const [selected, setSelected] = useState(0);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const offset = route.params.offset;

  const gogo = () => {
    if (selected === 0) {
      Alert.alert('지역을 선택하세요.');
    } else {
      navigate('Preference', {selected});
    }
  };

  const clickDong = (dong: number) => {
    if (dong === 1) {
      setX(windowWidth * 0.722);
      setY(windowHeight * 0.195);
    } else if (dong === 2) {
      setX(windowWidth * 0.7);
      setY(windowHeight * 0.36);
    } else if (dong === 3) {
      setX(windowWidth * 0.45);
      setY(windowHeight * 0.265);
    } else if (dong === 4) {
      setX(windowWidth * 0.377);
      setY(windowHeight * 0.385);
    } else if (dong === 5) {
      setX(windowWidth * 0.26);
      setY(windowHeight * 0.513);
    } else if (dong === 7) {
      setX(windowWidth * 0.66);
      setY(windowHeight * 0.505);
    } else if (dong === 10) {
      setX(windowWidth * 0.135);
      setY(windowHeight * 0.32);
    } else if (dong === 18) {
      setX(windowWidth * 0.175);
      setY(windowHeight * 0.177);
    }
    setSelected(dong);
  };

  return (
    <View style={{flex:1, backgroundColor: 'whitesmoke'}}>
      <View>
        <View
          style={{
            left: x,
            top: y,
            backgroundColor: '#FF8D8D',
            width: 60,
            height: 60,
            zIndex: 10,
            borderRadius: 30,
            opacity: 0.4,
          }}
        />
        <TouchableOpacity>
          <View style={styles(offset, windowWidth, windowHeight).itaewon_1}>
            <Text
              style={styles(offset, windowWidth, windowHeight).text}
              onPress={() => clickDong(1)}>
              이태원
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles(offset, windowWidth, windowHeight).hannam_2}>
            <Text
              style={styles(offset, windowWidth, windowHeight).text}
              onPress={() => clickDong(2)}>
              한남동
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles(offset, windowWidth, windowHeight).yongsan_3}>
            <Text
              style={styles(offset, windowWidth, windowHeight).text}
              onPress={() => clickDong(3)}>
              용산
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles(offset, windowWidth, windowHeight).hangangro_4}>
            <Text
              style={styles(offset, windowWidth, windowHeight).text}
              onPress={() => clickDong(4)}>
              한강로
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles(offset, windowWidth, windowHeight).ichon_5}>
            <Text
              style={styles(offset, windowWidth, windowHeight).text}
              onPress={() => clickDong(5)}>
              이촌동
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles(offset, windowWidth, windowHeight).dongbingo_7}>
            <Text
              style={styles(offset, windowWidth, windowHeight).text}
              onPress={() => clickDong(7)}>
              동빙고{'\n'}서빙고
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles(offset, windowWidth, windowHeight).wonhyoro_10}>
            <Text
              style={styles(offset, windowWidth, windowHeight).text}
              onPress={() => clickDong(10)}>
              원효로
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles(offset, windowWidth, windowHeight).cheongpa_18}>
            <Text
              style={styles(offset, windowWidth, windowHeight).text}
              onPress={() => clickDong(18)}>
              청파{'\n'}남영{'\n'}효창
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity
          onPress={gogo}
          style={styles(0, windowWidth, windowHeight).btn}>
          <Text style={{color: 'white', fontSize: 30, textAlign: 'center'}}>
            Go Go
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = (offset: number, windowWidth: number, windowHeight: number) =>
  StyleSheet.create({
    btn: {
      position: 'absolute',
      top: windowHeight * 0.65,
      left: windowWidth * 0.25,
      width: windowWidth * 0.5,
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 15,
      backgroundColor: '#FFA856',
    },
    itaewon_1: {
      position: 'absolute',
      left: windowWidth * 0.64,
      top: windowHeight * 0.15 - offset,
      backgroundColor: '#FFFCF0',
      width: windowWidth * 0.3,
      height: windowHeight * 0.13,
      borderRadius: 80,
      justifyContent: 'center',
    },
    hannam_2: {
      position: 'absolute',
      left: windowWidth * 0.6,
      top: windowHeight * 0.3 - offset,
      backgroundColor: '#FFFCF0',
      width: 0.335 * windowWidth,
      height: 0.15 * windowHeight,
      borderRadius: 70,
      justifyContent: 'center',
    },
    yongsan_3: {
      position: 'absolute',
      left: windowWidth * 0.41,
      top: windowHeight * 0.225 - offset,
      backgroundColor: '#FFFCF0',
      width: 0.225 * windowWidth,
      height: 0.126 * windowHeight,
      borderRadius: 50,
      justifyContent: 'center',
    },
    hangangro_4: {
      position: 'absolute',
      left: windowWidth * 0.333,
      top: windowHeight * 0.37 - offset,
      backgroundColor: '#FFFCF0',
      width: 0.25 * windowWidth,
      height: 0.08 * windowHeight,
      borderRadius: 50,
      justifyContent: 'center',
    },
    ichon_5: {
      position: 'absolute',
      left: windowWidth * 0.1,
      top: windowHeight * 0.456 - offset,
      backgroundColor: '#FFFCF0',
      width: 0.48 * windowWidth,
      height: 0.15 * windowHeight,
      borderRadius: 100,
      justifyContent: 'center',
    },
    dongbingo_7: {
      position: 'absolute',
      left: windowWidth * 0.59,
      top: windowHeight * 0.46 - offset,
      backgroundColor: '#FFFCF0',
      width: 0.3 * windowWidth,
      height: 0.13 * windowHeight,
      borderRadius: 60,
      justifyContent: 'center',
    },
    wonhyoro_10: {
      position: 'absolute',
      left: windowWidth * 0.05,
      top: windowHeight * 0.285 - offset,
      backgroundColor: '#FFFCF0',
      width: 0.32 * windowWidth,
      height: 0.12 * windowHeight,
      borderRadius: 60,
      justifyContent: 'center',
    },
    cheongpa_18: {
      position: 'absolute',
      left: windowWidth * 0.076,
      top: windowHeight * 0.114 - offset,
      backgroundColor: '#FFFCF0',
      width: 0.35 * windowWidth,
      height: 0.16 * windowHeight,
      borderRadius: 70,
      justifyContent: 'center',
    },
    text: {
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
export default SelectDong;
