import * as React from 'react';
import {
  View,
  Text,
  Modal,
  Dimensions,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {Button} from '@react-native-material/core';
import {Rating} from 'react-native-ratings';
import {useNavigation} from '@react-navigation/native';

function FinalReview() {
  const navigation = useNavigation();
  const stores = useSelector((state: RootState) => state.stores.stores);
  // useEffect(() => {
  //   console.log('스토어즈', stores)
  // }, [stores])

  const [modalVisible0, setModalVisible0] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [modalVisible4, setModalVisible4] = useState(false);
  const [reviews0, setRevuews0] = useState([]);
  const [reviews1, setRevuews1] = useState([]);
  const [reviews2, setRevuews2] = useState([]);
  const [reviews3, setRevuews3] = useState([]);
  const [reviews4, setRevuews4] = useState([]);
  const userSpotId = useSelector(
    (state: RootState) => state.userSpot.userSpotList,
  );
  const accessToken = useSelector((state: RootState) => state.user.accessToken);

  // useEffect(() => {
  //   console.log('여기',userSpotId)
  // },[userSpotId])

  const [selectedId, setSelectedId] = useState<number[]>([]);
  const [ratingScore, setRatingScore] = useState<number>(1);

  async function getData0(spotId) {
    const response = await axios.get(
      `http://j7a104.p.ssafy.io:8080/spots/${spotId}/reviews`,
    );
    setRevuews0(response.data.responseData);
    // console.log(reviews0)
  }
  async function getData1(spotId) {
    const response = await axios.get(
      `http://j7a104.p.ssafy.io:8080/spots/${spotId}/reviews`,
    );
    setRevuews1(response.data.responseData);
  }
  async function getData2(spotId) {
    const response = await axios.get(
      `http://j7a104.p.ssafy.io:8080/spots/${spotId}/reviews`,
    );
    setRevuews2(response.data.responseData);
  }
  async function getData3(spotId) {
    const response = await axios.get(
      `http://j7a104.p.ssafy.io:8080/spots/${spotId}/reviews`,
    );
    setRevuews3(response.data.responseData);
  }
  async function getData4(spotId) {
    const response = await axios.get(
      `http://j7a104.p.ssafy.io:8080/spots/${spotId}/reviews`,
    );
    setRevuews4(response.data.responseData);
  }
  useEffect(() => {
    console.log('USERSPOTID');
    console.log(userSpotId);
    let spotId = 0;
    for (let i = userSpotId.length - 1; i >= 0; i--) {
      if (i === 0) {
        if (userSpotId[i] !== 0) {
          setModalVisible0(true);
          spotId = stores[i].id;
          getData0(spotId);
        }
      } else if (i === 1) {
        if (userSpotId[i] !== 0) {
          setModalVisible1(true);
          spotId = stores[i].id;
          getData1(spotId);
        }
      } else if (i === 2) {
        if (userSpotId[i] !== 0) {
          setModalVisible2(true);
          spotId = stores[i].id;
          getData2(spotId);
        }
      } else if (i === 3) {
        if (userSpotId[i] !== 0) {
          setModalVisible3(true);
          spotId = stores[i].id;
          getData3(spotId);
        }
      } else if (i === 4) {
        if (userSpotId[i] !== 0) {
          setModalVisible4(true);
          spotId = stores[i].id;
          getData4(spotId);
        }
      }
    }
  }, []);

  const numColumns = 3;

  const Item = ({item}) => (
    <TouchableOpacity
      style={{
        backgroundColor:
          selectedId.indexOf(item.id) !== -1 ? '#F07E14' : '#FFA865',
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width / 3.7,
        height: Dimensions.get('window').height / 18,
        borderRadius: 30,
        marginVertical: '1%',
        marginHorizontal: '2.6%',
      }}
      onPress={() => {
        if (selectedId.indexOf(item.id) == -1) {
          console.log('푸쉬');
          setSelectedId([...selectedId, item.id]);
        } else {
          console.log('팝');
          const idx = selectedId.indexOf(item.id);
          const prevArr: number[] = selectedId.slice(0, idx);
          const nextArr: number[] = selectedId.slice(idx + 1);
          setSelectedId(prevArr.concat(nextArr));
        }
      }}>
      <Text
        style={{
          color: 'white',
          fontSize: 12,
        }}>
        #{item.name}
      </Text>
    </TouchableOpacity>
  );

  let images0;

  if (stores[0].image) {
    if (stores[0].image[0] == '"') {
      images0 = (
        <Image
          style={styles.image}
          source={{uri: stores[0].image.slice(1, stores[0].image.length)}}
        />
      );
    } else {
      images0 = <Image style={styles.image} source={{uri: stores[0].image}} />;
    }
  } else if (stores[0].images) {
    if (stores[0].images[0][0] == 'h') {
      images0 = (
        <Image style={styles.image} source={{uri: stores[0].images[0]}} />
      );
    } else if (stores[0].images[0][1] == 'h') {
      images0 = (
        <Image
          style={styles.image}
          source={{
            uri: stores[0].images[0].slice(1, stores[0].images[0].length - 1),
          }}
        />
      );
    } else {
      images0 = (
        <Image
          style={styles.image}
          source={{
            uri: stores[0].images[0].slice(1, stores[0].images[0].length - 1),
          }}
        />
      );
    }
  }
  let images1;

  if (stores[1].image) {
    if (stores[1].image[0] == '"') {
      images1 = (
        <Image
          style={styles.image}
          source={{uri: stores[1].image.slice(1, stores[1].image.length)}}
        />
      );
    } else {
      images0 = <Image style={styles.image} source={{uri: stores[1].image}} />;
    }
  } else if (stores[1].images) {
    if (stores[1].images[0][0] == 'h') {
      images1 = (
        <Image style={styles.image} source={{uri: stores[1].images[0]}} />
      );
    } else if (stores[1].images[0][1] == 'h') {
      images1 = (
        <Image
          style={styles.image}
          source={{
            uri: stores[1].images[0].slice(1, stores[1].images[0].length - 1),
          }}
        />
      );
    } else {
      images1 = (
        <Image
          style={styles.image}
          source={{
            uri: stores[1].images[0].slice(1, stores[1].images[0].length - 1),
          }}
        />
      );
    }
  }

  let images2 = <Text>가게 로딩중</Text>;
  if (stores.length > 2) {
    if (stores[2].image) {
      if (stores[2].image[0] == '"') {
        images2 = (
          <Image
            style={styles.image}
            source={{uri: stores[2].image.slice(1, stores[2].image.length)}}
          />
        );
      } else {
        images2 = (
          <Image style={styles.image} source={{uri: stores[2].image}} />
        );
      }
    } else if (stores[2].images) {
      if (stores[2].images[0][0] == 'h') {
        images2 = (
          <Image style={styles.image} source={{uri: stores[2].images[0]}} />
        );
      } else if (stores[2].images[0][1] == 'h') {
        images2 = (
          <Image
            style={styles.image}
            source={{
              uri: stores[2].images[0].slice(1, stores[2].images[0].length - 1),
            }}
          />
        );
      } else {
        images2 = (
          <Image
            style={styles.image}
            source={{
              uri: stores[2].images[0].slice(1, stores[2].images[0].length - 1),
            }}
          />
        );
      }
    }
  }
  let images3 = <Text>가게 로딩중</Text>;
  if (stores.length > 3) {
    if (stores[3].image) {
      if (stores[3].image[0] == '"') {
        images3 = (
          <Image
            style={styles.image}
            source={{uri: stores[3].image.slice(1, stores[3].image.length)}}
          />
        );
      } else {
        images3 = (
          <Image style={styles.image} source={{uri: stores[3].image}} />
        );
      }
    } else if (stores[3].images) {
      if (stores[3].images[0][0] == 'h') {
        images3 = (
          <Image style={styles.image} source={{uri: stores[3].images[0]}} />
        );
      } else if (stores[3].images[0][1] == 'h') {
        images3 = (
          <Image
            style={styles.image}
            source={{
              uri: stores[3].images[0].slice(1, stores[3].images[0].length - 1),
            }}
          />
        );
      } else {
        images3 = (
          <Image
            style={styles.image}
            source={{
              uri: stores[3].images[0].slice(1, stores[3].images[0].length - 1),
            }}
          />
        );
      }
    }
  }
  let images4 = <Text>가게 로딩중</Text>;
  if (stores.length > 4) {
    if (stores[4].image) {
      if (stores[4].image[0] == '"') {
        images4 = (
          <Image
            style={styles.image}
            source={{uri: stores[4].image.slice(1, stores[4].image.length)}}
          />
        );
      } else {
        images4 = (
          <Image style={styles.image} source={{uri: stores[4].image}} />
        );
      }
    } else if (stores[4].images) {
      if (stores[4].images[0][0] == 'h') {
        images4 = (
          <Image style={styles.image} source={{uri: stores[4].images[0]}} />
        );
      } else if (stores[4].images[0][1] == 'h') {
        images4 = (
          <Image
            style={styles.image}
            source={{
              uri: stores[4].images[0].slice(1, stores[4].images[0].length - 1),
            }}
          />
        );
      } else {
        images4 = (
          <Image
            style={styles.image}
            source={{
              uri: stores[4].images[0].slice(1, stores[4].images[0].length - 1),
            }}
          />
        );
      }
    }
  }
  const handleRating = (rate: number) => {
    setRatingScore(rate);
  };
  // useEffect(() => {
  //   console.log('평점', ratingScore);
  // }, [ratingScore])
  // useEffect(() => {
  //   console.log('담긴 태그', selectedId)
  //   console.log('reviewIds', selectedId)
  //   console.log('rate', ratingScore)
  //   console.log('userSpotId', userSpotId)
  // }, [selectedId])

  // 유저스팟 리스트의 첫번째 꺼를 가져와서

  async function postReview(userSpotId: number) {
    console.log('reviewIds', selectedId);
    console.log('rate', ratingScore);
    console.log('userSpotId', userSpotId);
    console.log('포스트좀해라');

    const response = await axios.post(
      `http://j7a104.p.ssafy.io:8080/spots/${userSpotId}/reviews`,
      {
        reviewIds: selectedId,
        rate: ratingScore,
      },
      {headers: {accessToken}},
    );
    console.log(response.data);
    // await axios.post(
    //   `http://j7a104.p.ssafy.io:8080/spots/${userSpotId}/reviews`, {headers: {accessToken}}, {
    // reviewIds: selectedId,
    // rate: ratingScore
    //   }
    // );
  }

  let name0 = <Text>가게 로딩중</Text>;
  let name1 = <Text>가게 로딩중</Text>;
  let name2 = <Text>가게 로딩중</Text>;
  let name3 = <Text>가게 로딩중</Text>;
  let name4 = <Text>가게 로딩중</Text>;
  if (stores[0]?.name) {
    name0 = (
      <Text style={{fontSize: 30, color: '#000000', fontWeight: 'bold'}}>
        {stores[0].name}
      </Text>
    );
  }
  if (stores[1]?.name) {
    name1 = (
      <Text style={{fontSize: 30, color: '#000000', fontWeight: 'bold'}}>
        {stores[1].name}
      </Text>
    );
  }
  if (stores.length > 2) {
    name2 = (
      <Text style={{fontSize: 30, color: '#000000', fontWeight: 'bold'}}>
        {stores[2].name}
      </Text>
    );
  }
  if (stores.length > 3) {
    name3 = (
      <Text style={{fontSize: 30, color: '#000000', fontWeight: 'bold'}}>
        {stores[3].name}
      </Text>
    );
  }
  if (stores.length > 4) {
    name4 = (
      <Text style={{fontSize: 30, color: '#000000', fontWeight: 'bold'}}>
        {stores[4].name}
      </Text>
    );
  }

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}>
      <View style={{}}>
        <View
          style={{
            height: Dimensions.get('window').height / 3,
            width: Dimensions.get('window').width / 1.2,
            backgroundColor: 'orange',
            borderRadius: 50,
            marginHorizontal: 10,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              color: '#FFFFFF',
              fontSize: 28,
              textAlign: 'center',
              fontWeight: 'bold',
            }}>
            감사합니다!!!!!
          </Text>
          <TouchableOpacity
            style={{marginTop: '8%', alignItems: 'center'}}
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <Text style={{color: 'black', fontWeight: 'bold', fontSize: 18}}>
              확인
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* 모달 1 */}
      {/* <Modal animationType="slide" transparent={true} visible={modalVisible0}> */}
      <Modal animationType="slide" transparent={true} visible={modalVisible0}>
        <View
          style={{
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            height: Dimensions.get('window').height / 1.02,
          }}>
          <View>{images0}</View>
          <View style={{marginVertical: '3.5%', marginBottom: '15%'}}>
            {name0}
          </View>
          <View />
          <FlatList
            data={reviews0}
            renderItem={({item}) => <Item item={item} />}
            numColumns={numColumns}
          />
          <View style={{marginBottom: '5%'}}>
            <Rating
              imageSize={45}
              type="star"
              ratingCount={5}
              onFinishRating={handleRating}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              style={{marginRight: '8%'}}
              onPress={() => {
                setModalVisible0(false);
              }}>
              <Button
                title="평가안하기"
                color={'#FFA856'}
                titleStyle={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}
                onPress={() => {
                  setModalVisible0(false);
                }}
                style={{
                  height: Dimensions.get('window').height / 20,
                  width: Dimensions.get('window').width / 2.8,
                  borderRadius: 200,

                  justifyContent: 'center',
                }}
                onPress={() => {
                  setModalVisible0(false);
                  setSelectedId([]);
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{marginLeft: '8%'}}
              onPress={() => {
                setModalVisible0(false);
              }}>
              <Button
                title="확인"
                color={'#FFA856'}
                titleStyle={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}
                style={{
                  height: Dimensions.get('window').height / 20,
                  width: Dimensions.get('window').width / 2.8,
                  borderRadius: 200,
                  justifyContent: 'center',
                }}
                onPress={() => {
                  setModalVisible0(false);
                  postReview(userSpotId[0]);
                  setSelectedId([]);
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* 모달 2 */}
      <Modal animationType="slide" transparent={true} visible={modalVisible1}>
        <View
          style={{
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            height: Dimensions.get('window').height / 1.02,
          }}>
          <View>{images1}</View>
          <View style={{marginVertical: '3.5%', marginBottom: '15%'}}>
            {name1}
          </View>
          <View />
          <FlatList
            data={reviews1}
            renderItem={({item}) => <Item item={item} />}
            numColumns={numColumns}
          />
          <View style={{marginBottom: '5%'}}>
            <Rating
              imageSize={45}
              type="star"
              ratingCount={5}
              onFinishRating={handleRating}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              style={{marginRight: '8%'}}
              onPress={() => {
                setModalVisible1(false);
              }}>
              <Button
                title="평가안하기"
                color={'#FFA856'}
                titleStyle={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}
                onPress={() => {
                  setModalVisible1(false);
                  setSelectedId([]);
                }}
                style={{
                  height: Dimensions.get('window').height / 20,
                  width: Dimensions.get('window').width / 2.8,
                  borderRadius: 200,

                  justifyContent: 'center',
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{marginLeft: '8%'}}
              onPress={() => {
                setModalVisible1(false);
              }}>
              <Button
                title="확인"
                color={'#FFA856'}
                titleStyle={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}
                style={{
                  height: Dimensions.get('window').height / 20,
                  width: Dimensions.get('window').width / 2.8,
                  borderRadius: 200,
                  justifyContent: 'center',
                }}
                onPress={() => {
                  setModalVisible1(false);
                  postReview(userSpotId[1]);
                  setSelectedId([]);
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* 모달 3 */}
      <Modal animationType="slide" transparent={true} visible={modalVisible2}>
        <View
          style={{
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            height: Dimensions.get('window').height / 1.02,
          }}>
          <View>{images2}</View>
          <View style={{marginVertical: '3.5%', marginBottom: '15%'}}>
            {name2}
          </View>
          <View />
          <FlatList
            data={reviews2}
            renderItem={({item}) => <Item item={item} />}
            numColumns={numColumns}
          />
          <View style={{marginBottom: '5%'}}>
            <Rating
              imageSize={45}
              type="star"
              ratingCount={5}
              onFinishRating={handleRating}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              style={{marginRight: '8%'}}
              onPress={() => {
                setModalVisible2(false);
              }}>
              <Button
                title="평가안하기"
                color={'#FFA856'}
                titleStyle={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}
                onPress={() => {
                  setModalVisible2(false);
                  setSelectedId([]);
                }}
                style={{
                  height: Dimensions.get('window').height / 20,
                  width: Dimensions.get('window').width / 2.8,
                  borderRadius: 200,

                  justifyContent: 'center',
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{marginLeft: '8%'}}
              onPress={() => {
                setModalVisible2(false);
              }}>
              <Button
                title="확인"
                color={'#FFA856'}
                titleStyle={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}
                style={{
                  height: Dimensions.get('window').height / 20,
                  width: Dimensions.get('window').width / 2.8,
                  borderRadius: 200,
                  justifyContent: 'center',
                }}
                onPress={() => {
                  setModalVisible2(false);
                  postReview(userSpotId[2]);
                  setSelectedId([]);
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* 모달 4 */}
      <Modal animationType="slide" transparent={true} visible={modalVisible3}>
        <View
          style={{
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            height: Dimensions.get('window').height / 1.02,
          }}>
          <View>{images3}</View>
          <View style={{marginVertical: '3.5%', marginBottom: '15%'}}>
            {name3}
          </View>
          <View />
          <FlatList
            data={reviews3}
            renderItem={({item}) => <Item item={item} />}
            numColumns={numColumns}
          />
          <View style={{marginBottom: '5%'}}>
            <Rating
              imageSize={45}
              type="star"
              ratingCount={5}
              onFinishRating={handleRating}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              style={{marginRight: '8%'}}
              onPress={() => {
                setModalVisible3(false);
              }}>
              <Button
                title="평가안하기"
                color={'#FFA856'}
                titleStyle={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}
                onPress={() => {
                  setModalVisible3(false);
                  setSelectedId([]);
                }}
                style={{
                  height: Dimensions.get('window').height / 20,
                  width: Dimensions.get('window').width / 2.8,
                  borderRadius: 200,

                  justifyContent: 'center',
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{marginLeft: '8%'}}
              onPress={() => {
                setModalVisible3(false);
              }}>
              <Button
                title="확인"
                color={'#FFA856'}
                titleStyle={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}
                style={{
                  height: Dimensions.get('window').height / 20,
                  width: Dimensions.get('window').width / 2.8,
                  borderRadius: 200,
                  justifyContent: 'center',
                }}
                onPress={() => {
                  setModalVisible3(false);
                  postReview(userSpotId[3]);
                  setSelectedId([]);
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* 모달 5 */}
      <Modal animationType="slide" transparent={true} visible={modalVisible4}>
        <View
          style={{
            backgroundColor: '#fff',
            justifyContent: 'center',
            alignItems: 'center',
            height: Dimensions.get('window').height / 1.02,
          }}>
          <View>{images4}</View>
          <View style={{marginVertical: '3.5%', marginBottom: '10%'}}>
            {name4}
          </View>
          <View />
          <FlatList
            data={reviews4}
            renderItem={({item}) => <Item item={item} />}
            numColumns={numColumns}
          />
          <View style={{marginBottom: '5%'}}>
            <Rating
              imageSize={45}
              type="star"
              ratingCount={5}
              onFinishRating={handleRating}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              style={{marginRight: '8%'}}
              onPress={() => {
                setModalVisible4(false);
              }}>
              <Button
                title="평가안하기"
                color={'#FFA856'}
                titleStyle={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}
                onPress={() => {
                  setModalVisible4(false);
                  setSelectedId([]);
                }}
                style={{
                  height: Dimensions.get('window').height / 20,
                  width: Dimensions.get('window').width / 2.8,
                  borderRadius: 200,

                  justifyContent: 'center',
                }}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{marginLeft: '8%'}}
              onPress={() => {
                setModalVisible4(false);
              }}>
              <Button
                title="확인"
                color={'#FFA856'}
                titleStyle={{
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                }}
                style={{
                  height: Dimensions.get('window').height / 20,
                  width: Dimensions.get('window').width / 2.8,
                  borderRadius: 200,
                  justifyContent: 'center',
                }}
                onPress={() => {
                  setModalVisible4(false);
                  postReview(userSpotId[4]);
                  setSelectedId([]);
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 3.2,
    // marginTop: '3.6%'
  },
});
export default FinalReview;
