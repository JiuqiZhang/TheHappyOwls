import {
  Text,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Dimensions,
  Linking,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Image } from "expo-image";
import * as WebBrowser from "expo-web-browser";
import { Divider } from "react-native-elements";
import * as Icon from "react-native-feather";
const { width } = Dimensions.get("window");
// import ResetPassword from "../Auth/ResetPassword";
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { setEmail, setNameFirst, setNameLast } from "../../redux/actions";
export default ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <View style={{ width: "100%" }}>
          <Text
            style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}
          >
            Hi, {user.firstName + " " + user.lastName}!
          </Text>
        </View>
        <View style={{ marginTop: 70 }}>
          <TouchableOpacity
            style={styles.section}
            onPress={async () => {
              await WebBrowser.openBrowserAsync(
                "https://forms.gle/mUWixei7T2GoppBC8"
              );
            }}
          >
            <View style={styles.box}>
              <View style={styles.row}>
                <Icon.PlusCircle
                  style={{ marginVertical: "2%" }}
                  color={"black"}
                />
                <Text style={[styles.datafield, { marginVertical: 7 }]}>
                  Submit New Happy Hours
                </Text>
              </View>

              <Icon.ArrowRight
                style={{ alignSelf: "center", marginRight: 26 }}
                color={"black"}
              />
            </View>
            <Divider width={1} color={"#EDEDED"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.section}
            onPress={() => {
              Linking.openURL("mailto:info@tpsi.io").catch((error) => {
                console.log(error);
              });
            }}
          >
            <View style={styles.box}>
              <View style={styles.row}>
                <Icon.Mail style={{ alignSelf: "center" }} color={"black"} />
                <Text style={[styles.datafield, { marginVertical: 7 }]}>
                  Email Support
                </Text>
              </View>

              <Icon.ArrowRight
                style={{ alignSelf: "center", marginRight: 26 }}
                color={"black"}
              />
            </View>
            <Divider width={1} color={"#EDEDED"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.section}
            onPress={() => {
              Linking.openURL("https://discord.gg/nzMYBmBtKw");
            }}
          >
            <View style={styles.box}>
              <View style={styles.row}>
                <Icon.MessageCircle
                  style={{ alignSelf: "center" }}
                  color={"black"}
                />
                <Text style={[styles.datafield, { marginVertical: 7 }]}>
                  Join Our Discord Group
                </Text>
              </View>

              <Icon.ArrowRight
                style={{ alignSelf: "center", marginRight: 26 }}
                color={"black"}
              />
            </View>
            <Divider width={1} color={"#EDEDED"} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.section}
            onPress={() => {
              navigation.navigate("Info");
            }}
          >
            <View style={styles.box}>
              <View style={styles.row}>
                <Icon.Settings style={{ alignSelf: "center" }} color={"black"} />
                <Text style={[styles.datafield, { marginVertical: 7 }]}>
                  Settings
                </Text>
              </View>

              <Icon.ArrowRight
                style={{ alignSelf: "center", marginRight: 26 }}
                color={"black"}
              />
            </View>
            <Divider width={1} color={"#EDEDED"} />
          </TouchableOpacity>
          
        </View>
        <View
          style={{
            height: 136,
            position: "absolute",
            bottom: -20,
            alignContent: "center",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <TouchableOpacity
            style={{
              alignSelf: "center",
              marginTop: 24,
              width: 353,
              height: 32,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 100,
              borderRadius: 100,
              borderWidth: 1.5,
              borderColor: "#D3D3D3",
            }}
            onPress={() => {
              dispatch(setEmail(null));
              dispatch(setNameFirst(null));
              dispatch(setNameLast(null));
            }}
          >
            <Text style={{ fontSize: 10, fontWeight: "600" }}>Log Out</Text>
          </TouchableOpacity>
          <View style={{ height: 24, marginTop: 20, alignSelf: "center" }}>
           
              <TouchableOpacity
                onPress={async () => {
                  await WebBrowser.openBrowserAsync(
                    "https://drive.google.com/file/d/1ggIpVeV0VEU9USRVWB4fnV6yneEvCCPU/view"
                  );
                }}
              >
                <Text
                  style={{
                    fontSize: 10,
                    fontWeight: "500",
                    textAlign: "center",
                    color:'#8A6F0F',
                    textDecorationLine:'underline'
                  }}
                >
                  Privacy Policy
                </Text>
              </TouchableOpacity>

          </View>
          <View style={{ height: 24, marginTop: 6, alignSelf: "center" }}>
            <Text style={{ fontSize: 10, fontWeight: "500", color: "#999999" }}>
              Version: 1.0.8
            </Text>
          </View>
        </View>
      </View>
      <Image
        style={{
          height: 210,
          width: "100%",
          position: "absolute",
          top: 0,
          zIndex: -97,
        }}
        source={require("../../Image/profileBG.png")}
        contentFit="fill"
      />
    </>
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
    paddingHorizontal: 26,
  },
  box: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",

    paddingTop: 18,
    paddingBottom: 21,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: "4%",
  },

  datafield: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 26,
  },
});
