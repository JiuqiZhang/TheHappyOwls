import {
    Image,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Animated,
    Easing,
  } from 'react-native';
  import React from 'react';
  
  const {width, height} = Dimensions.get('screen');
  
  const SlideItem = ({item}) => {
    const translateYImage = new Animated.Value(0);
  
    Animated.timing(translateYImage, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
  
    return (
      <View style={styles.container}>
        <Animated.Image
          source={item.img}
          resizeMode="contain"
          style={[
            styles.image,
            {
              transform: [
                {
                  translateY: translateYImage,
                },
              ],
            },
          ]}
        />
  
       
      </View>
    );
  };
  
  export default SlideItem;
  
  const styles = StyleSheet.create({
    container: {
      width:width,
      height:height,
      alignItems: 'center',
// backgroundColor:'red'
    },
    image: {
      flex: 0.41,
      width: '100%',
    },
    content: {
      flex: 0.4,
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
    },
    description: {
      fontSize: 18,
      marginVertical: 12,
      color: '#333',
    },
    price: {
      fontSize: 32,
      fontWeight: 'bold',
    },
  });