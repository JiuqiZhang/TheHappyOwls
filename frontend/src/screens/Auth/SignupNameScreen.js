import React from "react";
import { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert,
  TextInput,
  Text,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { setEmail, setNameFirst, setNameLast } from "../../redux/actions";
export default function SignupNameScreen({ route, navigation }) {
  const { email } = route.params;
  const dispatch = useDispatch();
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const register = () => {
    if (first.length < 2 || last.length < 2) {
      Alert.alert("Names must be minimum 2 characters");
      return;
    }
    fetch(
      'https://data.tpsi.io/api/v1/users/registerUser?email='+email+'&lastname='+last+'&firstname='+first,
      { method: "post" }
    )
      .then((res) => {if(res){
        dispatch(setEmail(email));
        dispatch(setNameFirst(first));
        dispatch(setNameLast(last));
        navigation.navigate("Home")
      }})
      .catch((error) => console.log("error", error));
  };

  return (
    <ImageBackground
      source={require("../../Image/onBoardBG.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <Text style={styles.title}>Let’s quickly set up your profile:</Text>
        <TextInput
          placeholder="First Name"
          style={styles.input}
          onChangeText={setFirst}
        />
        <TextInput
          placeholder="Last Name"
          style={styles.input}
          onChangeText={setLast}
        />
        <TouchableOpacity
          onPress={() => {
            register();
          }}
          style={{
            backgroundColor: "#F9EEC8",
            marginTop: 200,
            height: 48,
            width: 169,
            borderRadius: 100,
            borderWidth: 2,
            borderColor: "#B89414",
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "center",
          }}
        >
          <Text style={{ fontWeight: "600" }}>Start exploring</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "600",
    color: "#2E2505",
    marginTop: 116,
    fontSize: 12,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#FCF8E8",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "#FFFFFF",
    height: 48,
    width: "100%",
    marginVertical: 8,
    paddingLeft: 20,
  },
});
