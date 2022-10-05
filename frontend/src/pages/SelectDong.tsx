/* eslint-disable react/react-in-jsx-scope */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {useState} from 'react';

function SelectDong({navigation: {navigate}, route}) {
  const [selected, setSelected] = useState(0);
  const [clicked, setClicked] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    7: false,
    10: false,
    18: false,
  });

  const gogo = () => {
    if (selected === 0) {
      Alert.alert('지역을 선택하세요.');
    } else {
      navigate('Preference', {selected});
    }
  };

  const clickDong = (dong: number) => {
    setSelected(dong);
    for (let i in clicked) {
      clicked[i] = false;
    }
    clicked[dong] = true;
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View style={{flex: 1}} />
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: 'center',
          }}
          onPress={() => clickDong(18)}>
          <Image
            source={{
              uri: 'https://user-images.githubusercontent.com/66546079/193845296-69d3618a-e5ba-46c6-99bd-0a2c891fa789.png',
            }}
            style={styles(clicked).cheongpa_18}
            resizeMode="contain"
          />
          <Text
            style={{
              position: 'relative',
              fontSize: 14,
              fontWeight: 'bold',
              textAlign: 'center',
              color: clicked['18'] ? 'black' : 'gray',
              top: clicked['18'] ? 120 : 100,
            }}>
            청파{'\n'}남영{'\n'}효창
          </Text>
        </TouchableOpacity>
        <View style={{flex: 1}} />
        <View style={{flex: 1}} />
        <TouchableOpacity
          onPress={() => clickDong(1)}
          style={{
            flex: 1,
            alignItems: 'center',
            marginTop: '8%',
            marginRight: '8%',
          }}>
          <Image
            source={{
              uri: 'https://user-images.githubusercontent.com/66546079/193848026-58edaadd-35c1-4c0f-b920-50ed41751a43.png',
            }}
            style={styles(clicked).itaewon_1}
          />
          <Text
            style={{
              position: 'relative',
              fontSize: 14,
              fontWeight: 'bold',
              textAlign: 'center',
              color: clicked['1'] ? 'black' : 'gray',
              top: clicked['1'] ? 120 : 100,
            }}>
            이태원
          </Text>
        </TouchableOpacity>
        <View style={{flex: 1}} />
      </View>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1}} />
        <TouchableOpacity
          onPress={() => clickDong(3)}
          style={{
            flex: 1,
            alignItems: 'center',
            marginBottom: '15%',
            marginRight: '8%',
          }}>
          <Image
            source={{
              uri: 'https://user-images.githubusercontent.com/66546079/193843990-59905ede-2b48-46ea-bf80-2001e3ee0b58.png',
            }}
            style={styles(clicked).yongsan_3}
          />
          <Text
            style={{
              position: 'relative',
              fontSize: 14,
              fontWeight: 'bold',
              textAlign: 'center',
              color: clicked['3'] ? 'black' : 'gray',
              top: clicked['3'] ? 120 : 100,
            }}>
            용산동
          </Text>
        </TouchableOpacity>
        <View style={{flex: 1}} />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          position: 'relative',
          bottom: '5%',
        }}>
        <View style={{flex: 1}} />
        <TouchableOpacity
          onPress={() => clickDong(10)}
          style={{
            flex: 1,
            alignItems: 'center',
            marginBottom: '5%',
            marginRight: '10%',
          }}>
          <Image
            source={{
              uri: 'https://user-images.githubusercontent.com/66546079/193846268-0ba53d6e-f25a-40d2-8236-b3b7b5b64972.png',
            }}
            style={styles(clicked).wonhyoro_10}
          />
          <Text
            style={{
              position: 'relative',
              fontSize: 14,
              fontWeight: 'bold',
              textAlign: 'center',
              color: clicked['10'] ? 'black' : 'gray',
              top: clicked['10'] ? 120 : 100,
            }}>
            원효로
          </Text>
        </TouchableOpacity>
        <View style={{flex: 1}} />
        <View style={{flex: 1}} />
        <TouchableOpacity
          onPress={() => clickDong(2)}
          style={{
            flex: 1,
            alignItems: 'center',
            marginLeft: '10%',
          }}>
          <Image
            source={{
              uri: 'https://user-images.githubusercontent.com/66546079/193842872-d78d057b-d09f-4953-8a04-7f201d78b48a.png',
            }}
            style={styles(clicked).hannam_2}
          />
          <Text
            style={{
              position: 'relative',
              fontSize: 14,
              fontWeight: 'bold',
              textAlign: 'center',
              color: clicked['2'] ? 'black' : 'gray',
              top: clicked['2'] ? 120 : 100,
            }}>
            한남동
          </Text>
        </TouchableOpacity>
        <View style={{flex: 1}} />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          position: 'relative',
          bottom: '10%',
        }}>
        <View style={{flex: 1}} />
        <TouchableOpacity
          onPress={() => clickDong(4)}
          style={{
            flex: 1,
            alignItems: 'center',
            marginBottom: '20%',
            marginRight: '8%',
          }}>
          <Image
            source={{
              uri: 'https://user-images.githubusercontent.com/66546079/193844402-37576296-b6e0-4895-a344-96108661ce47.png',
            }}
            style={styles(clicked).hangangro_4}
          />
          <Text
            style={{
              position: 'relative',
              fontSize: 14,
              fontWeight: 'bold',
              textAlign: 'center',
              color: clicked['4'] ? 'black' : 'gray',
              top: clicked['4'] ? 120 : 100,
            }}>
            한강로
          </Text>
        </TouchableOpacity>
        <View style={{flex: 1}} />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          position: 'relative',
          bottom: '20%',
        }}>
        <View style={{flex: 1}} />
        <TouchableOpacity
          onPress={() => clickDong(5)}
          style={{
            flex: 1,
            alignItems: 'center',
            marginBottom: '8%',
            marginRight: '8%',
          }}>
          <Image
            source={{
              uri: 'https://user-images.githubusercontent.com/66546079/193846926-3cb410f8-02d0-4461-8f92-f22e03e21dcf.png',
            }}
            style={styles(clicked).ichon_5}
          />
          <Text
            style={{
              position: 'relative',
              fontSize: 14,
              fontWeight: 'bold',
              textAlign: 'center',
              color: clicked['5'] ? 'black' : 'gray',
              top: clicked['5'] ? 120 : 100,
            }}>
            이촌동
          </Text>
        </TouchableOpacity>
        <View style={{flex: 1}} />
        <View style={{flex: 1}} />
        <TouchableOpacity
          onPress={() => clickDong(7)}
          style={{
            flex: 1,
            alignItems: 'center',
            marginBottom: '8%',
            marginLeft: '8%',
          }}>
          <Image
            source={{
              uri: 'https://user-images.githubusercontent.com/66546079/193843300-3ed58ebe-fbb7-47a7-b5ea-10e01004e64b.png',
            }}
            style={styles(clicked).dongbingo_7}
          />
          <Text
            style={{
              position: 'relative',
              fontSize: 14,
              fontWeight: 'bold',
              textAlign: 'center',
              color: clicked['7'] ? 'black' : 'gray',
              top: clicked['7'] ? 120 : 100,
            }}>
            동빙고{'\n'}서빙고
          </Text>
        </TouchableOpacity>
        <View style={{flex: 1}} />
      </View>
      {/* 데이트할 동 선택 페이지로 이동 */}
      <View style={{flex: 1.4, alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            gogo();
          }}
          style={styles([]).btn}>
          <Text style={{color: 'white', fontSize: 40, textAlign: 'center'}}>
            Go GO
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = (clicked: any[]) =>
  StyleSheet.create({
    btn: {
      width: 150,
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 15,
      backgroundColor: '#FFA856',
    },
    itaewon_1: {
      position: 'absolute',
      width: clicked['1'] ? 120 : 100,
      height: clicked['1'] ? 120 : 100,
      justifyContent: 'center',
      opacity: clicked['1'] ? 1 : 0.6,
    },
    hannam_2: {
      position: 'absolute',
      width: clicked['2'] ? 120 : 100,
      height: clicked['2'] ? 120 : 100,
      justifyContent: 'center',
      opacity: clicked['2'] ? 1 : 0.6,
    },
    yongsan_3: {
      position: 'absolute',
      width: clicked['3'] ? 120 : 100,
      height: clicked['3'] ? 120 : 100,
      justifyContent: 'center',
      opacity: clicked['3'] ? 1 : 0.6,
    },
    hangangro_4: {
      position: 'absolute',
      width: clicked['4'] ? 120 : 100,
      height: clicked['4'] ? 120 : 100,
      justifyContent: 'center',
      opacity: clicked['4'] ? 1 : 0.6,
    },
    ichon_5: {
      position: 'absolute',
      width: clicked['5'] ? 120 : 100,
      height: clicked['5'] ? 120 : 100,
      justifyContent: 'center',
      opacity: clicked['5'] ? 1 : 0.6,
    },
    dongbingo_7: {
      position: 'absolute',
      width: clicked['7'] ? 120 : 100,
      height: clicked['7'] ? 120 : 100,
      justifyContent: 'center',
      opacity: clicked['7'] ? 1 : 0.6,
    },
    wonhyoro_10: {
      position: 'absolute',
      width: clicked['10'] ? 120 : 100,
      height: clicked['10'] ? 120 : 100,
      justifyContent: 'center',
      opacity: clicked['10'] ? 1 : 0.6,
    },
    cheongpa_18: {
      position: 'absolute',
      width: clicked['18'] ? 120 : 100,
      height: clicked['18'] ? 120 : 100,
      justifyContent: 'center',
      opacity: clicked['18'] ? 1 : 0.6,
    },
    text: {
      position: 'relative',
      top: 100,
      fontSize: 14,
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'black',
    },
  });
export default SelectDong;
