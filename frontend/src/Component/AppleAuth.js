import * as AppleAuthentication from "expo-apple-authentication";
import { View, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
export default function AppleAuth({navigation}) {
  const [user, setUser] = useState();
  return (
    <View style={styles.container}>
      {!user ? (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={
            AppleAuthentication.AppleAuthenticationButtonType.CONTINUE
          }
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={5}
          style={styles.button}
          onPress={async () => {
            try {
              const credential = await AppleAuthentication.signInAsync({
                requestedScopes: [
                  AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                  AppleAuthentication.AppleAuthenticationScope.EMAIL,
                ],
              });

              setUser(credential);
  
              if (credential.identityToken){
  const profile = fetch("https://data.tpsi.io/api/v1/users/checkEmail?email="+jwtDecode(credential.identityToken).email, {method:'post'})
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
  if (typeof(profile)===Object){
    console.log('exisited')
  }else{
      navigation.navigate("SignupName",{email:jwtDecode(credential.identityToken).email});

  }
               
              }
              // signed in
            } catch (e) {
              if (e.code === "ERR_REQUEST_CANCELED") {
                // handle that the user canceled the sign-in flow
              } else {
                // handle other errors
                console.log(e)
              }
            }
          }}
        />
      ) : (
        <Text>{jwtDecode(user.identityToken).email}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {


    width:'100%',
    alignSelf:'center'

  },
  button: {
    width:353,
    marginHorizontal: 20,
    height: 48,
    alignSelf:'center'
  },
});
