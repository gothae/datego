import * as React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  Button,
} from 'react-native';
import {useState, useEffect, useCallback} from 'react';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import {RootState} from '../store/reducer';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ParamListBase} from '@react-navigation/native';
type GalleryProps = NativeStackScreenProps<ParamListBase, 'Gallery'>;

function Gallery({navigation}: GalleryProps) {
  const checkuser = auth().currentUser;
  // const [Imageurl, setValue1] = useState('이거를 바꾸자~');
  // useEffect(() => {
  //   const getData = async () => {
  //     // const response = await axios.get(
  //     //   'https://picsum.photos/v2/list?page=2&limit=10',
  //     // );
  //     // setValue1(response.data[0].download_url);
  //     const response = await axios.get('http://10.0.2.2:3105');
  //     console.log(response);
  //   };
  //   getData();
  // }, []);

  const onClick = useCallback(() => {
    console.log(1);
    const getData = async () => {
      const response = await axios.get('http://10.0.2.2:8080/categories');
      console.log(response.data);
    };
    getData();
  }, []);

  return (
    <View>
      <Text>{checkuser?.displayName}님의 갤러리</Text>
      <Text>{checkuser?.email}님의 갤러리</Text>
      <View>
        <TouchableHighlight onPress={onClick}>
          <Text>DATE GO</Text>
        </TouchableHighlight>
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
