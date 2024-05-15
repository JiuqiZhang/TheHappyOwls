import React, { useState, useRef, createRef } from 'react';
import { View, Text, Image, Animated, Dimensions,StyleSheet } from 'react-native';
import { PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get("screen");

const SlideItem = ({ item }) => {
  const [visible, setVisible] = React.useState(false);


  const [panEnabled, setPanEnabled] = useState(false);



  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const pinchRef = createRef();
  const panRef = createRef();

  const onPinchEvent = Animated.event([{
    nativeEvent: { scale }
  }],
    { useNativeDriver: true });

  const onPanEvent = Animated.event([{
    nativeEvent: {
      translationX: translateX,
      translationY: translateY
    }
  }],
    { useNativeDriver: true });

  const handlePinchStateChange = ({ nativeEvent }) => {
    // enabled pan only after pinch-zoom
    if (nativeEvent.state === State.ACTIVE) {
      setPanEnabled(true);
    }

    // when scale < 1, reset scale back to original (1)
    const nScale = nativeEvent.scale;
    if (nativeEvent.state === State.END) {
      if (nScale < 1) {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true
        }).start();
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true
        }).start();
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true
        }).start();

        setPanEnabled(false);
      }
    }
  };


  return (
    <View >
    
     <PanGestureHandler
        onGestureEvent={onPanEvent}
        ref={panRef}
        simultaneousHandlers={[pinchRef]}
        enabled={panEnabled}
        failOffsetX={[-1000, 1000]}
        shouldCancelWhenOutside
      >
        <Animated.View onPress={() => setVisible(true)}>
        <PinchGestureHandler
            ref={pinchRef}
            onGestureEvent={onPinchEvent}
            simultaneousHandlers={[panRef]}
            onHandlerStateChange={handlePinchStateChange}
          >
        <Animated.Image
          source={item.img}
          resizeMode="contain"
          style={[
            styles.image,
            {
              
              transform: [{ scale }, { translateX }, { translateY }]
            },
          ]}
        />
        </PinchGestureHandler>
     </Animated.View>
     </PanGestureHandler>
      {/* <Modal
        testID={"modal"}
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
      >
        <TouchableOpacity onPress={() => setVisible(false)}>
          <Image
            source={item.img}
            resizeMode="contain"
            style={styles.imageModal}
          />
        </TouchableOpacity>
      </Modal> */}
    </View>
  );
};

export default SlideItem;

const styles = StyleSheet.create({

  image: {
    minWidth: width,
    height: 328,

    width: "100%",

    resizeMode: "cover",
  },
  imageModal: {
    width: width,
    height: height * 0.7,
    alignSelf: "center",
  },
});
