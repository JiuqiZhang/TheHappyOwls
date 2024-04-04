import * as AppleAuthentication from "expo-apple-authentication";
import { View, StyleSheet, Text } from "react-native";
import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setEmail, setNameFirst, setNameLast } from "../redux/actions";
import "core-js/stable/atob";
export default function AppleAuth({ navigation }) {
  const [user, setUser] = useState();
  const dispatch = useDispatch()
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

              if (credential.identityToken) {
                axios
                  .post(
                    "https://data.tpsi.io/api/v1/users/checkEmail?email=" +
                      jwtDecode(credential.identityToken).email
                  )
                  .then((response) => response.data)
                  .then((res) => {
                    if (res.firstname) {
                      dispatch(setEmail(jwtDecode(credential.identityToken).email));
                      dispatch(setNameFirst(res.firstname));
                      dispatch(setNameLast(res.lastname));
                      navigation.navigate("Home");
                    } else {
                      navigation.navigate("SignupName", {
                        email: jwtDecode(credential.identityToken).email,
                      });
                    }
                  })
                  .catch((error) => console.log("error", error));
              }
              // signed in
            } catch (e) {
              if (e.code === "ERR_REQUEST_CANCELED") {
                // handle that the user canceled the sign-in flow
              } else {
                // handle other errors
                console.log(e);
              }
            }
          }}
        />
      ) : (
        <Text>{"Welcome, TPSI Fam!"}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignSelf: "center",
  },
  button: {
    width: 353,
    marginHorizontal: 20,
    height: 48,
    alignSelf: "center",
  },
});
