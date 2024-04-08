import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Icon from "react-native-feather";
import { Divider } from "react-native-elements";
import { setEmail,setNameFirst,setNameLast } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

// import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useForm, Controller} from "react-hook-form";

export default Signup = ({ navigation,route }) => {
  const email = route.params.email;
  const [pswdError, setPswdError] = React.useState("");
  // const { email, name } = useSelector((state) => state.userReducer);
  const [format, setFormat] = React.useState(true);
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      password: "",
      repassword: "",
      dob:""
    },
  });


  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {

      setPswdError("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [ pswdError]);

  const onSubmit = (data) => {
    console.log(data)
    var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "username": email, //email
  "lastname": data.lastName,
  "firstname": data.firstName,
  "birthday": data.dob,
  "address": "placeholder",
  "password": data.password,
  "phone": "XXXXXXXXX"
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://ec2-34-203-231-63.compute-1.amazonaws.com:8080/api/v1/users/AddUser", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
    if (data.password === data.repassword) {
        dispatch(setEmail(email));
        console.log(data.lastName)
        dispatch(setNameLast(data.lastname));
        console.log(data.firstName)
        dispatch(setNameFirst(data.firstname));
        // emailjs
        //   .send(
        //     "happyhour",
        //     "template_prk74qi",
        //     {
        //       to_email: data.email,
        //       email: data.email,
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
        // console.log(data.email, data.password);
        navigation.navigate("Profile")
      
    }else{
        setPswdError('Passwords not match.')
    }

  };

 

  return (
    <SafeAreaView style={styles.container}>
    <TouchableOpacity
       style={styles.back}
       onPress={() => {
           navigation.navigate("Profile");
       }}
   ><Icon.X color={"black"} /></TouchableOpacity>
     <Text style={styles.title}>Sign up</Text>   
     <Divider orientation="vertical" width={9}  style={styles.maindivider}/>
        <View style={styles.inputView}>
          <View style={styles.inputContainer}>
            <Icon.User color={"grey"} />
            <Divider orientation="vertical" style={styles.divider} />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="First Name"
                  onBlur={onBlur}
                  style={styles.input}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="firstName"
            />
          </View>
          {errors.firstName && (
            <Text style={styles.error}>First name is required.</Text>
          )}
          <View style={styles.inputContainer}>
            <Icon.User color={"grey"} />
            <Divider orientation="vertical" style={styles.divider} />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Last Name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="lastName"
            />
          </View>
          {errors.lastName && (
            <Text style={styles.error}>Last name is required.</Text>
          )}
          <View style={styles.inputContainer}>
            <Icon.Lock color={"grey"} />
            <Divider orientation="vertical" style={styles.divider} />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Password"
                  onBlur={onBlur}
                  style={styles.input}
                  onChangeText={onChange}
                  secureTextEntry={true}
                  value={value}
                />
              )}
              name="password"
            />
          </View>
          {errors.password && (
            <Text style={styles.error}>Password is required.</Text>
          )}
          <View style={styles.inputContainer}>
            <Icon.Lock color={"grey"} />
            <Divider orientation="vertical" style={styles.divider} />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Re-enter Password"
                  onBlur={onBlur}
                  style={styles.input}
                  onChangeText={onChange}
                  secureTextEntry={true}
                  value={value}
                />
              )}
              name="repassword"
            />
          </View>
          {errors.repassword && (
            <Text style={styles.error}>Please re-enter your password.</Text>
          )}
          {pswdError !== "" ? (
            <Text style={styles.error}>{pswdError}</Text>
          ) : null}
        </View>
        <View style={styles.inputContainer}>
            <Icon.Calendar color={"grey"} />
            <Divider orientation="vertical" style={styles.divider} />
            <Controller
              control={control}
              rules={{
                required: true,
                minLength:8,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Date of Birth (mmddyyyy)"
                  onChangeText={onChange}
                  value={value}
                  onBlur={onBlur}
                  style={styles.input}
                  maxLength={8}
                  keyboardType="numeric"
                />
              )}
              name="dob"
            />
          </View>
          {errors.dob && (
            <Text style={styles.error}>Please enter your Date of Birth as mmddyyyy.</Text>
          )}
        {/* <Button title="Submit" onPress={handleSubmit(onSubmit)} /> */}
        <TouchableOpacity
          style={styles.loginBtn}
          title="Submit"
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={{ color: "white" }}>Sign up</Text>
        </TouchableOpacity>
      </SafeAreaView>

  );
};

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
maindivider: {
    marginVertical: 10,
    borderColor: "black",
  },
  inputView: {
    alignItems: "center",
    paddingTop: "30%",
    alignSelf: "center",
  },
  error: {
    color: "red",
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
  divider: {
    marginHorizontal: 6,
    borderColor: "grey",
  },
  input: {
    minWidth: "90%",
  },

  loginText: {
    color: "#303030",
  },
  loginBtn: {
    minWidth: "80%",
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
});
