import {StyleSheet, Animated, View, Dimensions} from 'react-native';
import React from 'react';

const {width} = Dimensions.get('screen');

const Pagination = ({data, scrollX, index}) => {
  return (
    <View style={styles.container}>
      {data.map((_, idx) => {
        const inputRange = [(idx - 1) * width, idx * width, (idx + 1) * width];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [6, 6, 6],
          extrapolate: 'clamp',
        });

        const backgroundColor = scrollX.interpolate({
          inputRange,
          outputRange: ['#FFFFFF', '#C48A01', '#FFFFFF'],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            key={idx.toString()}
            style={[
              styles.dot,
              {width: dotWidth, backgroundColor},
              // idx === index && styles.dotActive,
            ]}
          />
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    top:'95%',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 100,
    marginHorizontal: 3,
    backgroundColor: '#ccc',
  },
  dotActive: {
    backgroundColor: '#000',
  },
});