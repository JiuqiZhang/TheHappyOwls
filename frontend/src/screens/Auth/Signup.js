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
import { setEmail,setName } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import validator from "validator";
import emailjs from "@emailjs/browser";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useForm, Controller} from "react-hook-form";

export default Signup = ({ navigation }) => {

  const [emailError, setEmailError] = React.useState("");
  const [pswdError, setPswdError] = React.useState("");
  const { email, name } = useSelector((state) => state.userReducer);
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
      email: "",
      password: "",
      repassword: "",
    },
  });

  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    console.log(currentDate);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setEmailError("");
      setPswdError("");
    }, 3000);
    return () => clearTimeout(timer);
  }, [emailError, pswdError]);

  const signup = ()=>{
    handleSubmit(onsubmit)
    console.log('submit')
  }
  const onSubmit = (data) => {
    console.log(data)
    if (validateEmail(data.email) && data.password === data.repassword) {
        dispatch(setEmail(data.email));
        emailjs
          .send(
            "happyhour",
            "template_prk74qi",
            {
              to_email: data.email,
              email: data.email,
              from_name: "The Happy Owls",
            },
            "rfsak_qMYsWxckmdR"
          )
          .then(
            function (response) {
              console.log("SUCCESS!", response.status, response.text);
            },
            function (error) {
              console.log("FAILED...", error);
            }
          );
        console.log(data.email, data.password);
      
    }else{
        setPswdError('Passwords not match.')
    }

  };

  const validateEmail = (emailAddress) => {
    if (!validator.isEmail(emailAddress)) {
      setEmailError("Invalid email format!");
      console.log("invalid");
      return false;
    }
    return true;
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
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
            <Icon.Mail color={"grey"} />
            <Divider orientation="vertical" style={styles.divider} />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Email"
                  onBlur={onBlur}
                  style={styles.input}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name="email"
            />
          </View>
          {errors.email && <Text style={styles.error}>Email is required.</Text>}
          {emailError !== "" ? (
            <Text style={styles.error}>{emailError}</Text>
          ) : null}
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

          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            style={{ marginLeft: -10 }}
            onChange={onChange}
          />
        </View>
        {/* <Button title="Submit" onPress={handleSubmit(onSubmit)} /> */}
        <TouchableOpacity
          style={styles.loginBtn}
          title="Submit"
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={{ color: "white" }}>Sign up</Text>
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
  error: {
    color: "red",
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
