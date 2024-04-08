import React from "react";
import {
  StatusBar,
  ImageBackground,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

export default OnBoardScreen = ({navigation}) => {
  return (
    <ImageBackground
      source={require("../../Image/poster.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <TouchableOpacity style={styles.btn}   onPress={() => {
                    navigation.navigate("Signup");
                  }}>
        <Text style={styles.btnTxt}>Log in/Sign Up</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    bottom: 56,
    alignSelf: "center",
    height: 48,
    width: 169,
    backgroundColor: "#F9EEC8",
    justifyContent: "center",
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: "#B89414",
  },
  btnTxt:{ alignSelf: "center" ,fontSize:14,fontWeight:600}
});
