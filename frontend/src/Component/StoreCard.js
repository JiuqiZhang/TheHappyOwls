import React,{useEffect} from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Image } from "expo-image";
import * as Icon from "react-native-feather";
import moment from "moment/moment";
import { Divider } from "react-native-elements";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import { useSelector } from "react-redux";
import Slider from "./Slider";
export default StoreCard = React.memo((props) => {
  const user = useSelector((state) => state.user);
  useEffect(()=>{
    if(props.store.tags == null){
      console.log( props.store.name)
    }
  },[])
  const removeFav = async (id) => {
    // var formdata = new FormData();

    // formdata.append("username", user.email);
    // formdata.append("storeID", id);

    // var requestOptions = {
    //   method: 'POST',
    //   body: formdata,
    // };

    await axios({
      method: "post",
      url:
        "https://data.tpsi.io/api/v1/stores/removeStoreToUserFavorite?username=" +
        user.email +
        "&storeID=" +
        id,
    })
      .then((res) => {
        if (res) {
          props.change((stores) => {
            return stores.map((store) => {
              return store._id == props.store._id
                ? { ...store, userFavorite: false }
                : store;
            });
          });
        }
      })
      .catch((error) => console.log("error", error));
  };
  const addToFav = async (id) => {
    // var formdata = new FormData();

    // formdata.append("username", user.email);
    // formdata.append("storeID", id);

    // var requestOptions = {
    //   method: "POST",
    //   body: formdata,
    // };

    await axios({
      method: "post",
      url:
        "https://data.tpsi.io/api/v1/stores/addStoreToUserFavorite?username=" +
        user.email +
        "&storeID=" +
        id,
    })
      .then((res) => {
        if (res) {
          props.change((stores) => {
            return stores.map((store) => {
              return store._id == props.store._id
                ? { ...store, userFavorite: true }
                : store;
            });
          });
        }
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <GestureHandlerRootView style={styles.container}>
      <TouchableOpacity
        style={{ position: "absolute", right: 7, top: 20, zIndex: 17 }}
        onPress={
          user.email
            ? () => {
                !props.store.userFavorite
                  ? addToFav(props.store._id)
                  : removeFav(props.store._id);
              }
            : () => {
                props.navigation.navigate("Saved");
              }
        }
      >
        <Icon.Heart
          width={32}
          height={40}
          fill={props.store.userFavorite ? "#FFD029" : "white"}
          stroke={"#5C4A0A"}
          strokeWidth={props.store.userFavorite ? 0.5 : 1.5}
        />
      </TouchableOpacity>
      <LinearGradient
                      colors={["#F9EEC8", "#FFD029", "#D9AA04"]}
                      start={{ x: -0.4, y: 0 }}
                      end={{ x: 1.6, y: 1 }}
                     
               
        style={[
          {
            position: "absolute",
            zIndex: 7,
            top: 29,
            left: 10,
            paddingVertical: 2,
            paddingHorizontal:6,
            display: props.store.off ? "flex" : "none",
          },
          styles.percent,
        ]}
      >
        <Text style={{ fontWeight: "600", fontSize: 14 }}>
          {props.store.off ? props.store.off.toFixed(0) + "% OFF" : null}
        </Text>
      </LinearGradient>

      {/* <Image
        style={styles.image}
        contentFit='cover'
        source={
          props.store.photoResult[0] && props.store.photoResult[0].photos[0]
            ? {
                uri:
                  "https://spring-boot-repo-tpsi.s3.amazonaws.com/" +
                  props.store.photoResult[0]._id +
                  "_" +
                  props.store.photoResult[0].photos[0].id,
              }
            : require("../Image/store.jpg")
        }
      /> */}
      <Image
        style={styles.image}
        contentFit='cover'
        source={
          props.store.photoResult[0] && props.store.photoResult[0].photos[0]
            ? {
                uri:
                  "https://spring-boot-repo-tpsi.s3.amazonaws.com/" +
                  props.store.photoResult[0]._id +
                  "_" +
                  props.store.photoResult[0].photos[0].id,
              }
            : require("../Image/store.jpg")
        }
      /> 
      <View>
        <View
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-between",
            marginTop: 9,
            marginBottom: 4,
          }}
        >
          <Text style={[styles.text]}>{props.store.name}</Text>
          <Text
            style={[
              styles.ratingText,
              { alignSelf: "flex-end", fontWeight: "500" },
            ]}
          >
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
          <View style={{ flexDirection: "row" }}>
            <View style={{ marginRight: 14 }}>
              <Text style={{ fontSize: 10, color: "#7D7D7D" }}>Happy Hour</Text>
              <Text style={{ fontWeight: "600", fontSize: 14 }}>
                {props.store.days[moment().format("dddd")].time.length > 0
                  ? "" + props.store.days[moment().format("dddd")].time
                  : "No happy hour today"}
              </Text>
            </View>
            <View>
              <Text style={{ fontSize: 10, color: "#7D7D7D" }}>
                Price Range
              </Text>
              {props.store.days[moment().format("dddd")].deal.length > 0 ? (
                <Text style={{ fontWeight: "600", fontSize: 14 }}>
                  {"$" +
                    props.store.days[moment().format("dddd")].deal.reduce(
                      (min, p) =>
                        p.discounted_price < min ? p.discounted_price : min,
                      props.store.days[moment().format("dddd")].deal[0]
                        .discounted_price
                    ) +
                    " - $" +
                    props.store.days[moment().format("dddd")].deal.reduce(
                      (max, p) =>
                        p.discounted_price > max ? p.discounted_price : max,
                      props.store.days[moment().format("dddd")].deal[0]
                        .discounted_price
                    )}
                </Text>
              ) : (
                <Text style={{ fontWeight: "600", fontSize: 14 }}>
                  {"n/a"}
                </Text>
              )}
            </View>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={styles.rating}>
              <Image
                style={{ width: 12, height: 12 }}
                source={require("../Image/G.png")}
              />
              <Text style={styles.cuisine}>{props.store.rating}</Text>
            </View>
            <Text style={styles.cuisine}>{" • " + props.store.cuisine}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            display: "flex",
            marginTop: 7,
          }}
        >
          { props.store.tagResult===null||props.store.tagResult.length == 0
            ? null
            : props.store.tagResult.slice(0, 3).map((tag, i) => {
                return (
                  <View key={i} style={{borderRadius:8,backgroundColor:'#F5E3A3',marginRight:8}}>
                    {tag.name !== "No Tag" ? (
                      <Text style={{ fontSize: 11, fontWeight: "500",marginHorizontal:6,marginVertical:2 }}>
                        {tag.name}
                      </Text>
                    ) : null}
                  </View>
                );
              })}
          {props.store.tags!==null && props.store.tags.length > 3 ? (
            <Text style={{fontSize: 11, fontWeight: "500",marginTop:2}}>+{props.store.tags.length - 3}</Text>
          ) : null}
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
    </GestureHandlerRootView>
  );
});
const styles = StyleSheet.create({
  container: {
    width: "90%",
    left: "5%",
    right: "auto",
    flex: 1,
    marginBottom:2
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
  ratingText: {
    fontSize: 10,
  },
  image: {
    maxWidth: "100%",
    height: "100%",
    height: 179.7,
    width: "100%",
    resizeMode: "contain",
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
    fontSize: 10,
  },
  circle: {
    color: "#424241",
    fontWeight: "bold",
  },
  hh: {
    backgroundColor: "#FFB300",
  },
  percent: {
    backgroundColor: "#F5E3A3",
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
