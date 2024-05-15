import {
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  Image,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
const { width, height } = Dimensions.get("screen");
import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";

export default CouponList = ({ navigation }) => {
  const [modal, setModal] = useState(false);
  const [full, setFull] = useState(null);
  const list = [
    require("../../Image/Coupon/ooisushi.png"),
    require("../../Image/Coupon/sidehustle.png"),

    require("../../Image/Coupon/gamehaus.png"),
    require("../../Image/Coupon/Softbite.png"),
    require("../../Image/Coupon/murray'scheesebar.png"),
  ];
  return (
    <SafeAreaView style={styles.container}>
      <Modal
        animationType="fade"
        visible={modal}
      >
        <TouchableOpacity
          style={{ flex: 1,alignItems:'center',justifyContent:"center" }}
          onPress={() => {
            setModal(false);
          }}
        >
          <Image style={{width:height-100,height:width,resizeMode:'contain',alignSelf:'center',justifyContent:'center',transform: [{rotate: '90deg'}]}} source={full} />
        </TouchableOpacity>
      </Modal>
      <Text style={styles.title}>Offers{"\n"}</Text>
      <FlatList
      style={{flex:1}}
        data={list}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item}
            style={{flex:1}}
            onPress={() => {
              //   navigation.navigate("Detail", { store: item });
              setModal(true);
              setFull(item);
            }}
          >
            <Image style={styles.image} source={item} />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },

  image: {
    height: 200,
    width: width-2,
resizeMode:'contain',
    borderRadius: 10,
marginVertical:2

  },

  title: {
    fontSize: 20,
    fontWeight: "600",
  },
  
});
