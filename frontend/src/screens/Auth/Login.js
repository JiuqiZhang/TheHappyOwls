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
import { setEmail,setName } from "../../redux/actions";
import { useSelector, useDispatch } from 'react-redux';
import validator from 'validator'
import emailjs from '@emailjs/browser';

export default Login = ({}) => {
  const [emailAddress, onChangeEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [password, onChangePassword] = React.useState("");
  const {email, name} = useSelector(state => state.userReducer);
  const dispatch = useDispatch();


  useEffect(() => {
    const timer = setTimeout(() => {
        setEmailError('');
        console.log("ends");
      }, 2000);
      return () => clearTimeout(timer);
    }, [emailError]);


  const login = () => {

   if(validateEmail()){
      
    dispatch(setEmail(emailAddress))
    emailjs.send('happyhour', 'template_prk74qi', {
        to_email: emailAddress,
        email:emailAddress,
        from_name: 'The Happy Owls',
      }, 'rfsak_qMYsWxckmdR').then(
        function (response) {
          console.log('SUCCESS!', response.status, response.text);
        },
        function (error) {
          console.log('FAILED...', error);
        }
      );
    console.log(emailAddress, password)
   } 
  }

  const validateEmail = () => {
   
    if (!validator.isEmail(emailAddress)) {
      setEmailError('Email invalid!')
      console.log('invalid')
      return false
    }
    return true
  }

  return (
    <View style={styles.container}>
      {/* <TextInputWithLable
                label="Email"
                placheHolder="enter your email"
                onChangeText={(email) => updateState({ email })}
            />
            <TextInputWithLable
                label="Password"
                placheHolder="enter your password"
                // isSecure={isSecure}
                secureTextEntry={isSecure}
                onChangeText={(password) => updateState({ password })}
            />

            <ButtonWithLoader
                text="Login"
                onPress={onLogin}
                isLoading={isLoading}
            />

            <View style={{marginVertical: 8}} />

            <ButtonWithLoader
                text="Signup"
                onPress={() => navigation.navigate('Signup')}
            /> */}
      <SafeAreaView>
        <Image
          style={styles.image}
          source={require("../../../assets/icon.png")}
        />
        <View style={styles.inputView}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            placeholder="Email"
            value = {emailAddress}

          />
            <Text style={styles.error}>{emailError}</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            secureTextEntry={true}
            value={password}
            placeholder="Password"
          />
          <TouchableOpacity onPress={()=>{console.log('forget password')}}>
            <Text style={styles.loginText}>Forget Password?</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={()=>login()}>
        <Text style={styles.loginText}>LOGIN</Text> 
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
  inputView: {
    alignItems: "center",
    paddingTop: "30%",
    alignSelf: "center",
  },
  error:{
    color:'red'
  },
  input: {
    maxHeight: 40,
    minWidth: "80%",
    margin: 12,
    borderWidth: 1,
    borderColor:'white',
    padding: 10,
    borderRadius: 10,
    backgroundColor:'#ededed',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
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
    backgroundColor: "#FF1493",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
  },
});
