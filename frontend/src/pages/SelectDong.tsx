import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {RootState} from '../../src/store/reducer';
import {useSelector} from 'react-redux';
import {useState} from 'react';

function SelectDong({navigation, offset, getDong}) {
  const myReviews = useSelector((state: RootState) => state.user.myReviews);
  const dongReviewCnt = [0, 0, 0, 0, 0, 0, 0, 0];
  const [x, setX] = useState(-100);
  const [y, setY] = useState(-100);

  const setDongReviewCnt = () => {
    myReviews.map(review => {
      if (review['id'] === 1) dongReviewCnt[0] = review['count'];
      else if (review['id'] === 2) dongReviewCnt[1] = review['count'];
      else if (review['id'] === 3) dongReviewCnt[2] = review['count'];
      else if (review['id'] === 4) dongReviewCnt[3] = review['count'];
      else if (review['id'] === 5) dongReviewCnt[4] = review['count'];
      else if (6 <= review['id'] && review['id'] <= 9)
        dongReviewCnt[5] += review['count'];
      else if (10 <= review['id'] && review['id'] <= 17)
        dongReviewCnt[6] += review['count'];
      else dongReviewCnt[7] += review['count'];
    });
  };
  setDongReviewCnt();

  const clickDong = (dong: number) => {
    getDong(dong);
    if (dong === 1) {
      setX(255);
      setY(125 - offset);
    } else if (dong === 2) {
      setX(240);
      setY(240 - offset);
    } else if (dong === 3) {
      setX(160);
      setY(155 - offset);
    } else if (dong === 4) {
      setX(135);
      setY(240 - offset);
    } else if (dong === 5) {
      setX(120);
      setY(340 - offset);
    } else if (dong === 7) {
      setX(240);
      setY(340 - offset);
    } else if (dong === 10) {
      setX(40);
      setY(260 - offset);
    } else if (dong === 18) {
      setX(55);
      setY(140 - offset);
    }
  };

  return (
    <View>
      <View>
        <View
          style={{
            left: x,
            top: y,
            backgroundColor: '#FFCECD',
            width: 50,
            height: 50,
            zIndex: 10,
            borderRadius: 30,
            opacity: 0.4,
          }}
        />
        <TouchableOpacity onPress={() => clickDong(1)}>
          <View style={styles(dongReviewCnt, offset).itaewon_1}>
            <Text style={styles(dongReviewCnt, offset).text}>이태원</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => clickDong(2)}>
          <View style={styles(dongReviewCnt, offset).hannam_2}>
            <Text style={styles(dongReviewCnt, offset).text}>한남동</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => clickDong(3)}>
          <View style={styles(dongReviewCnt, offset).yongsan_3}>
            <Text style={styles(dongReviewCnt, offset).text}>용산</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => clickDong(4)}>
          <View style={styles(dongReviewCnt, offset).hangangro_4}>
            <Text style={styles(dongReviewCnt, offset).text}>한강로</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => clickDong(5)}>
          <View style={styles(dongReviewCnt, offset).ichon_5}>
            <Text style={styles(dongReviewCnt, offset).text}>이촌동</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => clickDong(7)}>
          <View style={styles(dongReviewCnt, offset).dongbingo_7}>
            <Text style={styles(dongReviewCnt, offset).text}>
              동빙고{'\n'}서빙고
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => clickDong(10)}>
          <View style={styles(dongReviewCnt, offset).wonhyoro_10}>
            <Text style={styles(dongReviewCnt, offset).text}>원효로</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => clickDong(18)}>
          <View style={styles(dongReviewCnt, offset).cheongpa_18}>
            <Text style={styles(dongReviewCnt, offset).text}>
              청파{'\n'}남영{'\n'}효창
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const bgColors = ['#FFFCF0', '#FFF5CD', '#FFE579', '#FFD629'];
const styles = (dongReviewCnt, offset) =>
  StyleSheet.create({
    goBtn: {
      flex: 1,
      position: 'absolute',
      top: 400,
      left: 100,
      width: '40%',
      borderRadius: 15,
      alignItems: 'center',
      backgroundColor: '#FFA856',
      color: 'white',
    },
    itaewon_1: {
      position: 'absolute',
      left: 230,
      top: 50 - offset,
      backgroundColor: bgColors[dongReviewCnt[0] < 3 ? dongReviewCnt[0] : 3],
      width: 100,
      height: 100,
      borderRadius: 80,
    },
    hannam_2: {
      position: 'absolute',
      left: 210,
      top: 160 - offset,
      backgroundColor: bgColors[dongReviewCnt[1] < 3 ? dongReviewCnt[1] : 3],
      width: 110,
      height: 110,
      borderRadius: 60,
    },
    yongsan_3: {
      position: 'absolute',
      left: 150,
      top: 80 - offset,
      backgroundColor: bgColors[dongReviewCnt[2] < 3 ? dongReviewCnt[2] : 3],
      width: 70,
      height: 95,
      borderRadius: 50,
    },
    hangangro_4: {
      position: 'absolute',
      left: 120,
      top: 180 - offset,
      backgroundColor: bgColors[dongReviewCnt[3] < 3 ? dongReviewCnt[3] : 3],
      width: 80,
      height: 70,
      borderRadius: 60,
    },
    ichon_5: {
      position: 'absolute',
      left: 75,
      top: 260 - offset,
      backgroundColor: bgColors[dongReviewCnt[4] < 3 ? dongReviewCnt[4] : 3],
      width: 140,
      height: 120,
      borderRadius: 60,
    },
    dongbingo_7: {
      position: 'absolute',
      left: 225,
      top: 275 - offset,
      backgroundColor: bgColors[dongReviewCnt[5] < 3 ? dongReviewCnt[5] : 3],
      width: 80,
      height: 80,
      borderRadius: 60,
    },
    wonhyoro_10: {
      position: 'absolute',
      left: 20,
      top: 190 - offset,
      backgroundColor: bgColors[dongReviewCnt[6] < 3 ? dongReviewCnt[6] : 3],
      width: 90,
      height: 90,
      borderRadius: 60,
    },
    cheongpa_18: {
      position: 'absolute',
      left: 20,
      top: 60 - offset,
      backgroundColor: bgColors[dongReviewCnt[7] < 3 ? dongReviewCnt[7] : 3],
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
