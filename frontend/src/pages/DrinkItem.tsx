import * as React from 'react';
import {View, Text, Image, Pressable} from 'react-native';
import {Button} from '@react-native-material/core';

interface Item {
  image: string;
  name: string;
}
type Props = {
  item: Item;
};
function DrinkItem({item}: Props) {
  return (
    <View>
      <Text>{item.name}</Text>
      <Text>{item.image}</Text>
      <Pressable>
        <View style={{flex: 8, justifyContent: 'space-between'}}>
          <Text style={{fontSize: 24, fontWeight: 'bold', marginTop: 8}}>
            {item.name}
          </Text>
          <View
            style={{
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: 8,
              marginRight: 8,
              flexDirection: 'row',
            }}
          />
        </View>
      </Pressable>
    </View>
  );
}

export default DrinkItem;
