import * as React from 'react';
import {View, Text, Dimensions, Button} from 'react-native';
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
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <NaverMapView
          style={{width: '100%', height: '80%'}}
          showsMyLocationButton={true}
          center={{...P0, zoom: 16}}
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
      <View style={{flex: 1}}>
        <Text>음식점</Text>
        <Button
          title="Go ChangeSpot"
          onPress={() => {
            navigation.navigate('ChangeSpot', {});
          }}
        />
      </View>
      <View>
        <Button
          title="코스시작하기"
          onPress={() => {
            navigation.navigate('CourseIng', {});
          }}
        />
      </View>
    </View>
  );
}
export default Course;
