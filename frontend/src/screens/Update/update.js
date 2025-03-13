import React from "react";
import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setUpdate } from "../../redux/actions";
export default function UpdateScreen({ navigation }) {
    const dispatch = useDispatch();
  return (
    <ImageBackground
      source={require("../../Image/onBoardBG.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <Text style={{top:100,marginLeft:30,marginRight:39,lineHeight:23}}>
        <Text style={styles.header}>Exciting Updates Here! 🎉{'\n\n'}</Text>
        <Text style={styles.text}>
          We’ve been working hard to make your Happy Hour experience even
          better, and we’re thrilled to announce these amazing new features:{'\n\n'}
        </Text>
        <Text style={styles.subheader}>⭐ Rate and Review Places{'\n'}</Text>
        <Text style={styles.text}>
        Now you can share your experiences and read what others think about the
        Happy Hours you visit. Whether it’s the perfect cocktail, great service,
        or the best vibes, let your voice be heard! {'\n\n'}
        </Text>
        <Text style={styles.subheader}>⏰ Filter Happy Hours by
        Specific Times{'\n'}</Text>
        <Text style={styles.text}>
        Looking for a Happy Hour at 8 PM on a Tuesday? We’ve got
        you covered! Our new time filter makes it easier than ever to find deals
        when you need them.{'\n\n'}
        </Text>
        <Text style={styles.subheader}>🔔 Push Notifications {'\n'}</Text>
        <Text style={styles.text}>
        Never miss a great deal again! Get real-time updates on the best Happy Hours, exclusive discounts, and
        new places added to the app.{'\n\n'}
        </Text>
     
      </Text>
      <TouchableOpacity style={styles.button}   onPress={() => {
        dispatch(setUpdate(false))
          navigation.navigate("Home");
        }}>
        <Text style={styles.buttonText}>Start exploring</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  skip: {
    position: "absolute",
    top: 75,
    right: 20,
    textDecorationLine: "underline",
    fontSize: 14,
    fontWeight: "600",
    color: "#8A6F0F",
  },
  logo: { marginTop: 216, alignSelf: "center" },
  header: { fontSize: 24, fontWeight: "600" },
  text: {
    fontSize: 12,
  },
  subheader: { fontSize: 16, fontWeight: "600" },
  button:{bottom:60,position:'absolute',borderRadius:100,borderWidth:1.5,borderColor:'#B89414',height:48,width:169,justifyContent:'center',alignItems:'center',backgroundColor:'#F9EEC8',alignSelf:'center'},
  buttonText: { fontSize: 14, fontWeight: "600" },
});
