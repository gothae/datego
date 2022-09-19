import * as React from 'react';
import {View, Text, Button} from 'react-native';

function Preference({navigation}) {
  return (
    <View>
      <View>
        <Text>Category</Text>
      </View>
      <View>
        <View>
          <Text>밥사진</Text>
          <Text>한식</Text>
        </View>
        <View>
          <Text>밥사진</Text>
          <Text>한식</Text>
        </View>
        <View>
          <Text>밥사진</Text>
          <Text>한식</Text>
        </View>
        <View>
          <Text>밥사진</Text>
          <Text>한식</Text>
        </View>
        <View>
          <Text>가격</Text>
          <Text>가격그래프</Text>
        </View>
      </View>
      <Button
        title="코스 설정완료"
        onPress={() => {
          navigation.navigate('Course', {});
        }}
      />
    </View>
  );
}

export default Preference;
