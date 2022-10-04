import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {RootState} from '../store/reducer';
import {useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Button} from '@react-native-material/core';

function Gallery({route, navigation}) {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const zone = route.params.dongId;
  const [Imageurl, setImageurl] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  var resIndex = 0;
  const [links, setLinks] = useState([]);

  const getData = async (dongId: number) => {
    const response = await axios.get(
      `http://j7a104.p.ssafy.io:8080/users/images/${dongId}`,
      {
        headers: {accessToken},
      },
    );
    var newres = response.data.responseData.photos;
    newres.forEach(element => {
      var oneres = element;
      oneres.id = resIndex;
      resIndex = resIndex + 1;
      setLinks(links => links.concat({url: `${oneres.link}`}));
    });
    return setImageurl(Imageurl => Imageurl.concat(newres));
  };

  const clickImage = (i: number) => {
    setModalVisible(true);
    setImageIndex(imageIndex => i);
  };

  useEffect(() => {
    setLinks(links => []);
    setImageurl(Imageurl => []);
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
    return (
      <TouchableOpacity
        onPress={() => clickImage(item.item.id)}
        style={{
          paddingBottom: 10,
          paddingTop: 10,
          paddingLeft: 2,
          paddingRight: 2,
        }}>
        <View>
          <Text style={{color: 'gray', fontSize: 16}}>
            {item.item.name}
            {zone}
          </Text>
          <FastImage
            source={{uri: `${item.item.link}`}}
            style={{
              height: Dimensions.get('window').width / 3 - 4,
              width: Dimensions.get('window').width / 3 - 4,
            }}
          />
        </View>
      </TouchableOpacity>
    );
  }, []);

  return (
    <View style={{flex: 1}}>
      <View>
        <View>
          <FlatList
            data={Imageurl}
            numColumns={3}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
        </View>
        <Modal
          visible={modalVisible}
          transparent={true}
          onRequestClose={() => setModalVisible(false)}>
          <ImageViewer imageUrls={links} index={imageIndex} />
        </Modal>
      </View>
    </View>
  );
}

export default Gallery;
