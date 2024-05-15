import { Text, StyleSheet, View, Button, TouchableOpacity } from "react-native";
import { useSelector,useDispatch } from "react-redux";
import { Divider } from "react-native-elements";
import * as Icon from "react-native-feather";
import ResetPassword from "../Auth/ResetPassword";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setEmail, setNameFirst, setNameLast } from "../../redux/actions";
export default ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Info");
        }}
        style={styles.section}
      >
        <View style={styles.box}>
          <View style={styles.row}>
            <Icon.User style={{ marginVertical: "2%" }} color={"grey"} />
            <Text style={[styles.datafield, { marginVertical: 7 }]}>
              Personal account
            </Text>
          </View>

          <Icon.ArrowRight style={{ marginVertical: "2%" }} color={"grey"} />
        </View>
        <Divider width={1.5} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.section}
        onPress={() => {
          navigation.navigate("Security");
        }}
      >
        <View style={styles.box}>
          <View style={styles.row}>
            <Icon.Lock style={{ marginVertical: "2%" }} color={"grey"} />
            <Text style={[styles.datafield, { marginVertical: 7 }]}>
              Security
            </Text>
          </View>

          <Icon.ArrowRight style={{ marginVertical: "2%" }} color={"grey"} />
        </View>
        <Divider width={1.5} />
      </TouchableOpacity>

      <Text style={styles.title}>Support</Text>
      <TouchableOpacity
        style={styles.section}
        onPress={() => {
          navigation.navigate("Feedback");
        }}
      >
        <View style={styles.box}>
          <View style={styles.row}>
            <Icon.Edit3 style={{ marginVertical: "2%" }} color={"grey"} />
            <Text style={[styles.datafield, { marginVertical: 7 }]}>
              Give us feedback
            </Text>
          </View>

          <Icon.ArrowRight style={{ marginVertical: "2%" }} color={"grey"} />
        </View>
        <Divider width={1.5} />
      </TouchableOpacity>

      <Text style={styles.title}>Legal</Text>
      {/* <TouchableOpacity style={styles.section}>
        <View style={styles.box}>
          <View style={styles.row}>
            <Icon.BookOpen style={{ marginVertical: "2%" }} color={"grey"} />
            <Text style={[styles.datafield, { marginVertical: 7 }]}>
              Terms of Service
            </Text>
          </View>

          <Icon.ArrowRight style={{ marginVertical: "2%" }} color={"grey"} />
        </View>
        <Divider width={1.5} />
      </TouchableOpacity> */}

      <TouchableOpacity style={styles.section} disabled={true} onPress={() => {
          navigation.navigate("Policy");
        }}>
        <View style={styles.box}>
          <View style={styles.row}>
            <Icon.BookOpen style={{ marginVertical: "2%" }} color={"grey"} />
            <Text style={[styles.datafield, { marginVertical: 7 }]}>
              Privacy Policy
            </Text>
          </View>

          <Icon.ArrowRight style={{ marginVertical: "2%" }} color={"grey"} />
        </View>
        <Divider width={1.5} />
      </TouchableOpacity>

      {/* <View style={styles.section}>
        <Text style={styles.subtitle}>Name:</Text>
        <Text style={styles.datafield}>{state.name}</Text>
        <Divider width={1.5} />
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Email:</Text>
        <Text style={styles.datafield}>{state.email}</Text>
        <Divider width={1.5} />
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Phone Number:</Text>
        <Text style={styles.datafield}>{state.numbers}</Text>
        <Divider width={1.5} />
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>DOB:{state.dob}</Text>
        <Divider width={1.5} />
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Password:{state.email}</Text>
        <Divider width={1.5} />
      </View> */}
      <Button
        title="Logout"
        onPress={() => {
          dispatch(setEmail(null));
          dispatch(setNameFirst(null));
          dispatch(setNameLast(null));
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: "5%",
    marginTop: "15%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
  },
  section: {
    marginVertical: "2%",
  },
  box: {
    display: "flex",
    flexDirection: "row",
    marginVertical: "2%",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: "4%",
  },

  datafield: {
    color: "#8B8378",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: "5%",
  },
});
