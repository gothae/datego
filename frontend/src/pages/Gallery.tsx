import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
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

function Gallery({route, navigation}) {
  const accessToken = useSelector((state: RootState) => state.user.accessToken);
  const zone = route.params.dongId;
  const [Imageurl, setImageurl] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);
  var resIndex = 0;
  const [links, setLinks] = useState([]);
  const unique = (value, index, self) => {
    return self.indexOf(value) === index;
  };

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
      console.log('link');
      console.log(oneres.link);
      setLinks(links => links.concat({url: `${oneres.link}`}));
    });
    setLinks(links => links.filter(unique));
    console.log(links);
    return setImageurl(Imageurl => Imageurl.concat(newres));
  };

  const clickImage = (i: number) => {
    console.log('clickImage');
    console.log(i);
    setModalVisible(true);
    setImageIndex(imageIndex => i);
  };

  useEffect(() => {
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
    console.log('renderItem');
    console.log(item.item.link);
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
      </TouchableOpacity>
    );
  }, []);

  return (
    <View>
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
