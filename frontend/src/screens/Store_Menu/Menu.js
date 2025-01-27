import React, { useEffect, useState, useRef } from "react";
import ModalFilter from "../../Component/ModalFilter";
import { Modal } from "react-native";
import Constants from "expo-constants";
import * as WebBrowser from "expo-web-browser";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import {
  StyleSheet,
  SafeAreaView,
  PixelRatio,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  View,
  FlatList,
  Button,
  Keyboard,
  Text,
  TextInput,
  RefreshControl,
  Dimensions,
} from "react-native";
import { setToken, setStore } from "../../redux/actions";
import { Image } from "expo-image";
import { useIsFocused } from "@react-navigation/native";
const { width } = Dimensions.get("window");
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import * as Location from "expo-location";
import { LinearGradient } from "expo-linear-gradient";
import * as Icon from "react-native-feather";
import { Divider } from "react-native-elements";
import StoreCard from "../../Component/StoreCard";
import axios from "axios";
import moment from "moment/moment";
const statusBarHeight = Constants.statusBarHeight;
const dp = PixelRatio.get();
import {
  FontAwesome5,
  Ionicons,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
} from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setReview } from "../../redux/actions";
import DailyCard from "../../Component/DailyCard";
export default MenuScreen = ({ navigation, route }) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [msg, setmsg] = useState({
    open: new Date(),
    location: "location got at",
    makeRequestAt: "make request at",
    response: "got response at",
  });

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      getPerm();
      setRefreshing(false);
    }, 2000);
  }, []);
  const [indicator, setIndicator] = useState(true);
  const [data, setData] = useState();
  const [search, setsearch] = useState("");
  const [modal, setmodal] = useState(false);
  const [result, setResult] = useState("");
  const scrollRef = useRef();
  const [filteredData, setFilteredData] = useState();
  const [loc, setLoc] = useState();
  const [open, setopen] = useState(false);
  const [messasge, setMessage] = useState(null);
  const [theTag, settheTag] = useState();

  const taglist = {
    "Cheap Drinks": (
      <MaterialIcons
        name="local-drink"
        size={25}
        color={theTag === "Cheap Drinks" ? "black" : "grey"}
      />
    ),
    "Extended HH": (
      <Entypo
        name="hour-glass"
        size={25}
        color={theTag === "Extended HH" ? "black" : "grey"}
      />
    ),
    "Cheap Snacks": (
      <FontAwesome
        name="cutlery"
        size={25}
        color={theTag === "Cheap Snacks" ? "black" : "grey"}
      />
    ),
    "$1 Oysters": (
      <FontAwesome5
        name="money-bill-alt"
        size={25}
        color={theTag === "$1 Oyster" ? "black" : "grey"}
      />
    ),
    Rooftop: (
      <MaterialCommunityIcons
        name="balcony"
        size={25}
        color={theTag === "Rooftop" ? "black" : "grey"}
      />
    ),
    Ambiance: (
      <Entypo
        name="mask"
        size={25}
        color={theTag === "Ambiance" ? "black" : "grey"}
      />
    ),
    "Lively Crowd": (
      <Entypo
        name="flash"
        size={25}
        color={theTag === "Lively Crowd" ? "black" : "grey"}
      />
    ),
    "Espresso Martini": (
      <Entypo
        name="drink"
        size={25}
        color={theTag === "Espresso Martini" ? "black" : "grey"}
      />
    ),
    "Live Music": (
      <Entypo
        name="modern-mic"
        size={25}
        color={theTag === "Live Music" ? "black" : "grey"}
      />
    ),
    "Amazing Views": (
      <MaterialCommunityIcons
        name="weather-night"
        size={25}
        color={theTag === "Amazing Views" ? "black" : "grey"}
      />
    ),
    "Date Night": (
      <FontAwesome5
        name="heartbeat"
        size={25}
        color={theTag === "Date night" ? "black" : "grey"}
      />
    ),
    "Wine Lovers": (
      <MaterialCommunityIcons
        name="fruit-grapes"
        size={25}
        color={theTag === "Wine Lovers" ? "black" : "grey"}
      />
    ),
    "Craft Beers": (
      <Ionicons
        name="pint"
        size={25}
        color={theTag === "Craft Beers" ? "black" : "grey"}
      />
    ),
    Aperol: (
      <FontAwesome5
        name="wine-glass-alt"
        size={25}
        color={theTag === "Aperol" ? "black" : "grey"}
      />
    ),
    Margaritas: (
      <Ionicons
        name="wine"
        size={25}
        color={theTag === "Margarita" ? "black" : "grey"}
      />
    ),
    "Local Drinks": (
      <FontAwesome5
        name="map-signs"
        size={25}
        color={theTag === "Local Drinks" ? "black" : "grey"}
      />
    ),
    "Dog-friendly": (
      <FontAwesome5
        name="dog"
        size={25}
        color={theTag === "Dog-friendly" ? "black" : "grey"}
      />
    ),
    "AYCD!": (
      <MaterialCommunityIcons
        name="party-popper"
        size={25}
        color={theTag === "AYCD!" ? "black" : "grey"}
      />
    ),
    "Mixology Master": (
      <Entypo
        name="lab-flask"
        size={25}
        color={theTag === "Mixology Master" ? "black" : "grey"}
      />
    ),

    "TPSI Offers": (
      <FontAwesome5
        name="fire-alt"
        size={25}
        color={theTag === "TPSI offers" ? "black" : "grey"}
      />
    ),

    Trivia: (
      <MaterialCommunityIcons
        name="brain"
        size={25}
        color={theTag === "Trivia" ? "black" : "grey"}
      />
    ),
  };

  const filterVal = {
    sortby: ["distance", "price", "rating"],
    hhdays: {
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
      Sunday: false,
    },
    custom: null,
    items: {
      Beer: false,
      Wine: false,
      Cocktail: false,
      Food: false,
    },
    price: {
      1: false,
      2: false,
      3: false,
      4: false,
    },
    cuisine: [
      "American",
      "BBQ",
      "Bar",
      "Bistro",
      "Brazilian",
      "Chinese",
      "Cocktail Bar",
      "Cuban",
      "French",
      "Gastropub",
      "Gay Bar",
      "Greek",
      "Indian",
      "Irish Pub",
      "Italian",
      "Japanese",
      "Korean",
      "Latin American",
      "Mediterranean",
      "Mexican",
      "New American",
      "Spanish",
      "Sports Bar",
      "Thai",
      "Wine Bar",
    ],
    selectedCuisine: null,
    sortBy: "distance",
  };
  const user = useSelector((state) => state.user);
  const [reviewWindow, setReviewWindow] = useState(!user.review);
  const [filter, setFilter] = useState(filterVal);
  const [filtered, setFiltered] = useState(0);
  // const [filter, ]

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
  const getPerm = async () => {
    setMessage(
      "Please grant location permissions to use TPSI service.\nOr only searching can be used"
    );
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setIndicator(false);
      setMessage(
        "Please grant location permissions to use TPSI service.\nOr only searching can be used"
      );
      return;
    } else {
      setMessage(null);
      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Lowest,
          timeInterval: 1000,
          distanceInterval: 1,
        },
        (location) => {
          setLoc({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        }
      );
    }

    var currentLocation = await Location.getLastKnownPositionAsync();

    if (currentLocation) {
      setLoc(currentLocation.coords);
    } else {
      currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Lowest,
      });
      // console.log("Location:");
      // console.log(currentLocation);
      setLoc(currentLocation.coords);
    }

    setmsg((prevState) => ({
      ...prevState,
      location: (new Date() - prevState.open) / 1000,
    }));
    await axios({
      method: "post",
      url:
        "https://data.tpsi.io/api/v1/stores/getTodayDailySpecial?lat=" +
        currentLocation.coords.latitude +
        "&lng=" +
        currentLocation.coords.longitude,
    })
      .then((response) => {
        return response.data.map((store) => ({
          name: store.name,
          rating: store.rating,
          cuisine: `${store.cuisine}`,
          hours: store.hours,
          photoResult: store.photoResult,
          latitude: store.latitude,
          longitude: store.longitude,
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
        }));
      })

      .then((stores) => {
        setSpecials(stores);
      })

      .catch((e) => {
        console.log(e, "failed");
      });

    var req = new FormData();
    req.append("lat", currentLocation.coords.latitude);
    req.append("lng", currentLocation.coords.longitude);
    if (user.email) {
      req.append("username", user.email);
    }
    // req.append("latDelta", 0.0122);
    // req.append("lngDelta", 0.0081);

    var config = {
      method: "post",
      url: "https://data.tpsi.io/api/v1/stores/getAllStoresWithDistance",
      headers: {},
      data: req,
    };

    var requestOptions = {
      method: "POST",
      body: req,
      redirect: "follow",
    };
    setmsg((prevState) => ({
      ...prevState,
      makeRequestAt: (new Date() - prevState.open) / 1000,
    }));

    await axios(config)
      .then((response) => {
        setmsg((prevState) => ({
          ...prevState,
          response: (new Date() - prevState.open) / 1000,
        }));

        return response.data.map((store) => ({
          name: store.name,
          rating: store.rating,
          cuisine: `${store.cuisine}`,
          hours: store.hours,
          photoResult: store.photoResult,
          latitude: store.latitude,
          longitude: store.longitude,
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
        }));
      })
      .then((stores) => {
        // console.log(stores);
        setData(stores);
        setFilteredData(stores);
        setIndicator(false);
      })
      .catch((error) => console.log(error));
  };
  async function getDevicetoken() {
    const token = await Notifications.getDevicePushTokenAsync();
    return token;
  }
  // useEffect(()=>{console.log(filter.selectedCuisine,typeof(filter.selectedCuisine))},[filter])

  useEffect(() => {
    if (route.params.store !== "no") {
      let store = route.params.store;
      navigation.setParams({
        store: "no",
      });

      navigation.navigate("Detail", {
        store: store,
      });
    }
    getDevicetoken().then((token) => {
      dispatch(setToken(token.data));
      axios({
        method: "post",
        url:
          "https://data.tpsi.io/api/v1/users/?username=" +
          user.email +
          "&firstname=" +
          user.firstName +
          "&lastname=" +
          user.lastName +
          "&deviceToken=" +
          token.data,
      })
        .then((res) => {})
        .catch((e) => {
          console.log(e);
        });
    });

    getPerm();
  }, [newloc]);
  const [newloc, setNew] = useState(null);
  const [specials, setSpecials] = useState(null);
  const Filtering = (data) => {
    let res = data;

    if (theTag) {
      res = res.filter((data) => {
        try {
          if (data.tagResult.find((tag) => tag.name == theTag)) {
            return data;
          }
        } catch (e) {
          console.log(e, data.name);
        }
      });
    }
    if (filter.sortBy) {
      if (filter.sortBy == "rating") {
        res = res.sort((a, b) => {
          return b[filter.sortBy] - a[filter.sortBy];
        });
      } else {
        res = res.sort((a, b) => {
          return a[filter.sortBy] - b[filter.sortBy];
        });
      }
    }

    return res.filter((store) => {
      if (!open) {
        for (day in filter.hhdays) {
          if (filter.hhdays[day] === true && store.days[day].time.length <= 0) {
            return;
          }
        }

        if (
          JSON.stringify(filter.price) !== JSON.stringify(filterVal.price) &&
          filter.price[store.price] !== true
        ) {
          return;
        }

        if (
          store.cuisine[0] !== filter.selectedCuisine &&
          filter.selectedCuisine !== null
        ) {
          return;
        }
        if (Object.values(filter.items).indexOf(true) > -1) {
          for (const key of Object.keys(filter.items)) {
            if (filter.items[key] && !store.items.includes(key)) {
              return;
            }
          }
        }

        if (filter.custom !== null) {
          if (store.days[moment().format("dddd")].time.length > 0) {
            for (
              let i = 0;
              i < store.days[moment().format("dddd")].time.length;
              i++
            ) {
              let start =
                store.days[moment().format("dddd")].time[i].split(" - ")[0];
              let end =
                store.days[moment().format("dddd")].time[i].split(" - ")[1];

                if (start.length == 5 && start.length > end.length) {
                  if(filter.custom>=start){
                    return store
                  }else if (filter.custom< "0" + end){
                    return store
                  }

                }

              if (start.length < 5) {
                start = "0" + start;
              }
              if (end.length < 5) {
                end = "0" + end;
              }
              

              if (start <= filter.custom && filter.custom < end) {
                return store;
              }
              else{
                return
              }
            }
          }
        } else {
          return store;
        }
      } else {
        if (store.days[moment().format("dddd")].time.length > 0) {
          for (
            let i = 0;
            i < store.days[moment().format("dddd")].time.length;
            i++
          ) {
            let start =
              store.days[moment().format("dddd")].time[i].split(" - ")[0];
            let end =
              store.days[moment().format("dddd")].time[i].split(" - ")[1];
            if (start.length == 5 && start.length > end.length) {
              for (day in filter.hhdays) {
                if (
                  filter.hhdays[day] === true &&
                  store.days[day].time.length <= 0
                ) {
                  return;
                }
              }
              if (
                JSON.stringify(filter.price) !==
                  JSON.stringify(filterVal.price) &&
                filter.price[store.price] !== true
              ) {
                return;
              }

              if (
                store.cuisine[0] !== filter.selectedCuisine &&
                filter.selectedCuisine !== null
              ) {
                return;
              }
              if (Object.values(filter.items).indexOf(true) > -1) {
                for (const key of Object.keys(filter.items)) {
                  if (filter.items[key] && !store.items.includes(key)) {
                    return;
                  }
                }
              }

             
                if(moment().format("HH:mm")>=start){
                  return store
                }
              
            
                if(moment().format("HH:mm") < "0" + end){
                  return store
                }
              
              else{return}
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
              for (day in filter.hhdays) {
                if (
                  filter.hhdays[day] === true &&
                  store.days[day].time.length <= 0
                ) {
                  return;
                }
              }
              if (
                JSON.stringify(filter.price) !==
                  JSON.stringify(filterVal.price) &&
                filter.price[store.price] !== true
              ) {
                return;
              }

              if (
                store.cuisine[0] !== filter.selectedCuisine &&
                filter.selectedCuisine !== null
              ) {
                return;
              }
              if (Object.values(filter.items).indexOf(true) > -1) {
                for (const key of Object.keys(filter.items)) {
                  if (filter.items[key] && store.items.includes(key)) {
                    return store;
                  }
                }
                return;
              }

              return store;
            }
          }
        }
        return;
      }
    });
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
  useEffect(() => {
    // scrollRef.current?.scrollTo({
    //   y: 0,
    //   animated: true,
    // });
  }, [open, filteredData]);

  const searchResult = async () => {
    if (search === "") {
      return;
    }

    setIndicator(true);
    if (loc) {
      await axios({
        method: "get",
        url:
          "https://data.tpsi.io/api/v1/stores/searchWithDistance?search=" +
          search +
          "&lat=" +
          loc.latitude +
          "&lng=" +
          loc.longitude +
          (user.email ? "&username=" + user.email : ""),
        headers: {},
      })
        .then((response) =>
          response.data.map((store) => ({
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
          }))
        )
        .then((data) => {
          setResult(data);
          if (scrollRef.current) {
            scrollRef.current.scrollTo({
              y: 0,
              animated: true,
            });
          }

          setIndicator(false);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      await axios({
        method: "get",
        url: "https://data.tpsi.io/api/v1/stores/Search?search=" + search,
        headers: {},
      })
        .then((response) =>
          response.data.map((store) => ({
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
          }))
        )
        .then((data) => {
          setResult(data);

          if (scrollRef.current) {
            scrollRef.current.scrollTo({
              y: 0,
              animated: true,
            });
          }
          setIndicator(false);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  // const DailySection = () =>{

  //   return(
  //     <Text>{null}
  //     </Text>
  //   )
  // }
  return (
    <GestureHandlerRootView
      style={styles.container}
      onTouchStart={() => {
        Keyboard.dismiss();
      }}
    >
      <Modal visible={reviewWindow} transparent={true}>
        <TouchableOpacity
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.6)",
          }}
          onPress={() => setReviewWindow(false)}
        >
          <TouchableOpacity activeOpacity={1}>
            <Image
              source={require("../../Image/review.png")}
              style={{
                width: 353,
                height: 144,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  marginTop: 12,
                  marginBottom: 17,
                  fontSize: 12,
                  fontWeight: "bold",
                }}
              >
                Improve Your Happy Hour Experience! 🎉
              </Text>
              <Text style={{ fontSize: 12, width: 290 }}>
                Would you like to tell us what features are most important to
                you when searching for Happy Hour spots?
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  width: "100%",
                  marginTop: 8,
                }}
              >
                <TouchableOpacity
                  style={{
                    width: 83,
                    height: 21,
                    backgroundColor: "#FAF1D1",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                    borderWidth: 1,
                  }}
                  onPress={async () => {
                    await WebBrowser.openBrowserAsync(
                      "https://forms.gle/ia913aAd5T87WiNc6"
                    ).then(() => {
                      setReviewWindow(false);
                      dispatch(setReview(true));
                    });
                  }}
                >
                  <Text style={{ fontSize: 12 }}>sure thing!</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: 83,
                    height: 21,
                    backgroundColor: "#FAF1D1",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                    borderWidth: 1,
                  }}
                  onPress={() => {
                    setReviewWindow(false);
                    dispatch(setReview(true));
                  }}
                >
                  <Text style={{ fontSize: 12 }}>maybe not..</Text>
                </TouchableOpacity>
              </View>
            </Image>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
      <ModalFilter
        filter={filter}
        filterVal={filterVal}
        setFiltered={setFiltered}
        setFilter={setFilter}
        setFilteredData={setFilteredData}
        data={data}
        open={open}
        setopen={setopen}
        modal={modal}
        setmodal={setmodal}
      />
      <LinearGradient
        colors={["#F9EEC8", "#FFD029", "#D9AA04"]}
        start={{ x: -0.4, y: 0 }}
        end={{ x: 2.4, y: 2 }}
        style={styles.searchArea}
      >
        <View style={styles.inputContainer}>
          <View
            style={[
              {
                flexDirection: "row",
                alignItems: "center",
              },
              styles.input,
            ]}
          >
            <Icon.Search color={"grey"} style={{}} height={16} />
            <TextInput
              value={search}
              onChangeText={setsearch}
              placeholder=" search for places/drinks"
              returnKeyType="search"
              onSubmitEditing={() => {
                searchResult();
              }}
              style={{ height: 42, flex: 1 }}
            />
            {search === "" ? null : (
              <TouchableOpacity
                onPress={() => {
                  setsearch("");
                  setResult(null);
                }}
              >
                <Icon.X color={"grey"} height={16} />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            onPress={() => {
              setmodal(true);
            }}
            style={{
              alignSelf: "center",
              marginRight: 20,
              width: 42,
              height: 42,
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              display: "flex",
              borderWidth: 1.5,
              borderColor: filtered === 0 ? "white" : "black",
              backgroundColor: "white",
              shadowColor: "black",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.4,
              shadowRadius: 2,
            }}
          >
            {filtered === 0 ? null : (
              <View
                style={{
                  position: "absolute",
                  top: -3,
                  right: -3,
                  borderRadius: 25,
                  backgroundColor: "black",
                  height: 17,
                  width: 17,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 10, fontWeight: "600" }}
                >
                  {filtered}
                </Text>
              </View>
            )}
            <Icon.Sliders
              style={{ transform: [{ rotate: "90deg" }] }}
              color={filtered === 0 ? "grey" : "black"}
              height={20}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
      {/* <DailySection/> */}

      {/* testing info */}
      <View style={[styles.scrollView]} keyboardShouldPersistTaps="handled">
        <ScrollView
          style={{
            paddingTop: 17,
            paddingHorizontal: 14,
            backgroundColor: "#FFFEFA",
            shadowColor: "#C58A00",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 2,
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {Object.keys(taglist).map((tag, i) => {
            return (
              <TouchableOpacity
                key={tag}
                onPress={() => {
                  if (theTag == tag) {
                    settheTag(null);
                  } else {
                    settheTag(tag);
                    if (scrollRef.current) {
                      scrollRef.current.scrollTo({
                        y: 0,
                        animated: true,
                      });
                    }
                  }
                }}
                style={{
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginHorizontal: 10,
                  alignSelf: "center",
                  paddingBottom: 14,
                  borderBottomWidth: tag === theTag ? 4 : 0,
                  borderColor: "#C48A00",
                }}
              >
                {/* <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 60 / 2,
                    backgroundColor: "red",
                    position: "absolute",
                    top: 0,
                  }}
                /> */}
                {taglist[tag]}
                <Text
                  style={{
                    fontSize: 11,
                    marginTop: 6,
                    fontWeight: "500",
                    flexWrap: "wrap",
                    color: tag === theTag ? "black" : "grey",
                  }}
                >
                  {tag}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        <Divider orientation="horizontal" width={1} color={"#EDEDED"} />
        {/*Today's special!!!!!!!!!!!!!!!!!!!!!!!  */}

        {!indicator ? (
          !result ? (
            data ? (
              <FlatList
                ref={this.scrollRef}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
                ListHeaderComponent={
                  <View>
                    {JSON.stringify(filter) == JSON.stringify(filterVal) &&
                    !open &&
                    !theTag ? (
                      <>
                        {specials && !theTag ? (
                          <>
                            <Text
                              style={{
                                marginLeft: 20,
                                marginTop: 15,
                                marginBottom: 15,
                                fontSize: 18,
                                fontWeight: "600",
                              }}
                            >
                              Today's special
                            </Text>
                            <FlatList
                              data={specials}
                              style={{ paddingLeft: 20 }}
                              horizontal
                              showsHorizontalScrollIndicator={false}
                              renderItem={(item, ind) => (
                                <DailyCard
                                  store={item.item}
                                  key={ind}
                                  navigation={navigation}
                                />
                              )}
                            />
                          </>
                        ) : null}
                        {filteredData && Filtering(filteredData).length < 1 ? (
                          <Text>no store within the filtered scope</Text>
                        ) : null}
                        <Divider
                          orientation="horizontal"
                          width={1.5}
                          color={"#EDEDED"}
                        />
                        <Text
                          style={{
                            marginLeft: 20,
                            marginTop: 15,
                            fontSize: 19,
                            fontWeight: "600",
                          }}
                        >
                          All stores
                        </Text>
                      </>
                    ) : null}
                  </View>
                }
                contentContainerStyle={{ paddingBottom: 300 }}
                data={
                  JSON.stringify(filter) == JSON.stringify(filterVal) || !open
                    ? Filtering(data)
                    : filteredData
                    ? Filtering(filteredData)
                    : null
                }
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("Detail", {
                        store: item,
                        location: loc,
                      });
                      // navigation.navigate("Detail", { store: item,test:"123", change:filter === filterVal || !open ? ()=>setData:()=>setFilteredData});
                    }}
                  >
                    <StoreCard
                      key={item.name}
                      store={item}
                      navigation={navigation}
                      change={
                        filter === filterVal || !open
                          ? setData
                          : setFilteredData
                      }
                    />
                  </TouchableOpacity>
                )}
              />
            ) : (
              <>
                <ActivityIndicator
                  size="large"
                  color="grey"
                  style={{ top: "5%" }}
                  animating={indicator}
                />
              </>
            )
          ) : (
            <ScrollView
              style={{ width: "100%" }}
              contentContainerStyle={{ paddingBottom: 300 }}
              ref={this.scrollRef}
              keyboardShouldPersistTaps="handled"
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              {result == null || result.length == 0 ? (
                <>
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                      alignSelf: "center",
                      marginTop: "40%",
                    }}
                    source={require("../../Image/Cocktail.png")}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      alignSelf: "center",
                      marginTop: "5%",
                    }}
                  >
                    We didn't find a match.
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: "grey",
                      alignSelf: "center",
                      marginTop: "2%",
                    }}
                  >
                    Try search for something else instead.
                  </Text>
                </>
              ) : null}
              {Filtering(result).map((object, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    navigation.navigate("Detail", {
                      store: object,
                      location: loc,
                    });
                  }}
                >
                  <StoreCard
                    store={object}
                    navigation={navigation}
                    change={setResult}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          )
        ) : (
          <>
            <ActivityIndicator
              size="large"
              color="grey"
              style={{ top: "5%" }}
              animating={indicator}
            />
            <Text>{messasge}</Text>
          </>
        )}
      </View>
      <View style={styles.stickyButton}>
        {result ? (
          <Button
            title={"Clear search"}
            color="white"
            accessibilityLabel="Clear search"
            onPress={() => {
              setsearch("");
              setResult(null);
              // scrollRef.current?.scrollTo({
              //   y: 0,
              //   animated: true,
              // });
            }}
          />
        ) : null}
      </View>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },

  scrollView: {
    marginHorizontal: 20,
    width: "100%",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    paddingBottom: 12,
  },
  searchArea: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: statusBarHeight,
    backgroundColor: "#F9EEC8",
    paddingTop: 56,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  card: {
    // padding: 10,
    elevation: 5,
    backgroundColor: "#FFF",
    flexDirection: "row",
    borderRadius: 5,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    overflow: "hidden",
  },
  divider: {
    borderColor: "black",
    marginTop: "3%",
  },
  input: {
    height: 42,
    flexGrow: 1,
    borderWidth: 1,
    borderColor: "white",
    paddingHorizontal: 10,
    borderRadius: 20,
    display: "flex",
    marginRight: 14,
    marginLeft: 20,
    marginVertical: 10,
    backgroundColor: "#FFFEFA",
    shadowColor: "#C58A00",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  stickyButton: {
    position: "absolute",
    bottom: "2%",
    alignSelf: "center",
    minWidth: "25%",
    borderRadius: 10,
    backgroundColor: "black",
    opacity: 0.85,
  },
  Checkbox: {
    padding: "8%",
    paddingVertical: "1%",
  },
  price: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "22%",
    paddingVertical: "1%",
    borderColor: "black",
    borderRadius: 10,
    borderWidth: 1,
  },
  filter: {
    paddingHorizontal: 10,
    marginLeft: 16,
    marginRight: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    shadowColor: "#c58a00",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    marginBottom: "1%",
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
  row: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
});
