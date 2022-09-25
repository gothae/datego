import * as React from 'react';
import { View, Text, Dimensions, StyleSheet, Image, Pressable } from 'react-native';
import { Button } from "@react-native-material/core";
import NaverMapView, {
  Align,
  Circle,
  Marker,
  Path,
  Polygon,
  Polyline,
} from 'react-native-nmap';

function Course({navigation}) {
  const P0 = {latitude: 37.53698, longitude: 127.0017};
  const P1 = {latitude: 37.53154, longitude: 127.007};
  const P2 = {latitude: 37.55392, longitude: 126.9767};
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <NaverMapView
          style={{ width: '100%', height: '80%' }}
          showsMyLocationButton={true}
          center={{ ...P0, zoom: 16 }}
          // onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
          onCameraChange={e =>
            console.warn('onCameraChange', JSON.stringify(e))
          }
          onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
          <Marker coordinate={P0} onClick={() => console.warn('onClick! p0')} />
          <Marker
            coordinate={P1}
            pinColor="blue"
            onClick={() => console.warn('onClick! p1')}
          />
          <Marker
            coordinate={P2}
            pinColor="red"
            onClick={() => console.warn('onClick! p2')}
          />
          <Path
            coordinates={[P0, P1]}
            onClick={() => console.warn('onClick! path')}
            width={10}
          />
          <Polyline
            coordinates={[P1, P2]}
            onClick={() => console.warn('onClick! polyline')}
          />
          <Circle
            coordinate={P0}
            color={'rgba(255,0,0,0.3)'}
            radius={200}
            onClick={() => console.warn('onClick! circle')}
          />
          <Polygon
            coordinates={[P0, P1, P2]}
            color={'rgba(0, 0, 0, 0.5)'}
            onClick={() => console.warn('onClick! polygon')}
          />
        </NaverMapView>
      </View>
      <View>
        <Pressable style={styles.storeList}
          onPress={() => {
            navigation.navigate('DetailSpot', {});
          }}
        >
          <View style={{ flex: 4 }}>
            <Image style={styles.imageBox} source={{ uri: stores.thumb }}></Image>
          </View>
          <View style={{ flex: 8, justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 8 }}>{stores.name}</Text>
            <View style={{ alignItems: 'flex-end', marginBottom: 8, marginRight: 8 }}>
              <Button title='변경' color={'#FFA856'}
                titleStyle={{
                  color: "white",
                  fontSize: 14,
                  fontWeight: 'bold'
                }}
                style={{
                  borderRadius: 60,
                  height: 24,
                  justifyContent: 'center'
                }}
                onPress={() => {
                  navigation.navigate('ChangeSpot', {});
                }}
              ></Button>
            </View>
          </View>
        </Pressable>
      </View>
      <View>
        <Button
          title="코스시작하기"
          color={'#FFA856'}
                  titleStyle={{
                    color: "white",
                    fontSize: 30,
                    fontWeight:'bold'
                }}
                style={{
                  height: 48,
                  justifyContent:'center'
                }}
          onPress={() => {
            navigation.navigate('CourseIng', {});
          }}
        />
      </View>
    </View>
  );
}
const stores = {name: 'STUN HOUS', tel:	'0507-1304-1597', addr1:	'갈월동 19-4', addr2:	'갈월동', Latitude:	37.5454352, Longitude:	126.9726477, menu:	['Popresso'], price:	[4500], thumb:	'https://search.pstatic.net/common/?autoRotate=true&type=w560_sharpen&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20190826_277%2F1566788683492Jeaet_JPEG%2FUAX7h1H3Lg2fsyUL8-4vd8Vk.jpg', rating:	2.65}
const styles = StyleSheet.create({
  storeList: {
    flexDirection: "row",
    backfaceVisibility: 'visible',
    flexWrap: "wrap",
    borderWidth: 1, 
    borderRadius: 15,
    marginHorizontal: 8,
    marginVertical: 8
  }, 
  imageBox: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    margin: 8, 
    height: 100,
    width: 100
  }
});
export default Course;
