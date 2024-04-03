import React from "react";
import AppleAuth from "../../Component/AppleAuth";
import {
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text
} from "react-native";
import Logo from "../../Component/Logo";

export default function SignupScreen({navigation}) {
    
    
  
  return (
    <ImageBackground
      source={require("../../Image/onBoardBG.png")}
      style={{ width: "100%", height: "100%"}}
    >
    <TouchableOpacity onPress={()=>{navigation.navigate("Home");}}>
      <Text style={styles.skip}>Skip</Text>
    </TouchableOpacity>
<Logo style={styles.logo}/>
      <TouchableOpacity style={{marginTop:254}} >
        <AppleAuth navigation={navigation}/>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  skip:{position:'absolute', top:75,right:20,textDecorationLine:'underline',fontSize:14,fontWeight:'600',color:'#8A6F0F'},
  logo:{marginTop:216,alignSelf:'center'}
});
