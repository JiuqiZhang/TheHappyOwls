import {
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
import Modal from "react-native-modal";
import React from "react";

const { width, height } = Dimensions.get("screen");

const SlideItem = ({ item }) => {
  const [visible, setVisible] = React.useState(false);
  const translateYImage = new Animated.Value(0);

  Animated.timing(translateYImage, {
    toValue: 0,
    duration: 1000,
    useNativeDriver: true,
    easing: Easing.bounce,
  }).start();

  return (
    <View style={styles.container}>
      <View onPress={() => setVisible(true)}>
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
  container: {
    width: width,
    // backgroundColor:'red'
  },
  image: {
    minWidth: "100%",
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
