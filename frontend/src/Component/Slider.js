import {Animated, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import SlideItem from './SlideItems';
import Pagination from './Pagination';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const Slides = [
    {
      id: 1,
      img: require('../Image/store.jpg'),
      title: 'pic 1',
      description: 'placeholder',
      price: null,
    }    
  ];


const Slider = (props) => {
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
    setIndex(viewableItems[0].index);
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View style={{ flex: 1 }}>

  <FlatList
    data={!props.img?Slides:props.img.photos}
    renderItem={({item}) => <SlideItem item={!props.img?item:{img:{uri:'http://spring-boot-repo-tpsi.s3.amazonaws.com/'+props.img._id+'_'+item.id}}} />}
    horizontal
    pagingEnabled
    // disableIntervalMomentum={true}
    snapToAlignment="center"
    showsHorizontalScrollIndicator={false}
    onScroll={handleOnScroll}
    onViewableItemsChanged={handleOnViewableItemsChanged}
    viewabilityConfig={viewabilityConfig}
  />
  <Pagination data={!props.img?Slides:props.img.photos} scrollX={scrollX} index={index} />
   </View>
  );
};

export default Slider;

const styles = StyleSheet.create({
    container: {
        width:'100%',
        flexGrow:1,
      },
});