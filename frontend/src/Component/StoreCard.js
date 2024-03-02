import React from "react";
import { Text, View, StyleSheet, Linking } from "react-native";
import { Image } from "react-native-elements";
import moment from "moment/moment";
import { Divider } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
export default StoreCard = (props) => {
  const OpenNow = () => {
    if (props.store.days[moment().format("dddd")].time.length > 0) {
      const start =
        props.store.days[moment().format("dddd")].time[0].split(" - ")[0];
      const end =
        props.store.days[moment().format("dddd")].time[0].split(" - ")[1];

      if (moment().format("HH:mm") > start && moment().format("HH:mm") < end) {
        return (
          <Text style={[styles.ratingText, { color: "green" }]}>Open</Text>
        );
      }
    }
    return (
      <Text style={[styles.ratingText, { color: "red" }]}>Unavailable</Text>
    );
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#F9EEC8", "#FFD029", "#D9AA04"]}
        start={{ x: -0.4, y: 0.4 }}
        end={{ x: 1.6, y: 1 }}
        style={[
          {
            position: "absolute",
            zIndex: 7,
            top: "9%",
            left: "3%",
            padding: "1%",
            paddingHorizontal: "2%",
            display: props.store.off ? "flex" : "none",
          },
          styles.percent,
        ]}
      >
        <Text style={{ fontWeight: "700", fontSize: 16 }}>
          {props.store.off ? props.store.off.toFixed(0) + "% OFF" : null}
        </Text>
      </LinearGradient>
      <Image
        style={styles.image}
        source={
          props.store.photoResult[0] && props.store.photoResult[0].photos[0]
            ? {
                uri:
                  "http://spring-boot-repo-tpsi.s3.amazonaws.com/" +
                  props.store.photoResult[0]._id +
                  "_" +
                  props.store.photoResult[0].photos[0].id,
              }
            : require("../Image/store.jpg")
        }
      />
      <View>
        <View style={{ top: 20, position: "absolute", right: 0 }}>
          <Text style={[styles.ratingText, { color: "#686868" }]}>
            {props.store.distance.toFixed(1) + " mi"}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Text style={[{ marginTop: 9,marginBottom:5 }, styles.text]}>
            {props.store.name}
          </Text>
        </View>
        <View style={[styles.flexcontainer, styles.row]}></View>

        <Text style={{ marginBottom: 9, fontWeight: "700", fontSize: 14 }}>
          {props.store.days[moment().format("dddd")].time.length > 0
            ? "Today: " + props.store.days[moment().format("dddd")].time
            : "No happy hours today"}
        </Text>

        <View style={{ display: "flex", flexDirection: "row" }}>
          <Text style={styles.cuisine}>
            {props.store.cuisine + " • "}
            {props.store.price?"$".repeat(+props.store.price)+" • ":null}
          </Text>
          <View style={styles.rating}>
            <Image
              style={{ width: 16, height: 16, alignSelf: "center" }}
              source={require("../Image/G.png")}
            />
            <Text style={[styles.cuisine,{fontWeight:'600',marginBottom:12}]}>{props.store.rating}</Text>
          </View>
        </View>
      </View>
      {/* {week.map((day, index) => {
          return (
            <View
              key={index}
              style={[
                styles.circleContainer,
                props.store.days[days[index]].time.length > 0
                  ? styles.hh
                  : null,
              ]}
            >
              <Text style={styles.circle}>{day}</Text>
            </View>
          );
        })} */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "90%",
    left: "5%",
    right: "auto",
  },
  text: {
    fontSize: 22,
    fontWeight: "600",
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "500",
    margin: 4,
  },
  image: {
    maxWidth: "100%",
    height: "100%",
    height: 220,
    width: "100%",
    resizeMode: "cover",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: "5%",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    margin: 5,
  },
  flexcontainer: {
    marginTop: 0,
    marginBottom: 0,
    justifyContent: "space-between",
  },
  circleContainer: {
    width: 25,
    height: 25,
    borderRadius: 100,
    alignItems: "center",
    marginRight: 5,
    marginLeft: -3,
    marginTop: -5,
    backgroundColor: "#B6BBBF",
    justifyContent: "center",
    textAlign: "center",
    display: "flex",
  },
  rating: {
    flexDirection: "row",
    display: "flex",
  },
  cuisine: {
    fontWeight: "500",
    fontSize: 12,
  },
  circle: {
    color: "#424241",
    fontWeight: "bold",
  },
  hh: {
    backgroundColor: "#FFB300",
  },
  percent: {
    backgroundColor: "rgb(249, 238, 200)",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 1,
  },
});
