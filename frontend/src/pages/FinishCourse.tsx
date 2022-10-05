import * as React from 'react';
import {View, Text, TouchableOpacity, Image, Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';

function FinishCourse() {
  const navigation = useNavigation();
  const unclearMissions = useSelector(
    (state: RootState) => state.course.missions.unclearMissions,
  );
  const clearMissions = useSelector(
    (state: RootState) => state.course.missions.clearMissions,
  );

  console.log(unclearMissions);
  let clearMedal = clearMissions.map((a, idx) => (
    <Image
      style={{
        width: (Dimensions.get('window').width - 30) / 5,
        height: (Dimensions.get('window').width - 30) / 5,
      }}
      source={require('../assets/medal.png')}
    />
  ));
  let unclearMedal = unclearMissions.map((a, idx) => (
    <Image
      style={{
        width: (Dimensions.get('window').width - 30) / 5,
        height: (Dimensions.get('window').width - 30) / 5,
        opacity: 0.4,
      }}
      source={require('../assets/medal.png')}
    />
  ));

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View
        style={{
          flex: 0.4,
          backgroundColor: 'orange',
          justifyContent: 'center',
          borderRadius: 50,
          marginHorizontal: 10,
        }}>
        <View style={{justifyContent: 'center'}}>
          <Text style={{color: 'white', fontSize: 25, textAlign: 'center'}}>
            {unclearMedal.length + clearMedal.length}개 중 {clearMedal.length}개
            달성!
          </Text>
        </View>
        <View
          style={{
            flex: 0.7,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {clearMedal}
          {unclearMedal}
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity onPress={() => navigation.navigate('FinalReview')}>
            <Text style={{fontSize: 20, color: 'black'}}>리뷰하기</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Text style={{fontSize: 20, color: 'black'}}> 떠나기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default FinishCourse;
