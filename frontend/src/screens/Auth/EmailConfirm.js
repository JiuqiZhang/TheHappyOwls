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
import axios from "axios";
import validator from "validator";
import { Divider } from "react-native-elements";
import * as Icon from "react-native-feather";
export default function EmailConfirm({navigation}) {
    const[emailAddress, onChangeEmail] = React.useState('')
    const [disable, setDisable] = React.useState(true)
    React.useEffect(()=>{
      if (validator.isEmail(emailAddress)) {
        setDisable(false)
    }
  else{
    setDisable(true)
  }},[emailAddress])
  const Search = async ()=>{
    await axios.post('https://data.tpsi.io/api/v1/users/VerifyUserEmail?email='+emailAddress)
    .then(function (response) {
     if(response.data){
     
        console.log('login')
     }
      else{
        navigation.navigate("Signup", { email: emailAddress })
      }
     }
    )
    .catch(function (error) {
      console.log(error);
    });
    
  }
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
              autoFocus={true}
              placeholder="Email"
              value={emailAddress}
            />
          </View>

          <TouchableOpacity style={!disable?styles.loginBtn:styles.disableBtn} onPress={() => Search()} disabled={disable}>
          <Text style={{ color: "white" }}>Continue</Text>
        </TouchableOpacity>
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
    marginTop:'10%'
  },
  input: {
    minWidth: "90%",
  },
divider: {
    marginVertical: 10,
    borderColor: "black",
  },
  loginBtn: {
    minWidth: "90%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "brown",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  disableBtn:{
    minWidth: "90%",
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    backgroundColor:'grey'
  }
});
