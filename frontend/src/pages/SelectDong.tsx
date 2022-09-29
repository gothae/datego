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
      setX(windowWidth * 0.71);
      setY(125 - offset);
    } else if (dong === 2) {
      setX(windowWidth * 0.67);
      setY(240 - offset);
    } else if (dong === 3) {
      setX(windowWidth * 0.44);
      setY(155 - offset);
    } else if (dong === 4) {
      setX(windowWidth * 0.375);
      setY(240 - offset);
    } else if (dong === 5) {
      setX(windowWidth * 0.33);
      setY(340 - offset);
    } else if (dong === 7) {
      setX(windowWidth * 0.67);
      setY(340 - offset);
    } else if (dong === 10) {
      setX(windowWidth * 0.11);
      setY(260 - offset);
    } else if (dong === 18) {
      setX(windowWidth * 0.152);
      setY(140 - offset);
    }
    setSelected(dong);
  };

  return (
    <View>
      <View>
        <View
          style={{
            left: x,
            top: y,
            backgroundColor: '#FF8D8D',
            width: 50,
            height: 50,
            zIndex: 10,
            borderRadius: 30,
            opacity: 0.4,
          }}
        />
        <TouchableOpacity onPress={() => clickDong(1)}>
          <View style={styles(offset, windowWidth, windowHeight).itaewon_1}>
            <Text style={styles(offset, windowWidth, windowHeight).text}>
              이태원
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => clickDong(2)}>
          <View style={styles(offset, windowWidth, windowHeight).hannam_2}>
            <Text style={styles(offset, windowWidth, windowHeight).text}>
              한남동
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => clickDong(3)}>
          <View style={styles(offset, windowWidth, windowHeight).yongsan_3}>
            <Text style={styles(offset, windowWidth, windowHeight).text}>
              용산
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => clickDong(4)}>
          <View style={styles(offset, windowWidth, windowHeight).hangangro_4}>
            <Text style={styles(offset, windowWidth, windowHeight).text}>
              한강로
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => clickDong(5)}>
          <View style={styles(offset, windowWidth, windowHeight).ichon_5}>
            <Text style={styles(offset, windowWidth, windowHeight).text}>
              이촌동
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => clickDong(7)}>
          <View style={styles(offset, windowWidth, windowHeight).dongbingo_7}>
            <Text style={styles(offset, windowWidth, windowHeight).text}>
              동빙고{'\n'}서빙고
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => clickDong(10)}>
          <View style={styles(offset, windowWidth, windowHeight).wonhyoro_10}>
            <Text style={styles(offset, windowWidth, windowHeight).text}>
              원효로
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => clickDong(18)}>
          <View style={styles(offset, windowWidth, windowHeight).cheongpa_18}>
            <Text style={styles(offset, windowWidth, windowHeight).text}>
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
      top: windowHeight * 0.6,
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
      top: 50 - offset,
      backgroundColor: '#FFFCF0',
      width: 100,
      height: 100,
      borderRadius: 80,
    },
    hannam_2: {
      position: 'absolute',
      left: windowWidth * 0.58,
      top: 160 - offset,
      backgroundColor: '#FFFCF0',
      width: 110,
      height: 110,
      borderRadius: 60,
    },
    yongsan_3: {
      position: 'absolute',
      left: windowWidth * 0.417,
      top: 80 - offset,
      backgroundColor: '#FFFCF0',
      width: 70,
      height: 95,
      borderRadius: 50,
    },
    hangangro_4: {
      position: 'absolute',
      left: windowWidth * 0.333,
      top: 180 - offset,
      backgroundColor: '#FFFCF0',
      width: 80,
      height: 70,
      borderRadius: 60,
    },
    ichon_5: {
      position: 'absolute',
      left: windowWidth * 0.208,
      top: 260 - offset,
      backgroundColor: '#FFFCF0',
      width: 140,
      height: 120,
      borderRadius: 60,
    },
    dongbingo_7: {
      position: 'absolute',
      left: windowWidth * 0.625,
      top: 275 - offset,
      backgroundColor: '#FFFCF0',
      width: 80,
      height: 80,
      borderRadius: 60,
    },
    wonhyoro_10: {
      position: 'absolute',
      left: windowWidth * 0.056,
      top: 190 - offset,
      backgroundColor: '#FFFCF0',
      width: 90,
      height: 90,
      borderRadius: 60,
    },
    cheongpa_18: {
      position: 'absolute',
      left: windowWidth * 0.056,
      top: 60 - offset,
      backgroundColor: '#FFFCF0',
      width: 120,
      height: 120,
      borderRadius: 60,
    },
    text: {
      flex: 1,
      fontSize: 12,
      fontWeight: 'bold',
      textAlign: 'center',
      justifyContent: 'center',
    },
  });
export default SelectDong;
