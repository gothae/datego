import * as React from 'react';
import {useState} from 'react';
import {View, Text, Button} from 'react-native';

function CourseIng({navigation}) {
  return (
    <View>
      <View>
        <Text>네이버지도</Text>
      </View>
      <View>
        <Text>메달</Text>
      </View>
      <View>
        <Text>음식점</Text>
      </View>
      <View>
        <Text>미션</Text>
        <Text>AR키는 버튼</Text>
      </View>
      <Button
        title="그만하기"
        onPress={() => {
          navigation.navigate('Home', {});
        }}
      />
    </View>
  );
}

export default CourseIng;
