import * as React from 'react';
import {View, Text, Button, FlatList, ScrollView} from 'react-native';
import {useState} from 'react';

const DATA: any = [
  {title: 1, name: '한'},
  {title: 2, name: '중'},
  {title: 3, name: '일'},
  {title: 4, name: '회'},
  {title: 5, name: '고기'},
  {title: 6, name: '굿'},
];

const Item = ({title, name}) => (
  <View
    style={{
      backgroundColor: '#f9c2ff',
      padding: 20,
      width: '20%',
    }}>
    <Text
      style={{
        color: 'black',
        fontSize: 14,
        width: '50%',
        backgroundColor: 'red',
      }}>
      {title}
    </Text>
    <Text style={{color: 'black', fontSize: 12}}>{name}</Text>
  </View>
);

function Preference({navigation}) {
  const numColumns = 5;

  return (
    <ScrollView>
      <View style={{backgroundColor: 'orange', flexDirection: 'row'}}>
        <Button
          title="뒤로가기"
          onPress={() => {
            navigation.navigate('Home', {});
          }}
        />
        <Text> 코스 설정</Text>
      </View>
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 25}}>음식</Text>
        </View>
      </View>

      <View>
        <FlatList
          data={DATA}
          columnWrapperStyle={{
            marginBottom: 10,
          }}
          renderItem={({item}) => <Item title={item.title} name={item.name} />}
          keyExtractor={(item, index) => item}
          numColumns={numColumns}
        />
      </View>
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 25}}>음식</Text>
        </View>
      </View>

      <View>
        <FlatList
          data={DATA}
          columnWrapperStyle={{
            marginBottom: 10,
          }}
          renderItem={({item}) => <Item title={item.title} name={item.name} />}
          keyExtractor={(item, index) => item}
          numColumns={numColumns}
        />
      </View>
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 25}}>음식</Text>
        </View>
      </View>

      <View>
        <FlatList
          data={DATA}
          columnWrapperStyle={{
            marginBottom: 10,
          }}
          renderItem={({item}) => <Item title={item.title} name={item.name} />}
          keyExtractor={(item, index) => item}
          numColumns={numColumns}
        />
      </View>
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 25}}>음식</Text>
        </View>
      </View>

      <View>
        <FlatList
          data={DATA}
          columnWrapperStyle={{
            marginBottom: 10,
          }}
          renderItem={({item}) => <Item title={item.title} name={item.name} />}
          keyExtractor={(item, index) => item}
          numColumns={numColumns}
        />
      </View>
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 25}}>음식</Text>
        </View>
      </View>

      <View>
        <FlatList
          data={DATA}
          columnWrapperStyle={{
            marginBottom: 10,
          }}
          renderItem={({item}) => <Item title={item.title} name={item.name} />}
          keyExtractor={(item, index) => item}
          numColumns={numColumns}
        />
      </View>
      <View>
        <View style={{flexDirection: 'row'}}>
          <Text style={{fontSize: 25}}>음식</Text>
        </View>
      </View>

      <View>
        <FlatList
          data={DATA}
          columnWrapperStyle={{
            marginBottom: 10,
          }}
          renderItem={({item}) => <Item title={item.title} name={item.name} />}
          keyExtractor={(item, index) => item}
          numColumns={numColumns}
        />
      </View>
      <Button
        title="코스 설정완료"
        onPress={() => {
          navigation.navigate('Course', {});
        }}
      />
    </ScrollView>
  );
}

export default Preference;
