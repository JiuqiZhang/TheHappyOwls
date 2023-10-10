import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { setEmail, setName } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import validator from "validator";
import emailjs from "@emailjs/browser";
import * as Icon from "react-native-feather";
import { Divider } from "react-native-elements";
import axios from "axios";
import { api } from "../../api/baseurl";
export default Login = ({ navigation }) => {
  const [emailAddress, onChangeEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const { email, name } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setEmailError("");
      console.log("ends");
    }, 2000);
    return () => clearTimeout(timer);
  }, [emailError]);

  const login = () => {

    if (validateEmail()) {
      axios.post(api+'users/AuthenticateUser',{
        username: emailAddress.toLowerCase(),
        password: password,
      },{ headers: {
        "Content-Type": "application/json",
      },})
        .then(function (response) {
          dispatch(setEmail(emailAddress));
          // emailjs
          //   .send(
          //     "happyhour",
          //     "template_prk74qi",
          //     {
          //       to_email: emailAddress,
          //       email: emailAddress,
          //       from_name: "The Happy Owls",
          //     },
          //     "rfsak_qMYsWxckmdR"
          //   )
          //   .then(
          //     function (response) {
          //       console.log("SUCCESS!", response.status, response.text);
          //     },
          //     function (error) {
          //       console.log("FAILED...", error);
          //     }
          //   );
        })
        .catch(function (error) {
          console.log(error);
        });
      console.log(emailAddress, password);
    }
  };

  const validateEmail = () => {
    if (!validator.isEmail(emailAddress)) {
      setEmailError("Email invalid!");
      console.log("invalid");
      return false;
    }
    return true;
  };

  return (
    <View style={styles.container}>
    <TouchableOpacity
        style={styles.back}
        onPress={() => {
            navigation.navigate("Profile");
        }}
    ><Icon.X color={"black"} /></TouchableOpacity>
      <SafeAreaView>
        <Image
          style={styles.image}
          source={require("../../../assets/icon.png")}
        />
        <View style={styles.inputView}>
          <View style={styles.inputContainer}>
            <Icon.Mail color={"grey"} />
            <Divider orientation="vertical" style={styles.divider} />
            <TextInput
              style={styles.input}
              onChangeText={onChangeEmail}
              placeholder="Email"
              value={emailAddress}
            />
          </View>
          <Text style={styles.error}>{emailError}</Text>
          <View style={styles.inputContainer}>
            <Icon.Lock color={"grey"} />
            <Divider orientation="vertical" style={styles.divider} />
            <TextInput
              style={styles.input}
              onChangeText={onChangePassword}
              secureTextEntry={true}
              value={password}
              placeholder="Password"
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              console.log("forget password");
            }}
          >
            <Text style={styles.loginText}>Forget Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Signup");
            }}
          >
            <Text style={styles.loginText}>Don't have an account? Sign up</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={() => login()}>
          <Text style={{ color: "white" }}>LOGIN</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "white",
    alignItems: "center",
  },
  back: {
    position: "absolute",
    left: "4%",
    top: "6%",
},
  inputView: {
    alignItems: "center",
    paddingTop: "30%",
    alignSelf: "center",
  },
  error: {
    color: "red",
  },
  input: {
    height: 50,
    minWidth: "80%",
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    borderRadius: 10,
    shadowColor: "white",
    backgroundColor: "white",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 5,
  },
  inputContainer: {
    minHeight: 50,
    height: 50,
    maxWidth: "80%",
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    margin: 10,
  },
  divider: {
    marginHorizontal: 6,
    borderColor: "grey",
  },
  input: {
    minWidth: "80%",
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignSelf: "center",
    marginTop: "10%",
  },
  loginText: {
    color: "#303030",
  },
  loginBtn: {
    minWidth: "80%",
    borderRadius: 25,
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
});
