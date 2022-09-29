import * as React from 'react';
import {View, Text, FlatList, Button, Dimensions} from 'react-native';
import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {RootState} from '../store/reducer';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';

function Gallery({route, navigation}) {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const zone = route.params.dongId;
  const [Imageurl, setImageurl] = useState([]);

  const getData = async (dongId: number) => {
    const response = await axios.get(
      `http://j7a104.p.ssafy.io:8080/users/images/${dongId}`,
      {
        headers: {accessToken},
      },
    );
    return setImageurl(Imageurl.concat(response.data.responseData.photos));
  };

  useEffect(() => {
    if (zone <= 5) {
      getData(zone);
    } else if (zone === 7) {
      for (let index = 6; index <= 9; index++) {
        getData(index);
      }
    } else if (zone === 10) {
      for (let index = 10; index <= 17; index++) {
        getData(index);
      }
    } else {
      for (let index = 10; index <= 17; index++) {
        getData(index);
      }
    }
  }, []);

  const renderItem = useCallback(item => {
    console.log('renderItem');
    console.log(item.item.link);
    return (
      <View>
        <Text>
          {item.item.name}
          {zone}
        </Text>
        <FastImage
          source={{uri: `${item.item.link}`}}
          style={{
            height: Dimensions.get('window').width / 3,
            width: Dimensions.get('window').width / 3,
          }}
        />
      </View>
    );
  }, []);

  return (
    <View>
      <View>
        <View>
          <FlatList
            data={Imageurl}
            numColumns={3}
            keyExtractor={item => item.name.toString()}
            renderItem={renderItem}
          />
        </View>
      </View>
      <Button
        title="Go Home"
        onPress={() => {
          navigation.navigate('Home', {});
        }}
      />
    </View>
  );
}

export default Gallery;
