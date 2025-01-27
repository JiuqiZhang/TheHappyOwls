import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Button,
  Alert,
} from "react-native";
import * as Icon from "react-native-feather";
import { Divider } from "react-native-elements";
import InputBox from "../../Component/InputBox";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setEmail, setNameFirst, setNameLast } from "../../redux/actions";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default InfoScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.back}
        onPress={() => {
          navigation.navigate("Profile");
        }}
      >
        <Icon.ArrowLeft color={"black"} />
      </TouchableOpacity>
      <Text style={styles.title}>Account Setting</Text>
      <View style={styles.wrapper}>
        <InputBox label="First name" value={user.firstName} />
        <InputBox label="Last name" value={user.lastName} />
      </View>

      <Divider width={1.5} />
      <View style={styles.wrapper}>
        <Text style={styles.email}>Email</Text>
        <View style={styles.wrapper}>
          <Text>{user.email || "-"}</Text>
        </View>
        {/* 
   <TouchableOpacity onPress={()=>{AsyncStorage.clear();}}>
    <Text>Reset</Text>
   </TouchableOpacity> */}

        <Button
          title="Delete account"
          color="red"
          onPress={() =>
            Alert.alert(
              "Delete account",
              "Are you sure you want to deklete your account on TPSI? This will permanently erase your account. ",
              [
                {
                  text: "Cancel",
                  onPress: () => {},
                },
                {
                  text: "Delete",
                  style: "destructive",
                  onPress: () => {
                    axios
                      .post(
                        "https://data.tpsi.io/api/v1/users/DeleteUser?username=" +
                          user.email
                      )
                      .then(function (response) {
                        // console.log(response);
                        dispatch(setEmail(null));
                        dispatch(setNameFirst(null));
                        dispatch(setNameLast(null));
                        navigation.goBack()
                      })
                      .catch(function (error) {
                        console.log(error);
                        Alert.alert("Internet error", "Try again.");
                      });
                  },
                },
              ]
            )
          }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: "4%",
  },
  wrapper: {
    marginVertical: "7%",
  },
  container: {
    flex: 1,
    paddingTop: "17%",
    paddingHorizontal: "5%",
  },
  back: {
    position: "absolute",
    left: "4%",
    top: "6%",
  },
  email: {
    color: "grey",
    fontSize: 13,
  },
});
