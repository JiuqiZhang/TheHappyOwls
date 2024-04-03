import React from "react"
import { View, Text,StyleSheet, TouchableOpacity, SafeAreaView } from "react-native"
import * as Icon from 'react-native-feather'
import { Divider } from "react-native-elements"
import InputBox from "../../Component/InputBox"
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage"

export default InfoScreen = ({ navigation }) => {
    const user = useSelector((state) => state.user);
    return(<View style={styles.container}><TouchableOpacity
        style={styles.back}
        onPress={() => {
            navigation.navigate("Profile");
        }}
    ><Icon.ArrowLeft color={"black"} />
    </TouchableOpacity>
    <Text style={styles.title}>Edit Personal Info</Text>
  <View style={styles.wrapper}>
  <InputBox label="First name" value={user.firstName} />
    <InputBox label="Last name"  value={user.lastName} />
  </View>
  
   <Divider width={1.5}/>
   <View style={styles.wrapper}>
   <Text style={styles.email}>Email</Text>
       <View style={styles.wrapper}>
   <Text>{user.email||"-"}</Text>
   <Text>{JSON.stringify(user)}</Text></View>
{/* 
   <TouchableOpacity onPress={()=>{AsyncStorage.clear();}}>
    <Text>Reset</Text>
   </TouchableOpacity> */}
   </View>

   </View>)
}

const styles= StyleSheet.create({
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginVertical: "4%",
  },
  wrapper:{
    marginVertical:'7%'
  },
  container:{
    flex:1,
    paddingTop:'17%',
    paddingHorizontal:'5%'
},
back: {
    position: "absolute",
    left: "4%",
    top: "6%",
},
email:{
     color:'grey',
      fontSize: 13
}})