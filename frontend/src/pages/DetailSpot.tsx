import * as React from 'react';
import {View, Text, Image} from 'react-native';
import { Button} from "@react-native-material/core";


function DetailSpot({ navigation }) {
  // stores에 id에 해당되는 정보 불러오기
  const stores = {name: 'STUN HOUS', tel:	'0507-1304-1597', addr1:	'갈월동 19-4', addr2:	'갈월동', Latitude:	37.5454352, Longitude:	126.9726477, menu:	['Popresso'], price:	[4500], thumb:	'https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190826_277%2F1566788683492Jeaet_JPEG%2FUAX7h1H3Lg2fsyUL8-4vd8Vk.jpg', rating:	2.65}
  return (
    <View>
      <View>
      <Image style={{height:250}} source={{uri: stores.thumb}}></Image>
      </View>
      <View style={{alignItems:'center', marginVertical: 8}}>
        <Text style={{fontSize: 20}}>{stores.name}</Text>
        <Text>가게태그</Text>
        <Text>{stores.rating}</Text>
      </View>
        <View>
        <Text style={{marginLeft: 12,marginVertical:8, fontSize: 16}}>{stores.addr1}</Text>
        <Text style={{marginLeft: 12,marginVertical:8, fontSize: 16}}>{stores.tel}</Text>
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
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 16, marginVertical: 8}}>
        <Button title="닫기" color={'#FFA856'}
          titleStyle={{
          color: "white",
            fontSize: 16
          }}
          style={{
            borderRadius: 60,
            width: 100,
          }}
           />
        <Button title="변경"color={'#FFA856'} 
        titleStyle={{
        color: "white",
            fontSize: 16
          }}
          style={{
            borderRadius: 60,
            width: 100,
          }}/>
      </View>
    </View>
  );
  
}

export default DetailSpot;
