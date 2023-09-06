import {Animated, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import SlideItem from './SlideItems';
import Pagination from './Pagination';
const Slides = [
    {
      id: 1,
      img: require('../Image/store.jpg'),
      title: 'pic 1',
      description: 'placeholder',
      price: null,
    },
    {
        id: 2,
        img: require('../Image/store.jpg'),
        title: 'pic 2',
        description: 'placeholder',
        price: null,
      },
      {
        id: 3,
        img: require('../Image/store.jpg'),
        title: 'pic 3',
        description: 'placeholder',
        price: null,
      },
      {
          id: 4,
          img: require('../Image/store.jpg'),
          title: 'pic 4',
          description: 'placeholder',
          price: null,
        },
    
  ];


const Slider = () => {
  const [index, setIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleOnScroll = event => {
    Animated.event(
      [
        {
          nativeEvent: {
            contentOffset: {
              x: scrollX,
            },
          },
        },
      ],
      {
        useNativeDriver: false,
      },
    )(event);
  };

  const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
    // console.log('viewableItems', viewableItems);
    setIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View style={styles.container}>
      <FlatList
        data={Slides}
        renderItem={({item}) => <SlideItem item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Pagination data={Slides} scrollX={scrollX} index={index} />
    </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
    container: {
        width:'100%',
        height:'38%',
        alignItems: 'center',
      },
});