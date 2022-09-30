import * as React from 'react';
import {View, Animated, StyleSheet, Text} from 'react-native';
import {useEffect, useRef} from 'react';
import {Rating, AirbnbRating} from 'react-native-ratings';

interface IStep {
  totalStep: number;
  nowStep: number;
}
function PriceBar({totalStep, nowStep}: IStep) {
  const loaderValue = useRef(new Animated.Value(0)).current;

  const load = (count: number) => {
    Animated.timing(loaderValue, {
      toValue: (count / totalStep) * 100,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const width = loaderValue.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    load(nowStep);
  }, [nowStep]);

  // const WATER_IMAGE = require('../../src/assets/별0개.png');
  // ratingCompleted(rating) {
  //   console.log("Rating is: " + rating)
  // }

  return (
    <View>
      <View>
        <AirbnbRating
          count={6}
          reviews={[
            '0 - 1만원',
            '1만원 - 2만원',
            '2만원 - 3만원',
            '3만원 - 4만원',
            '4만원 - 5만원',
            '상관없음',
          ]}
          defaultRating={3}
          size={40}
        />
      </View>
      <View>
        <Animated.View
          style={{
            backgroundColor: 'red',
            width,
            height: 3,
            borderTopRightRadius: 2,
            borderBottomRightRadius: 2,
          }}
        />
      </View>
      <Text style={styles.step}>
        {nowStep}/{totalStep}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    width: '100%',
    height: 1,
    backgroundColor: 'blue',
  },
  step: {
    color: 'red',
    padding: 22,
    lineHeight: 22 * 1.3,
    textAlign: 'center',
  },
});
export default PriceBar;
