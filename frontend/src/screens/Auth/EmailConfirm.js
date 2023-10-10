import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { Divider } from "react-native-elements";
import * as Icon from "react-native-feather";
export default function EmailConfirm({navigation}) {
    const[emailAddress, onChangeEmail] = React.useState('')
  return (
    <SafeAreaView style={styles.container}>
     <TouchableOpacity
        style={styles.back}
        onPress={() => {
            navigation.navigate("Profile");
        }}
    ><Icon.X color={"black"} /></TouchableOpacity>
      <Text style={styles.title}>Login or Sign up</Text>
      {/* <Divider orientation="vertical" width={{2}} style={styles.divider}/> */}
    
      <Divider orientation="vertical" width={9}  style={styles.divider}/>

      <View style={styles.inputContainer}>
            <Icon.Mail color={"grey"} />
            <Divider orientation="vertical" width={1.5} style={{marginHorizontal:6,}} />
            <TextInput
              style={styles.input}
              onChangeText={onChangeEmail}
              placeholder="Email"
              value={emailAddress}
            />
          </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,

    alignItems: "center",
  },
  title:{
    fontSize:18,
    fontWeight:'400'
  },
  back: {
    position: "absolute",
    left: "4%",
    top: "6%",
},

  inputContainer: {
    minHeight: 50,
    height: 50,
    maxWidth: "90%",
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    margin: 10,
  },
  input: {
    minWidth: "90%",
  },
divider: {
    marginVertical: 10,
    borderColor: "black",
  },
});
