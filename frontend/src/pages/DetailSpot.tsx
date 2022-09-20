import * as React from 'react';
import {View, Text, Button} from 'react-native';

function DetailSpot({navigation}) {
  return (
    <View>
      <View>
        <Text>이미지</Text>
      </View>
      <View>
        <Text>가게이름</Text>
        <Text>가게태그</Text>
        <Text>가게평점</Text>
      </View>
      <View>
        <Text>주소</Text>
        <Text>전화번호</Text>
        <Text>메뉴</Text>
      </View>
      <View>
        <Text>리뷰디테일</Text>
      </View>
      <Button
        title="장소변경페이지로"
        onPress={() => {
          navigation.navigate('ChangeSpot', {});
        }}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button title="닫기" />
        <Button title="변경" />
      </View>
    </View>
  );
}

export default DetailSpot;
