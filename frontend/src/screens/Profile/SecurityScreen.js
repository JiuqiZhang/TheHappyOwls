import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Icon from "react-native-feather";
import { Divider } from "react-native-elements";
export default SecurityScreen = ({ navigation }) => {
  const [time, setTime] = React.useState("time");
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.back}
        onPress={() => {
          navigation.navigate("Profile");
        }}
      >
        <Icon.X color={"black"} />
      </TouchableOpacity>
      <Text style={styles.title}>Security</Text>
      <View style={styles.wrapper}>
        <Text>Password</Text>
        <Text style={styles.sub}>Last updated [{time}] ago.</Text>
      </View>
      <Divider width={1.5} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: "4%",
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
  wrapper: {
    marginTop: "7%",
  },
  sub: {
    color: "grey",
    fontSize: 13,
    marginVertical: "4%",
  },
});
