import * as React from 'react';
import {View, Text, Button} from 'react-native';

function ChangeSpot({navigation}) {
  return (
    <View>
      <Text>Spot1</Text>
      <Button
        title="코스보기 페이지로"
        onPress={() => {
          navigation.navigate('Course', {});
        }}
      />
      <Button
        title="디테일 페이지로"
        onPress={() => {
          navigation.navigate('DetailSpot', {});
        }}
      />
      <Text>Spot2</Text>
      <Text>Spot3</Text>
      <Text>Spot4</Text>
      <Text>Spot5</Text>
    </View>
  );
}

export default ChangeSpot;
