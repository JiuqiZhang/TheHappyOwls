import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import InputBox from "../../Component/InputBox";
export default Reset = () => {
  const [oldpwd, setOldPwd] = React.useState("");
  const [newpwd, setnewpwd] = React.useState("");
  const [confirmpwd, setconfirmpwd] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('sent')
    const userData = {
      name: state.name,
      job: state.job,
    };
    await axios.post("https://ec2-34-203-231-63.compute-1.amazonaws.com/api/v1/users/ChangePassword", userData).then((response) => {
      console.log(response.status, response.data);
    }).catch((error)=>{
        console.log(error)
    });
  };
  return (
    <View>
      <InputBox label="Current Password" value={oldpwd} onchange={setOldPwd} />
      <InputBox label="New Password" value={newpwd} onchange={setnewpwd} />
      <InputBox
        label="Confirm New Password"
        value={confirmpwd}
        onchange={setconfirmpwd}
      />
      <Button onPress={handleSubmit} title="Reset" />
    </View>
  );
};
