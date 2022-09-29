import * as React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableHighlight,
  Button,
  Dimensions,
} from 'react-native';
import {useState, useEffect, useCallback} from 'react';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import {RootState} from '../store/reducer';
import {useSelector} from 'react-redux';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
type GalleryProps = NativeStackScreenProps<ParamListBase, 'Gallery'>;

function Gallery({navigation}: GalleryProps) {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const dongId = 1;
  // const photos = [];
  const [Imageurl, setImageurl] = useState([]);

  const getData = async () => {
    const response = await axios.get(
      `http://10.0.2.2:8080/users/images/${dongId}`,
      {
        headers: {accessToken},
      },
    );
    return setImageurl(response.data.responseData.photos);
  };

  useEffect(() => {
    getData();
  }, [dongId]);

  const renderItem = useCallback(item => {
    console.log('renderItem');
    console.log(item.item.link);
    return (
      <View>
        <Text>{item.item.name}</Text>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
  logo: {
    width: 66,
    height: 58,
  },
});
export default Gallery;
