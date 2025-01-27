import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Linking,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  Modal,
  Dimensions,
} from "react-native";
import { InstagramLoader } from "react-native-easy-content-loader";
import ReviewModal from "../../Component/ReviewModal";
import axios from "axios";
import { Image } from "expo-image";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DropDownPicker from "react-native-dropdown-picker";
import { LinearGradient } from "expo-linear-gradient";
import Constants from "expo-constants";
import { Tab, TabView } from "react-native-elements";
import * as WebBrowser from "expo-web-browser";
import { MaterialIcons } from "@expo/vector-icons";
import * as Icon from "react-native-feather";
import Slider from "../../Component/Slider";
import * as Location from "expo-location";
import { Divider } from "react-native-elements";
import { Rating } from "react-native-ratings";
import Svg, { G, Path, Defs, ClipPath, Mask } from "react-native-svg";
import { useSelector } from "react-redux";
const { height, width } = Dimensions.get("screen");
import moment from "moment";
import { Avatar } from "react-native-elements";
import { Dropdown } from "react-native-element-dropdown";
import { SafeAreaView } from "react-native-safe-area-context";
export default DetailPage = ({ navigation, route }) => {
  const user = useSelector((state) => state.user);
  const img = {
    Beer: require("../../Image/Beer.png"),
    Wine: require("../../Image/Wine.png"),
    Food: require("../../Image/Food.png"),
    Cocktail: require("../../Image/Cocktail.png"),
  };

  const validatehh = (hh) => {
    let schedule = {
      Monday: {
        time: [],
        deal: [],
      },
      Tuesday: {
        time: [],
        deal: [],
      },
      Wednesday: {
        time: [],
        deal: [],
      },
      Thursday: {
        time: [],
        deal: [],
      },
      Friday: {
        time: [],
        deal: [],
      },
      Saturday: {
        time: [],
        deal: [],
      },
      Sunday: {
        time: [],
        deal: [],
      },
    };

    if (hh.length > 0) {
      for (i = 0; i < hh[0].infos.length; i++) {
        // time
        hh[0].infos[i].days.map((item) => {
          schedule[item]["time"] = schedule[item]["time"].concat([
            hh[0].infos[i].start_time + " - " + hh[0].infos[i].end_time,
          ]);

          // deal
          schedule[item]["deal"] = hh[0].infos[i].items;
        });
      }
    }

    return schedule;
  };

  const findDeal = (hh) => {
    var res = 1;
    if (hh.length > 0) {
      for (i = 0; i < hh[0].infos.length; i++) {
        hh[0].infos[i].items.map((item) => {
          if (item.regular_price !== 0) {
            let deal = item.discounted_price / item.regular_price;
            if (deal < res) {
              res = deal;
            }
          }
        });
      }
    } else {
      return null;
    }
    if (res !== 1) {
      return (1 - res) * 100;
    } else {
      return null;
    }
  };

  const validateItem = (hh) => {
    let res = [];
    if (hh.length > 0) {
      for (i = 0; i < hh[0].infos.length; i++) {
        // time
        hh[0].infos[i].items.map((item) => {
          if (!res.includes(item.type)) {
            res.push(item.type);
          }
        });
      }
    }

    return res;
  };

  useEffect(() => {
    const getPerm = async () => {
      // var req = new FormData();
      // if(route.params.location){
      //    req.append("lat",route.params.location.latitude);
      // req.append("lng", route.params.location.longitude);
      // }

      // if (user.email) {
      //   req.append("username", user.email);
      // }
      var config = {
        method: "get",
        url: "https://data.tpsi.io/api/v1/stores/indexForApp/" + data._id,
        headers: {},
      };

      await axios(config)
        .then((response) => {
          return response.data;
        })
        .then((store) => {
          setData({
            name: store.name,
            rating: store.rating,
            cuisine: `${store.cuisine}`,
            hours: store.hours,
            photoResult: store.photoResult,
            location: store.location,
            hh: store.hhResult,
            price: store.price,
            website: store.website,
            comments: store.comments,
            number: store.number,
            days: validatehh(store.hhResult),
            off: findDeal(store.hhResult),
            items: validateItem(store.hhResult),
            ...store,
          });
        })
        .catch((error) => console.log(error));
    };

    getPerm();
  }, []);
  const [userLoc, setLoc] = useState(null);
  const [index, setIndex] = useState(0);
  const [modal, isModal] = useState(false);
  const [review, openReview] = useState(false);
  const [description, setDescription] = useState(false);
  const [more, setMore] = useState(false);
  const [value, setValue] = useState(moment().isoWeekday() - 1);
  const [isFocus, setIsFocus] = useState(false);
  const [data, setData] = useState(route.params.store);
  const dayInWeek = [
    { label: "Monday", value: 0 },
    { label: "Tuesday", value: 1 },
    { label: "Wednesday", value: 2 },
    { label: "Thursday", value: 3 },
    { label: "Friday", value: 4 },
    { label: "Saturday", value: 5 },
    { label: "Sunday", value: 6 },
  ];
  useEffect(() => {
   
    if (review == false) {
      var config = {
        method: "get",
        url: "https://data.tpsi.io/api/v1/stores/indexForApp/" + data._id,
        headers: {},
      };

      axios(config)
        .then((response) => {
          return response.data;
        })
        .then((store) => {
          setData({
            name: store.name,
            rating: store.rating,
            cuisine: `${store.cuisine}`,
            hours: store.hours,
            photoResult: store.photoResult,
            location: store.location,
            hh: store.hhResult,
            price: store.price,
            website: store.website,
            comments: store.comments,
            number: store.number,
            days: validatehh(store.hhResult),
            off: findDeal(store.hhResult),
            items: validateItem(store.hhResult),
            ...store,
          });
  
        })
        .catch((error) => console.log(error));
    }
  }, [review]);
  // const removeFav = async(id) =>{
  //   var formdata = new FormData();

  //   formdata.append("username", user.email);
  //   formdata.append("storeID", id);

  //   var requestOptions = {
  //     method: 'POST',
  //     body: formdata,
  //   };

  //   await fetch("https://data.tpsi.io/api/v1/stores/removeStoreToUserFavorite", requestOptions)
  //   .then((res) => {
  //     if (res) {

  //       route.params.change((stores) => {
  //         return stores.map((store) => {return store._id == props.store._id ? {...store,userFavorite:false} : store});
  //       });
  //     }
  //   })
  //   .catch((error) => console.log("error", error));
  // }
  // const addToFav = async (id) => {
  //   var formdata = new FormData();

  //   formdata.append("username", user.email);
  //   formdata.append("storeID", id);

  //   var requestOptions = {
  //     method: "POST",
  //     body: formdata,
  //   };

  //   await fetch(
  //     "https://data.tpsi.io/api/v1/stores/addStoreToUserFavorite",
  //     requestOptions
  //   )
  //     .then((res) => {
  //       if (res) {
  //         route.params.change((stores) => {
  //           return stores.map((store) => {return store._id == props.store._id ? {...store,userFavorite:true} : store});
  //         });
  //       }
  //     })
  //     .catch((error) => console.log("error", error));
  // };
  const week = ["M", "Tu", "W", "Th", "F", "Sa", "Su"];
  const days = {
    0: "Monday",
    1: "Tuesday",
    2: "Wednesday",
    3: "Thursday",
    4: "Friday",
    5: "Saturday",
    6: "Sunday",
  };
  const OpenNow = () => {
    if (data.days[moment().format("dddd")].time.length > 0) {
      for (let i = 0; i < data.days[moment().format("dddd")].time.length; i++) {
        let start = data.days[moment().format("dddd")].time[i].split(" - ")[0];
        let end = data.days[moment().format("dddd")].time[i].split(" - ")[1];

        if (start.length > end.length) {
          if (
            moment().format("HH:mm") > start ||
            moment().format("HH:mm") < "0" + end
          ) {
            return (
              <TouchableOpacity
                onPress={() => {
                  isModal(true);
                }}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={{ justifyContent: "center" }}>
                  <Text style={{ color: "green", fontWeight: "600" }}>
                    Open
                    <Text style={{ color: "black" }}>
                      {" "}
                      • {data.days[moment().format("dddd")].time.toString()}
                    </Text>
                  </Text>
                </View>
                <View
                  style={{
                    height: 32,
                    width: 32,
                    borderWidth: 1.5,
                    borderColor: "#D3D3D3",
                    borderRadius: 100,
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "flex-start",
                  }}
                >
                  <Icon.ArrowRight color={"black"} width={24} height={24} />
                </View>
              </TouchableOpacity>
            );
          }
        }
        if (start.length < 5) {
          start = "0" + start;
        }
        if (end.length < 5) {
          end = "0" + end;
        }
        if (
          moment().format("HH:mm") >= start &&
          moment().format("HH:mm") < end
        ) {
          return (
            <TouchableOpacity
              onPress={() => {
                isModal(true);
              }}
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <View style={{ justifyContent: "center" }}>
                <Text style={{ color: "green", fontWeight: "600" }}>
                  Open
                  <Text style={{ color: "black" }}>
                    {" "}
                    • {data.days[moment().format("dddd")].time.toString()}
                  </Text>
                </Text>
              </View>
              <View
                style={{
                  height: 32,
                  width: 32,
                  borderWidth: 1.5,
                  borderColor: "#D3D3D3",
                  borderRadius: 100,
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "flex-start",
                }}
              >
                <Icon.ArrowRight color={"black"} width={24} height={24} />
              </View>
            </TouchableOpacity>
          );
        }
      }
    }
    return (
      <TouchableOpacity
        onPress={() => {
          isModal(true);
        }}
        style={{ flexDirection: "row", justifyContent: "space-between" }}
      >
        <View style={{ justifyContent: "center" }}>
          <Text style={{ color: "red", fontWeight: "600" }}>
            Unavailable Now
            <Text style={{ color: "black" }}>
              {" "}
              • {data.days[moment().format("dddd")].time.toString()}
            </Text>
          </Text>
        </View>
        <View
          style={{
            height: 32,
            width: 32,
            borderWidth: 1.5,
            borderColor: "#D3D3D3",
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "center",
            alignSelf: "flex-start",
          }}
        >
          <Icon.ArrowRight color={"black"} width={24} height={24} />
        </View>
      </TouchableOpacity>
    );
  };

  const MinLeft = () => {
    if (data.days[moment().format("dddd")].time.length > 0) {
      const start = data.days[moment().format("dddd")].time[0].split(" - ")[0];
      const end = data.days[moment().format("dddd")].time[0].split(" - ")[1];

      if (moment().format("HH:mm") > start && moment().format("HH:mm") < end) {
        return null;
      }

      let date1 = new Date(`2000-01-01T${moment().format("HH:mm")}Z`);
      let date2 = new Date(`2000-01-01T${start}Z`);
      if (date2 < date1) {
        date2.setDate(date2.getDate() + 1);
      }

      let diff = date2 - date1;
      let ms = diff % 1000;
      let ss = Math.floor(diff / 1000) % 60;
      let mm = Math.floor(diff / 1000 / 60) % 60;
      let hh = Math.floor(diff / 1000 / 60 / 60);
      return (
        <View
          style={{
            backgroundColor: "#F0D575",
            height: 36,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 12, fontWeight: "500", margin: "auto" }}>
            {(hh != 0 ? hh + " hr " : "") +
              mm +
              " mins untill this merchant’s next Happy Hour"}
          </Text>
        </View>
      );
    }
  };

  useEffect(() => {
    const getLoc = async () => {
      let currentLocation = await Location.getCurrentPositionAsync({});

      setLoc(currentLocation.coords);
    };

    getLoc();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      {data.name ? (
        <ScrollView>
          <Slider img={data.photoResult[0]} />

          <MinLeft />
          <View style={styles.scrollViewLeft}>
            {/* title */}
            <View
              style={[
                styles.card,
                { backgroundColor: "#FFFFFF", marginBottom: 15 },
              ]}
            >
              <Text style={styles.text}>{data.name}</Text>

              {/* <Divider orientation="horizontal" width={1} style={styles.divider} /> */}
              <View
                style={{
                  flexDirection: "row",
                  width: "80%",
                  marginVertical: "1%",
                }}
              >
                <View
                  style={{
                    width: "7%",
                    marginRight: "2%",
                    justifyContent: "center",
                  }}
                >
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={14}
                    height={11}
                    fill="none"
                    style={{ alignSelf: "center" }}
                  >
                    <G clipPath="url(#a)">
                      <Path
                        fill="#4285F4"
                        d="M10.87 5.603a4.7 4.7 0 0 0-.116-1.12H5.607v2.034h3.021c-.06.505-.39 1.266-1.12 1.778l-.01.068 1.626 1.26.113.012c1.035-.957 1.632-2.363 1.632-4.032Z"
                      />
                      <Path
                        fill="#34A853"
                        d="M5.607 10.963c1.48 0 2.723-.488 3.63-1.328l-1.73-1.34c-.462.323-1.084.548-1.9.548-1.449 0-2.68-.956-3.118-2.278l-.064.006L.733 7.88l-.022.06a5.477 5.477 0 0 0 4.896 3.022Z"
                      />
                      <Path
                        fill="#FBBC05"
                        d="M2.488 6.565a3.374 3.374 0 0 1-.183-1.084c0-.377.067-.743.177-1.084l-.003-.072-1.713-1.33-.056.026a5.486 5.486 0 0 0-.585 2.46c0 .883.213 1.718.585 2.46l1.778-1.376Z"
                      />
                      <Path
                        fill="#EB4335"
                        d="M5.607 2.12c1.03 0 1.724.444 2.12.815l1.547-1.51C8.324.542 7.087 0 5.607 0A5.477 5.477 0 0 0 .711 3.02l1.772 1.377C2.928 3.076 4.158 2.12 5.607 2.12Z"
                      />
                    </G>
                    <Defs>
                      <ClipPath id="a">
                        <Path fill="#fff" d="M0 0h11v11H0z" />
                      </ClipPath>
                    </Defs>
                  </Svg>
                </View>

                <Text
                  style={{
                    fontWeight: "500",
                    alignSelf: "center",
                    fontSize: 12,
                  }}
                >
                  {data.rating}
                </Text>
                <Rating
                  startingValue={data.rating}
                  imageSize={14}
                  readonly={true}
                  style={{ paddingHorizontal: "2%" }}
                />

                <Text
                  style={{ marginLeft: "-2%", fontSize: 14, fontWeight: "500" }}
                >
                  {data.ratingCount ? " (" + data.ratingCount + ")" : null}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "80%",
                  marginVertical: "1%",
                }}
              >
                <View
                  style={{
                    width: "7%",
                    marginRight: "2%",
                    justifyContent: "center",
                  }}
                >
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={14}
                    height={9}
                    fill="none"
                    style={{ alignSelf: "center" }}
                  >
                    <Path
                      fill="#000"
                      d="M13.323 0H.677a.662.662 0 0 0-.479.208A.729.729 0 0 0 0 .711v7.578c0 .189.071.37.198.503s.3.208.48.208h12.645c.18 0 .351-.075.479-.208A.729.729 0 0 0 14 8.289V.711a.729.729 0 0 0-.198-.503.662.662 0 0 0-.48-.208Zm-3.32 7.579H3.997a3.619 3.619 0 0 0-.925-1.8 3.353 3.353 0 0 0-1.716-.97v-.617a3.353 3.353 0 0 0 1.716-.97c.47-.493.791-1.119.925-1.801h6.008c.134.682.455 1.308.925 1.8.47.493 1.066.83 1.716.97v.617c-.65.141-1.247.478-1.716.97a3.618 3.618 0 0 0-.925 1.801Zm2.642-4.859a2.035 2.035 0 0 1-.758-.503 2.162 2.162 0 0 1-.48-.796h1.238v1.3ZM2.593 1.421c-.101.3-.265.571-.48.796a2.035 2.035 0 0 1-.758.503V1.421h1.238ZM1.355 6.28c.285.107.544.279.758.503.215.225.379.497.48.796H1.355v-1.3Zm10.052 1.299c.101-.3.265-.571.48-.796.214-.224.473-.396.758-.503v1.299h-1.238ZM7 2.132c-.447 0-.883.138-1.255.399-.37.26-.66.63-.831 1.063-.171.432-.216.909-.129 1.368.087.46.303.881.618 1.213.316.331.718.557 1.156.648a2.16 2.16 0 0 0 1.305-.135c.413-.18.765-.483 1.014-.872.248-.39.38-.848.38-1.316 0-.628-.238-1.23-.661-1.675A2.206 2.206 0 0 0 7 2.132Zm0 3.315a.874.874 0 0 1-.502-.16.94.94 0 0 1-.332-.424.99.99 0 0 1-.052-.548.963.963 0 0 1 .247-.485.891.891 0 0 1 .463-.26.864.864 0 0 1 .522.055.914.914 0 0 1 .405.349.98.98 0 0 1-.112 1.196.882.882 0 0 1-.639.277Z"
                    />
                  </Svg>
                </View>
                {data.days[moment().format("dddd")].deal.length > 0 ? (
                  <Text style={{ fontWeight: "500", fontSize: 12 }}>
                    {"$" +
                      data.days[moment().format("dddd")].deal.reduce(
                        (min, p) =>
                          p.discounted_price < min ? p.discounted_price : min,
                        data.days[moment().format("dddd")].deal[0]
                          .discounted_price
                      ) +
                      " - $" +
                      data.days[moment().format("dddd")].deal.reduce(
                        (max, p) =>
                          p.discounted_price > max ? p.discounted_price : max,
                        data.days[moment().format("dddd")].deal[0]
                          .discounted_price
                      )}
                    {"  •  "}
                  </Text>
                ) : null}
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: 12,
                  }}
                >
                  {data.cuisine + " " + "$".repeat(+data.price)}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "80%",
                  marginVertical: "1%",
                }}
              >
                <View
                  style={{
                    width: "7%",
                    marginRight: "2%",
                    justifyContent: "center",
                  }}
                >
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    height={17}
                    style={{ alignSelf: "center" }}
                    fill="none"
                  >
                    <Path
                      fill="#000"
                      fillRule="evenodd"
                      d="M2.834 7.028c0-3.094 2.542-5.611 5.667-5.611 3.124 0 5.666 2.517 5.666 5.611 0 3.878-4.993 8.202-5.205 8.384a.707.707 0 0 1-.922 0c-.213-.182-5.206-4.506-5.206-8.384Zm5.667 6.888c-1.187-1.122-4.25-4.272-4.25-6.888 0-2.312 1.906-4.194 4.25-4.194 2.344 0 4.25 1.882 4.25 4.194 0 2.616-3.064 5.766-4.25 6.888ZM6.02 6.73a2.482 2.482 0 0 1 2.48-2.479 2.482 2.482 0 0 1 2.479 2.48A2.482 2.482 0 0 1 8.5 9.207 2.482 2.482 0 0 1 6.022 6.73Zm1.417 0a1.064 1.064 0 0 0 2.125 0c0-.586-.477-1.062-1.062-1.062-.586 0-1.063.476-1.063 1.062Z"
                      clipRule="evenodd"
                    />
                    <Mask
                      id="a"
                      width={14}
                      height={15}
                      x={2}
                      y={1}
                      maskUnits="userSpaceOnUse"
                      style={{
                        maskType: "luminance",
                      }}
                    >
                      <Path
                        fill="#fff"
                        fillRule="evenodd"
                        d="M2.834 7.028c0-3.094 2.542-5.611 5.667-5.611 3.124 0 5.666 2.517 5.666 5.611 0 3.878-4.993 8.202-5.205 8.384a.707.707 0 0 1-.922 0c-.213-.182-5.206-4.506-5.206-8.384Zm5.667 6.888c-1.187-1.122-4.25-4.272-4.25-6.888 0-2.312 1.906-4.194 4.25-4.194 2.344 0 4.25 1.882 4.25 4.194 0 2.616-3.064 5.766-4.25 6.888ZM6.02 6.73a2.482 2.482 0 0 1 2.48-2.479 2.482 2.482 0 0 1 2.479 2.48A2.482 2.482 0 0 1 8.5 9.207 2.482 2.482 0 0 1 6.022 6.73Zm1.417 0a1.064 1.064 0 0 0 2.125 0c0-.586-.477-1.062-1.062-1.062-.586 0-1.063.476-1.063 1.062Z"
                        clipRule="evenodd"
                      />
                    </Mask>
                  </Svg>
                </View>
                <Text
                  numberOfLines={1}
                  style={{ fontWeight: "500", fontSize: 12 }}
                >
                  {data.location
                    ? data.location.substring(0, data.location.length - 5)
                    : null}
                </Text>
              </View>
              <View style={{ flexDirection: "row", marginTop: "2%" }}>
                {data.tagResult === null || data.tagResult.length == 0
                  ? null
                  : data.tagResult.map((tag, i) => {
                      return (
                        <View
                          key={i}
                          style={{
                            borderRadius: 8,
                            backgroundColor: "#F5E3A3",
                            marginRight: 8,
                          }}
                        >
                          {tag.name !== "No Tag" ? (
                            <Text
                              style={{
                                fontSize: 11,
                                fontWeight: "500",
                                marginHorizontal: 6,
                                marginVertical: 2,
                              }}
                            >
                              {tag.name}
                            </Text>
                          ) : null}
                        </View>
                      );
                    })}
              </View>
            </View>
            <TouchableOpacity
              style={{ height: 52, marginBottom: 18 }}
              onPress={() => {
                if(user.email){
                  openReview(true);
                }else{
                  Alert.alert('To leave a review', 'Please login in to your TPSI account.', [
                    
      {
        text: 'OK',
        onPress: () => navigation.navigate("Profile"),
      },
     
    ]);
                }
              }}
            >
              <LinearGradient
                colors={["#F9EEC8", "#FFD029", "#D9AA04"]}
                start={{ x: -1.4, y: 0 }}
                end={{ x: 2.6, y: 1 }}
                style={{
                  height: 52,
                  marginHorizontal: 20,
                  borderRadius: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  Check-In
                </Text>
              </LinearGradient>
            </TouchableOpacity>
{user.email?<ReviewModal
              review={review}
              openReview={openReview}
              store={data._id}
            />:null}
            <View style={{ paddingBottom: 24 }}>
              <View
                style={{
                  height: "100%",
                  backgroundColor: "#FCF8E8",
                  width: width,
                  position: "absolute",
                  top: 32,
                }}
              />
              <View
                style={{
                  height: 8,
                  position: "absolute",
                  width: width,
                  bottom: 0,
                  backgroundColor: "#F5E3A3",
                }}
              />
              <View
                style={{
                  marginHorizontal: 0,
                  paddingBottom: 36,
                }}
              >
                <View
                  style={[
                    styles.row,
                    {
                      justifyContent: "space-around",
                      paddingTop: "3%",
                      zIndex: 100,
                    },
                  ]}
                >
                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={() =>
                      Linking.openURL(
                        "maps://app?daddr=" +
                          data.latitude +
                          "+" +
                          data.longitude
                      )
                    }
                  >
                    <View style={styles.directionIcon}>
                      <LinearGradient
                        colors={["#F9EEC8", "#FFD029", "#D9AA04"]}
                        start={{ x: -0.4, y: 0 }}
                        end={{ x: 1.6, y: 1 }}
                        style={styles.directionIcon}
                      >
                        <MaterialIcons
                          name="directions"
                          size={24}
                          color="black"
                        />
                      </LinearGradient>
                    </View>
                    <Text style={styles.directionFont}>Direction</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={async () => {
                      await WebBrowser.openBrowserAsync(
                        !data.menuLink ? data.website : data.menuLink
                      );
                    }}
                  >
                    <View style={styles.directionIcon}>
                      <LinearGradient
                        colors={["#F9EEC8", "#FFD029", "#D9AA04"]}
                        start={{ x: -0.4, y: 0 }}
                        end={{ x: 1.6, y: 1 }}
                        style={styles.directionIcon}
                      >
                        <MaterialIcons
                          name="menu-book"
                          size={24}
                          color="black"
                        />
                      </LinearGradient>
                    </View>
                    <Text style={styles.directionFont}>Menu</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={() => {
                      Linking.openURL(`tel:${data.number.replace(/\D/g, "")}`);
                    }}
                  >
                    <View style={styles.directionIcon}>
                      <LinearGradient
                        colors={["#F9EEC8", "#FFD029", "#D9AA04"]}
                        start={{ x: -0.4, y: 0 }}
                        end={{ x: 1.6, y: 1 }}
                        style={styles.directionIcon}
                      >
                        <MaterialIcons name="call" size={24} color="black" />
                      </LinearGradient>
                    </View>
                    <Text style={styles.directionFont}>Call</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={() => {
                      isModal(!modal);
                    }}
                    //           onPress={
                    //   user.email
                    //     ? () => {
                    //         !data.userFavorite ? addToFav(data._id) : removeFav(data._id);
                    //       }
                    //     : () => {
                    //         navigation.navigate("Saved");
                    //       }
                    // }
                  >
                    <View style={styles.directionIcon}>
                      <LinearGradient
                        colors={["#F9EEC8", "#FFD029", "#D9AA04"]}
                        start={{ x: -0.4, y: 0 }}
                        end={{ x: 1.6, y: 1 }}
                        style={styles.directionIcon}
                      >
                        <MaterialIcons
                          name={"calendar-today"}
                          size={24}
                          color={"black"}
                        />
                        {/* <MaterialIcons name={data.userFavorite?"calendar":"bookmark-border"} size={24} color={data.userFavorite?"white":"black" } /> */}
                      </LinearGradient>
                    </View>
                    <Text style={styles.directionFont}>Schedule</Text>
                  </TouchableOpacity>
                </View>
              </View>
              {data.comments ? (
                <Text style={{ marginHorizontal: 20 }}>
                  <Text
                    style={{ fontSize: 12, fontWeight: "400", lineHeight: 24 }}
                  >
                    {!description && data.comments.length > 100
                      ? data.comments.substring(0, 100) + "... "
                      : data.comments}
                  </Text>
                  {!description && data.comments.length > 100 ? (
                    <Text
                      onPress={() => {
                        setDescription(true);
                      }}
                      style={{
                        color: "#8A6F0F",
                        textDecorationLine: "underline",
                        fontSize: 12,
                      }}
                    >
                      View More
                    </Text>
                  ) : null}
                  {description && data.comments.length > 100 ? (
                    <Text
                      onPress={() => {
                        setDescription(false);
                      }}
                      style={{
                        color: "#8A6F0F",
                        textDecorationLine: "underline",
                        fontSize: 12,
                      }}
                    >
                      {" "}
                      View Less
                    </Text>
                  ) : null}
                </Text>
              ) : null}
            </View>
            {/* general info */}

            {/* Happy hour */}
            <View
              style={{
                backgroundColor: "#FFFFFF",
                paddingHorizontal: 20,
                paddingTop: 21,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "600" }}>
                Happy Hour Schedule
                {(data.hh[0] && data.hh[0]["bar_patio_only"] === true
                  ? " (bar patio only)"
                  : "") + "\n"}
              </Text>

              <OpenNow />
              <TouchableOpacity
                style={{
                  borderRadius: 20,
                  borderWidth: 1,
                  alignItems: "center",
                  height: 46,
                  justifyContent: "center",
                  marginTop: 14,
                }}
                onPress={async () => {
                  await WebBrowser.openBrowserAsync(
                    "https://forms.gle/XeHJMsVFQaXNqZUe6"
                  );
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Icon.Edit3 width={18} height={18} color={"black"} />
                  <Text style={{ fontSize: 14, fontWeight: "700" }}>
                    {" "}
                    Update Happy Hour Info
                  </Text>
                </View>
              </TouchableOpacity>

              {/* <View style={styles.row}>
            {week.map((day, index) => {
              return (
                <View
                  key={index}
                  style={[
                    styles.circleContainer,
                    data.days[days[index]].time.length > 0 ? styles.hh : null,
                  ]}
                >
                  <Text style={styles.circle}>{day}</Text>
                </View>
              );
            })}
          </View>
          <Text style={styles.time}>
            {data.days[moment().format("dddd")].time.length > 0
              ? "Today: " + data.days[moment().format("dddd")].time
              : "No happy hours today"}
          </Text> */}

              <Modal
                animationType="fade"
                transparent={true}
                visible={modal}
                onRequestClose={() => {
                  isModal(!modal);
                }}
              >
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "rgba(0,0,0,0.5)",
                  }}
                  onPress={() => {
                    isModal(false);
                  }}
                >
                  <TouchableOpacity style={styles.modal} activeOpacity={1}>
                    <TouchableOpacity
                      style={{
                        position: "absolute",
                        right: "5%",
                        top: "4%",
                        zIndex: 17,
                      }}
                      onPress={() => {
                        isModal(false);
                      }}
                    >
                      <Icon.X color={"black"} />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: "600",
                        marginBottom: 5,
                      }}
                    >
                      Happy Hour Schedule
                    </Text>
                    <View
                      style={{
                        marginBottom: 15,
                        backgroundColor: "#EAEAEA",
                        height: 29,
                        flex: 1,
                        justifyContent: "center",
                        width: 170,
                        alignItems: "center",
                        borderRadius: 5,
                      }}
                    >
                      {data.updatedAt ? (
                        <Text style={{ fontSize: 12, color: "#767676" }}>
                          Last updated: {data.updatedAt.substring(0, 10)}
                        </Text>
                      ) : null}
                    </View>
                    {Object.entries(data.days).map((time, index) => {
                      return (
                        <View
                          key={index}
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginVertical: 6,
                          }}
                        >
                          <Text
                            style={
                              index !== moment().isoWeekday() - 1
                                ? { fontSize: 16, fontWeight: "normal" }
                                : { fontSize: 16, fontWeight: "600" }
                            }
                          >
                            {time[0]}
                          </Text>
                          {time[1].time.length > 0 ? (
                            <Text
                              style={
                                index !== moment().isoWeekday() - 1
                                  ? { fontSize: 16, fontWeight: "normal" }
                                  : { fontSize: 16, fontWeight: "600" }
                              }
                            >
                              {time[1].time}
                            </Text>
                          ) : (
                            <Text>None</Text>
                          )}
                        </View>
                      );
                    })}
                  </TouchableOpacity>
                </TouchableOpacity>
              </Modal>
            </View>

            <Divider
              orientation="horizontal"
              width={4}
              style={[
                styles.divider,
                { marginHorizontal: "-10%", marginTop: 20 },
              ]}
              color={"#EAEAEA"}
            />

            {/* Deals */}
            <View style={styles.card}>
              <View style={[styles.row, { justifyContent: "space-between" }]}>
                <View style={{ width: "67%" }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "600",
                    }}
                  >
                    Happy Hour Deals{"\n"}
                  </Text>
                </View>
              </View>
              {data.hhResult.length > 0 &&
              data.hhResult[0].infos[0].items.length > 0 ? (
                <>
                  {(!more
                    ? data.hhResult[0].infos[0].items.slice(0, 4)
                    : data.hhResult[0].infos[0].items
                  ).map((deal, i) => {
                    return (
                      <View key={i}>
                        <View style={{ flexDirection: "row" }}>
                          <View
                            style={{
                              width: "64%",
                              flexDirection: "row",
                            }}
                          >
                            <Image
                              source={img[deal.type]}
                              style={{
                                width: 24,
                                height: 24,
                                marginRight: 20,
                              }}
                              contentFit="contain"
                            />
                            <Text
                              style={{
                                fontSize: 14,
                                fontWeight: "400",
                                alignSelf: "center",
                              }}
                            >
                              {deal.name}
                            </Text>
                          </View>
                          <View style={{ position: "absolute", right: 76 }}>
                            <Text
                              style={{
                                textDecorationLine: "line-through",
                                fontSize: 12,
                              }}
                            >
                              {deal.regular_price
                                ? "$" + deal.regular_price
                                : "n/a"}
                            </Text>
                          </View>
                          <View
                            style={{ width: "36%", alignItems: "flex-end" }}
                          >
                            <Text style={{ fontSize: 14, fontWeight: "700" }}>
                              Now ${deal.discounted_price}
                            </Text>
                          </View>
                        </View>
                        {i < data.days["Thursday"].deal.length - 1 ? (
                          <Divider
                            orientation="horizontal"
                            width={1}
                            style={styles.divider}
                            color={"#EDEDED"}
                          />
                        ) : null}
                      </View>
                    );
                  })}
                  {!more &&
                  data.hhResult.length > 0 &&
                  data.hhResult[0].infos[0].items.length > 4 ? (
                    <TouchableOpacity
                      onPress={() => {
                        setMore(true);
                      }}
                      style={{ flexDirection: "row", justifyContent: "center" }}
                    >
                      <Icon.ArrowDown color={"black"} width={16} height={16} />
                      <Text> view all</Text>
                    </TouchableOpacity>
                  ) : null}
                </>
              ) : data.days[moment().format("dddd")].time.length > 0 ? (
                <Text>Happy hour menu not available</Text>
              ) : (
                <Text>No HH deals today</Text>
              )}
            </View>
            <Divider
              orientation="horizontal"
              width={4}
              style={[
                styles.divider,
                { marginHorizontal: "-10%", marginTop: 20 },
              ]}
              color={"#EAEAEA"}
            />

            {/* Daily Specials */}
            <View style={[styles.card, { marginBottom: -20 }]}>
              <View
                style={[
                  styles.row,
                  { justifyContent: "space-between", marginBottom: 26 },
                ]}
              >
                <View
                  style={{ width: "50%", flex: 1, justifyContent: "center" }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "600" }}>
                    Special Offers
                  </Text>
                </View>

                <Dropdown
                  style={[
                    {
                      width: 133,
                      borderRadius: 20,
                      borderWidth: 1.5,
                      borderColor: "#D3D3D3",
                      alignItems: "center",
                      paddingHorizontal: 10,
                      justifyContent: "center",
                      paddingLeft: 21,
                    },
                    isFocus && { borderColor: "#FFD029" },
                  ]}
                  placeholderStyle={{ fontSize: 12, fontWeight: "500" }}
                  selectedTextStyle={{ fontSize: 12, fontWeight: "500" }}
                  inputSearchStyle={{ fontSize: 12, fontWeight: "500" }}
                  data={dayInWeek}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={value}
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setValue(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>
              {data.dsResult && data.dsResult.length > 0 ? (
                <TabView value={value} onChange={setIndex}>
                  {data.dsResult[0].dayInfo.map((today, ind) => {
                    return (
                      <TabView.Item key={ind} style={styles.offerCard}>
                        <View>
                          {today.start_time ? (
                            <Text
                              style={{
                                fontSize: 12,
                                fontWeight: "600",
                                marginBottom: 17,
                              }}
                            >
                              Hours: {today.start_time} - {today.end_time}
                            </Text>
                          ) : null}
                          {today.menus.length == 0 ? (
                            <Text>No Daily Special Deals Today</Text>
                          ) : (
                            today.menus.map((deal, i) => {
                              return (
                                <View key={i} style={styles.row}>
                                  <View
                                    style={{
                                      width: "80%",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <Image
                                      source={img[deal.type]}
                                      style={{
                                        width: 20,
                                        height: 20,
                                      }}
                                      contentFit="contain"
                                    />
                                    <Text> {deal.name}</Text>
                                  </View>

                                  <View style={{ width: "17%" }}>
                                    <Text
                                      style={[
                                        { textAlign: "center" },
                                        styles.dealText,
                                      ]}
                                    >
                                      ${deal.discounted_price}
                                    </Text>
                                  </View>
                                </View>
                              );
                            })
                          )}
                        </View>
                      </TabView.Item>
                    );
                  })}
                </TabView>
              ) : (
                <>
                  <Text>No Daily Special Deals This Week{"\n\n"}</Text>
                </>
              )}
            </View>
            <View
              style={{
                height: 8,
                position: "absolute",
                width: width,
                bottom: 0,
                backgroundColor: "#F5E3A3",
              }}
            />
          </View>
          <View style={styles.card}>
            <View style={{ width: "67%" }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "600",
                  marginTop: 10,
                }}
              >
                Recent Acticity{"\n"}
              </Text>
            </View>
            {data.reviewResult &&
              data.reviewResult.map((review, i) => {
                return (
                  <View key={i} style={{ marginBottom: 20 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginBottom:10
                      }}
                    >
                      <View style={{ flexDirection: "row" }}>
                        <Avatar
                          rounded
                          source={{
                            uri: ".",
                          }}
                          size={34}
                          title={review.firstName[0] + review.lastName[0]}
                        />
                        <View
                          style={{ flexDirection: "column", marginLeft: 12 }}
                        >
                          <Text style={{ fontSize: 12, fontWeight: 600 }}>
                            {review.firstName + " " + review.lastName}
                          </Text>
                          <Text
                            style={{
                              color: "#989898",
                              fontSize: 10,
                              fontWeight: 600,
                            }}
                          >
                            {review.date}
                          </Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <Rating
                          startingValue={review.rating}
                          imageSize={20}
                          readonly={true}
                        />
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 16,
                            marginLeft: 7,
                          }}
                        >
                          {review.rating.toFixed(1)}
                        </Text>
                      </View>
                    </View>
                    <ScrollView
                      horizontal={true}
                      style={{ flexDirection: "row", marginBottom: 5 }}
                      contentContainerStyle={{ flexGrow: 1 }}
                    >
                      {review.photo
                        ? review.photo.map((item, i) => {
                            return (
                              <Pressable key={i}>
                                <Image
                                  source={{
                                    uri:
                                      "https://tpsi-review-photos.s3.amazonaws.com/" +
                                      item.id +
                                      ".png",
                                  }}
                                  style={{
                                    width: 80,
                                    height: 80,
                                    marginHorizontal: 2,
                                  }}
                                />
                              </Pressable>
                            );
                          })
                        : null}
                    </ScrollView>
                    <Text style={{ fontSize: 10 }}>{review.content}</Text>
                    <Text style={{ fontSize: 10 }}>
                      <Text style={{ fontWeight: "900" }}>Favorites: </Text>{" "}
                      {review.dish &&
                        review.dish.map((input, i) => {
                          return (
                            <Text style={{ fontSize: 10 }} key={i}>
                              {i != review.dish.length - 1
                                ? input + ", "
                                : input}
                            </Text>
                          );
                        })}
                    </Text>
                  </View>
                );
              })}
          </View>
          <TouchableOpacity
            style={styles.back}
            onPress={() => {
              navigation.navigate("Home");
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                alignItems: "center",
                backgroundColor: "white",
                borderRadius: 100,
                width: 32,
                height: 32,
                justifyContent: "center",
              }}
            >
              <Icon.ArrowLeft color={"black"} width={25} height={25} />
            </View>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <InstagramLoader />
      )}
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
  circleContainer: {
    width: 25,
    height: 25,
    borderRadius: 100,
    alignItems: "center",
    marginRight: 6,
    marginLeft: -3,
    marginTop: -5,
    marginBottom: 5,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    textAlign: "center",
    display: "flex",
  },

  circle: {
    color: "#808021",
    fontWeight: "bold",
  },
  hh: {
    backgroundColor: "#FFB300",
  },
  card: {
    marginVertical: 10,
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    overflow: "hidden",
  },
  divider: {
    borderColor: "black",
    marginVertical: "3%",
  },
  text: {
    fontSize: 20,
    fontWeight: "700",
    paddingBottom: 10,
  },
  times: {
    fontSize: 18,
    fontWeight: "bold",
  },
  back: {
    position: "absolute",
    left: 20,
    top: Constants.statusBarHeight,
  },
  time: {
    fontSize: 12,
    height: height * 0.02,
    color: "#4D4D4D",
  },
  column: {
    flexDirection: "column",
  },
  dealText: {
    fontWeight: "600",
  },
  directionIcon: {
    height: 50,
    width: 50,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFD029",
    shadowColor: "rgb(196, 138, 0)",
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5,
  },
  modal: {
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    width: width,
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  directionFont: {
    fontWeight: "500",
    fontSize: 12,
    marginTop: 5,
  },
  offerCard: {
    backgroundColor: "#FDF8E8",
    width: width - 40,
    borderRadius: 15,
    paddingVertical: 22,
    paddingHorizontal: 27,
    marginBottom: 53,
  },
});
