import {
  Text,
  StyleSheet,
  View,
  Animated,
  Dimensions,
  Image,
  ActivityIndicator,
  Button,
  FlatList,
  Keyboard,
  TextInput,
  TouchableOpacity,
  Platform,
} from "react-native";
import { MarkerOpen } from "../../Component/MarkerOpen";
import { MarkerDefault } from "../../Component/MarkerDefault";
import Constants from "expo-constants";
import ModalFilter from "../../Component/ModalFilter";
import * as Icon from "react-native-feather";
import { Divider } from "react-native-elements";
import moment from "moment/moment";
import React, { useEffect, useState, useRef } from "react";
var FormData = require("form-data");
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from "react-native-maps";
import { Marker } from "react-native-maps";
const { width, height } = Dimensions.get("window");
import axios from "axios";
import { Searchbar } from "../../Component/SearchBar";
import { MarkerSelectOpen } from "../../Component/MarkerSelect";
import { MarkerSelectDefault } from "../../Component/MarkerSelectDefault";
import UserLoc from "../../Component/UserLoc";
const image = require("../../Image/store.jpg");
const latitudeDelta = 0.0122;
import { useSelector } from "react-redux";
const longitudeDelta = 0.0081;

const CARD_WIDTH = width - 40;

const openNow = (data) => {
  if (data.days[moment().format("dddd")].time.length > 0) {
    for (let i = 0; i < data.days[moment().format("dddd")].time.length; i++) {
      let start = data.days[moment().format("dddd")].time[i].split(" - ")[0];
      let end = data.days[moment().format("dddd")].time[i].split(" - ")[1];
      if (start.length == 5 && start.length > end.length) {
        if (
          moment().format("HH:mm") >= start 
        ) {
          return true;
        }else if(
          moment().format("HH:mm") < "0" + end){return true}
      }
      if(start.length<5){
        start='0'+start
      }
      if(end.length<5){
        end='0'+end
      }
      if (moment().format("HH:mm") >= start && moment().format("HH:mm") < end) {
        return true;
      }
    }
  }
  return false;
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
        schedule[item]["deal"] = schedule[item]["deal"].concat(
          hh[0].infos[i].items
        );
      });
    }
  }

  return schedule;
};

export default MapScreen = ({ navigation }) => {
  const [region, setRegion] = useState(null);
  const [refresh, setrefresh] = useState(false);
  const [data, setData] = useState([]);
  const [searchVal, setsearch] = useState("");
  const [indicator, setIndicator] = useState(true);
  const [open, setopen] = useState(false);
  const [modal, setmodal] = useState(false);
  let mapAnimation = new Animated.Value(0);
  const [mapIndex, setInd] = useState(0);
  const _map = useRef(null);
  const [toUser, setToUser] = useState(true)
  const [loc, setLoc] = useState();
  const user = useSelector((state) => state.user);
  const removeFav = async (id) => {
    var formdata = new FormData();

    formdata.append("username", user.email);
    formdata.append("storeID", id);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    await fetch(
      "https://data.tpsi.io/api/v1/stores/removeStoreToUserFavorite",
      requestOptions
    )
      .then((res) => {
        if (res) {
          setFilteredData((stores) => {
            return stores.map((store) => {
              return store._id == id
                ? { ...store, userFavorite: false }
                : store;
            });
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  const addToFav = async (id) => {
    var formdata = new FormData();
    formdata.append("username", user.email);
    formdata.append("storeID", id);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };

    await fetch(
      "https://data.tpsi.io/api/v1/stores/addStoreToUserFavorite",
      requestOptions
    )
      .then((res) => {
        if (res) {
          setFilteredData((stores) => {
            return stores.map((store) => {
              return store._id == id ? { ...store, userFavorite: true } : store;
            });
          });
        }
      })
      .catch((error) => console.log("error", error));
  };

  const MapCard = React.memo((props) => {
    const data = props.store;

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Detail", { store: data });
        }}
      >
        <View style={styles.card}>
          <TouchableOpacity
            style={{ position: "absolute", left: 9, top: 9, zIndex: 17 }}
            onPress={
              user.email
                ? () => {
                    !data.userFavorite
                      ? addToFav(data._id)
                      : removeFav(data._id);
                  }
                : () => {
                    navigation.navigate("Saved");
                  }
            }
          >
            <Icon.Heart
              width={27}
              height={32}
              fill={data.userFavorite ? "#FFD029" : "white"}
              stroke={"#5C4A0A"}
              strokeWidth={1}
            />
          </TouchableOpacity>
          {/* <Image
            source={
              data.photoResult[0] && data.photoResult[0]["photos"][0]
                ? {
                    uri:
                      "https://spring-boot-repo-tpsi.s3.amazonaws.com/" +
                      data.photoResult[0]._id +
                      "_" +
                      data.photoResult[0]["photos"][0].id,
                  }
                : image
            }
            style={styles.cardImage}
          /> */}
          <Image
            source={
              data.photoResult[0] && data.photoResult[0]["photos"][0]
                ? {
                    uri:
                      "https://spring-boot-repo-tpsi.s3.amazonaws.com/" +
                      data.photoResult[0]._id +
                      "_" +
                      data.photoResult[0]["photos"][0].id,
                  }
                : image
            }
            style={styles.cardImage}
          />



          
          <View style={styles.textContent}>
            <Text numberOfLines={2} style={styles.cardtitle}>
              {data.name}
            </Text>
            {data.days[moment().format("dddd")].time.length > 0 ? (
              <>
                <Text
                  style={{
                    color: "#999999",
                    fontWeight: "500",
                    fontSize: 12,
                    marginTop: 8,
                  }}
                >
                  <Text>Today: </Text>
                  {openNow(data) ? (
                    <Text style={{ color: "#008515", fontWeight: "700" }}>
                      Live Now
                    </Text>
                  ) : (
                    <Text style={{ color: "red", fontWeight: "700" }}>
                      Unavailable Now
                    </Text>
                  )}
                </Text>
                <Text style={{ fontWeight: "600", fontSize: 12 }}>
                  {data.days[moment().format("dddd")].time.toString()}
                </Text>
              </>
            ) : (
              <Text
                style={{
                  color: "#999999",
                  fontWeight: "500",
                  fontSize: 12,
                  marginTop: 8,
                }}
              >
                No happy hours today
              </Text>
            )}
            {/* off */}
            <View
              style={{
                position: "absolute",
                display: data.off ? "flex" : "none",
                bottom: 10,
                left: 8,
                zIndex: 7,
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  backgroundColor: "#FFE68D",

                  width: 64,
                  height: 22,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 8,
                }}
              >
                <Text style={{ fontSize: 12, fontWeight: "600" }}>
                  {data.off ? data.off.toFixed(0) + "% off" : null}
                </Text>
              </View>
              <View
                style={{
                  height: 22,
                  alignItems: "center",
                  justifyContent: "center",
                  marginLeft: 8,
                }}
              >
                <Text
                  style={{
                    color: "#989898",
                    fontSize: 10,
                    fontWeight: "500",
                  }}
                >
                  of usual price
                </Text>
              </View>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 11,
              }}
            >
              <View style={styles.rating}>
                <Image
                  style={{
                    width: 11,
                    height: 11,
                    alignSelf: "flex-start",
                  }}
                  source={require("../../Image/G.png")}
                />
                <Text
                  style={[
                    styles.cuisine,
                    { fontWeight: "600", marginBottom: 12 },
                  ]}
                >
                  {data.rating + " • "}
                </Text>
              </View>
              <Text style={styles.cuisine}>
                {data.cuisine}
                {data.price ? " • " + "$".repeat(+data.price) : null}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  });
  mapStyle = [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "transit",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    { elementType: "geometry", stylers: [{ color: "#242F3E" }] },
    {
      elementType: "labels.text.stroke",
      stylers: [{ color: "#242F3E" }],
    },
    { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [{ color: "#D59563" }],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [{ color: "#263C3F" }],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [{ color: "#6B9A76" }],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [{ color: "#38414E" }],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [{ color: "#212A37" }],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [{ color: "#9CA5B3" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#746855" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [{ color: "#1F2835" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [{ color: "#F3D19C" }],
    },
    {
      featureType: "transit",
      elementType: "labels.icon",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#17263C" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [{ color: "#515C6D" }],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [{ color: "#17263C" }],
    },
    {
      featureType: "road.highway",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    }, //turns off highway labels
    {
      featureType: "road.arterial",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    }, //turns off arterial roads labels
    {
      featureType: "road.local",
      elementType: "labels",
      stylers: [{ visibility: "on" }],
    }, //turns off local roads labels
  ];
  const [filtered, setFiltered] = useState(0)
  const [filteredData, setFilteredData] = useState();
  const [searched, setsearched] = useState();
  const filterVal = {
    sortby: ["distance", "price", "rating"],
    discount: {
      low: 0,
      high: 100,
    },
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
    sortBy: null,
  };

  const [filter, setFilter] = useState(filterVal);
  const [message, setMessage] = useState(null);
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

  const search = async () => {
    setrefresh(false);
    setIndicator(true);
    var req = new FormData();
    req.append("lat", region.latitude);
    if (user.email) {
      req.append("username", user.email);
    }
    req.append("lng", region.longitude);
    req.append("latDelta", region.latitudeDelta);
    req.append("lngDelta", region.longitudeDelta);
    console.log(region)

    await axios({
      method: "post",
      url: "https://data.tpsi.io/api/v1/stores/getNearByPhone",
      headers: {},
      data: req,
    })
      .then((response) =>
        response.data.map((store) => ({
          name: store.name,
          rating: store.rating,
          cuisine: `${store.cuisine}`,
          hours: store.hours,
          latitude: store.latitude,
          longitude: store.longitude,
          location: store.location,
          photoResult: store.photoResult,
          hh: store.hhResult,
          price: store.price,
          comments: store.comments,
          website: store.website,
          number: store.number,
          off: findDeal(store.hhResult),
          items: validateItem(store.hhResult),
          days: validatehh(store.hhResult),
          ...store,
        }))
      )
      .then((stores) => {
        setData(stores);
        console.log(stores)
        setFilteredData(stores);
        setIndicator(false);
        _map.current.animateToRegion(
          {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
          },
          1000
        );
        _scrollView.current?.scrollToIndex({ index: 0, animated: true });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setMessage("Please grant location permissions to use TPSI service.");
      if (status !== "granted") {
        console.log("Please grant location permissions");
        setMessage("Please grant location permissions to use TPSI service.");
        return;
      } else {
        setMessage(null);
        await Location.watchPositionAsync(
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
    
        setLoc(currentLocation.coords);
      }

      var req = new FormData();
      req.append("lat", currentLocation.coords.latitude);
      req.append("lng", currentLocation.coords.longitude);
      if (user.email) {
        req.append("username", user.email);
      }
      // req.append("lat", 40.730824);
      // req.append("lng", -73.99733);
      req.append("latDelta", latitudeDelta);
      req.append("lngDelta", longitudeDelta);

      await axios({
        method: "post",
        url: "https://data.tpsi.io/api/v1/stores/getNearByPhone",
        headers: {},
        data: req,
      })
        .then((response) => {
          try {
            return response.data.map((store) => ({
              name: store.name,
              rating: store.rating,
              cuisine: `${store.cuisine}`,
              hours: store.hours,
              latitude: store.latitude,
              longitude: store.longitude,
              location: store.location,
              price: store.price,
              photoResult: store.photoResult,
              hh: store.hhResult,
              website: store.website,
              comments: store.comments,
              number: store.number,
              off: findDeal(store.hhResult),
              items: validateItem(store.hhResult),
              days: validatehh(store.hhResult),
              ...store,
            }));
          } catch (e) {
            console.log(e);
          }
        })
        .then((stores) => {
          setData(stores);
          setFilteredData(stores);
          setIndicator(false);
          _map.current.animateToRegion(
            {
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
              // latitude: 40.730824,
              // longitude: -73.99733,
              latitudeDelta: latitudeDelta,
              longitudeDelta: longitudeDelta,
            },
            1000
          );
          setrefresh(false);
        })
        .catch((error) => console.log(error));
      return () => locationSubscription.remove();
    };

    getPermissions();
  }, []);

  const [percent, hidePercent] = useState(false);
  useEffect(() => {
    mapAnimation.addListener(({ value }) => {
      if (
        value / (CARD_WIDTH + 8) >= Filtering(filteredData).length ||
        value / (CARD_WIDTH + 8) < 0
      ) {
        return;
      }
      setInd(value / (CARD_WIDTH + 8));
      // console.log(value / (CARD_WIDTH + 8));
      _map.current.animateToRegion(
        {
          latitude:
            Filtering(filteredData)[Math.round(value / (CARD_WIDTH + 8))]
              .latitude,
          longitude:
            Filtering(filteredData)[Math.round(value / (CARD_WIDTH + 8))]
              .longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        },
        400
      );
      setrefresh(false);
    });
  });

  const onMarkerPress = (mapEventData, index) => {
    setInd(index);

    // _map.current.animateToRegion(
    //   {
    //     latitude: filteredData[markerID]["latitude"],
    //     longitude: filteredData[markerID]["longitude"],
    //     latitudeDelta: latitudeDelta,
    //     longitudeDelta: longitudeDelta,
    //   },
    //   350
    // );
    // setRegion({
    //   latitude: filteredData[index]["latitude"],
    //   longitude: filteredData[index]["longitude"],
    //   latitudeDelta: latitudeDelta,
    //   longitudeDelta: longitudeDelta,
    // });
    _scrollView.current?.scrollToIndex({ index: index, animated: true });
  };
  const returnToUser = () => {
    setToUser(true)
    _map.current.animateToRegion(
      {
        latitude: loc.latitude,
        longitude: loc.longitude,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
      },
      500
    );
  };

  const _scrollView = React.useRef(null);

  const onRegionChange = async (region, gesture) => {
    if(parseFloat(loc.latitude.toFixed(8))!==parseFloat(region.latitude.toFixed(8)) && parseFloat(loc.longitude.toFixed(8))!==parseFloat(region.longitude.toFixed(8))){
      setToUser(false)
    }

    setRegion(region);
    // console.log(region);
    // console.log(loc)
    setrefresh(true);
    return;
  };

  const searchResult = async () => {
    if (searchVal === "") {
      return;
    }

    setIndicator(true);
    await axios({
      method: "get",
      url:
        "https://data.tpsi.io/api/v1/stores/searchWithDistance?search=" +
        searchVal +
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
          latitude: store.latitude,
          longitude: store.longitude,
          location: store.location,
          hh: store.hhResult,
          comments: store.comments,
          off: findDeal(store.hhResult),
          items: validateItem(store.hhResult),
          days: validatehh(store.hhResult),
          ...store,
        }))
      )
      .then((data) => {
        if (data.length < 1) {
          setIndicator(false);
          setFilteredData(null);
          return;
        }
        setFilteredData(data);
        // _scrollView.current?.scrollToIndex({ index: 0, animated: true });
        // setsearch("");
        setIndicator(false);
        _map.current.animateToRegion(
          {
            latitude: data[0].latitude,
            longitude: data[0].longitude,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
          },
          500
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const Filtering = (data) => {

    return data.filter((store) => {
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
                  if (filter.items[key] && !store.items.includes(key)) {
                    return;
                  }
                }
            
              }

              return store;
            }
          }
        }
        return;
      }
    });
  };

  return (
    <View
      style={styles.container}
      onTouchStart={() => {
        Keyboard.dismiss();
      }}
    >
   
      <ModalFilter
        filter={filter}
        filterVal={filterVal}
        setFilter={setFilter}
        setFilteredData={setFilteredData}
        setFiltered={setFiltered}
        data={data}
        open={open}
        setopen={setopen}
        modal={modal}
        setmodal={setmodal}
        screen={"map"}
      />
      <View style={styles.searchArea}>
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
              value={searchVal}
              onChangeText={setsearch}
              placeholder={" search for places/drinks"}
              returnKeyType="search"
              onSubmitEditing={() => {
                searchResult();
              }}
              style={{ flex: 1, height: 42 }}
            />

            {searchVal === "" ? null : (
              <TouchableOpacity
                onPress={() => {
                  setsearch(""), setFilteredData(data);
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
              borderColor: filtered===0?"white":'#FFD029',
              backgroundColor: "white",
              shadowColor: "#C58A00",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.4,
              shadowRadius: 2,
            }}
          >
            {filtered===0?null:<View style={{position:'absolute',top:-3,right:-3, borderRadius:25,backgroundColor:'#FFD029',height:17,width:17,alignItems:'center',justifyContent:'center'}}><Text style={{color:'white',fontSize:10,fontWeight:'600'}}>{filtered}</Text></View>}

            <Icon.Sliders
              style={{ transform: [{ rotate: "90deg" }] }}
              color={"grey"}
              height={20}
            />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <TouchableOpacity
            style={[
              styles.filter,
              {
                backgroundColor: percent ? "#FFD029" : "white",
                width: 98,
                height: 32,
              },
            ]}
            onPress={() => hidePercent(!percent)}
          >
            <Text style={{ fontSize: 12 }}>
              {percent ? "✓ " : null}Discount %
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ position: "absolute", top: "40%", zIndex: 17 }}>
        {!message ? null : (
          <>
            <ActivityIndicator
              size="large"
              color="black"
              animating={indicator}
            />
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {message}
            </Text>
          </>
        )}
        {!indicator ? null : (
          <>
            <ActivityIndicator
              size="large"
              color="black"
              animating={indicator}
            />
          </>
        )}
      </View>

      {/* <Text>{userLocation?(userLocation['coords']['latitude']+ ', '+userLocation['coords']['longitude']):"Waiting"}</Text> */}
      <MapView
        ref={_map}
        provider={
          Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
        }
        initialRegion={{
          latitude: 40.7295,
          longitude: -73.9965,
          latitudeDelta: 0.1,
          longitudeDelta: 0.2,
        }}
        customMapStyle={mapStyle}
        style={styles.map}
        onRegionChangeComplete={(region, details) =>
          onRegionChange(region, details)
        }
      >
        {loc ? (
          <Marker
            coordinate={{
              latitude: loc.latitude,
              longitude: loc.longitude,
            }}
          >
            <UserLoc />
          </Marker>
        ) : null}
        {filteredData
          ? Filtering(filteredData).map((marker, index) => {
              {
                /* const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          }; */
              }

              return (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                  }}
                  onPress={(e) => onMarkerPress(e, index)}
                >
                  {mapIndex === index ? (
                    openNow(marker) ? (
                      <MarkerSelectOpen />
                    ) : (
                      <MarkerSelectDefault />
                    )
                  ) : openNow(marker) ? (
                    <MarkerOpen />
                  ) : (
                    <MarkerDefault />
                  )}
                  <View
                    style={{
                      bottom: mapIndex === index ? 42 : 26,
                      zIndex: 7,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: mapIndex === index ? 16 : 10,
                      }}
                    >
                      {percent
                        ? marker.off
                          ? marker.off.toFixed(0) + "%"
                          : ""
                        : marker.rating}
                    </Text>
                  </View>
                  {/* </View> */}
                </Marker>
              );
            })
          : null}
      </MapView>
      <View
        style={{
          position: "absolute",
          alignItems: "center",
          bottom: 172,
          right: 20,
        }}
      >
                <TouchableOpacity
            onPress={() => {
              returnToUser();
            }}
          >
        <View
          style={{
            alignSelf: "center",
            width: 43,
            height: 43,
            borderRadius: 100,
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            display: "flex",
            borderWidth: 1.5,
            borderColor: "#D3D3D3",
            backgroundColor: "white",
            shadowColor: "#C58A00",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.4,
            shadowRadius: 2,
            transform: [{ rotate: "270deg" }],
          }}
        >

            <Icon.Navigation
              style={{ transform: [{ rotate: "90deg" }] }}
              color={toUser?"#1B72E8":"grey"}
              fill={toUser?'#1B72E8':null}
              height={20}
            />

        </View>
        </TouchableOpacity>
      </View>

      {searchVal ? (
        <View
          style={{
            position: "absolute",
            alignItems: "center",
            bottom: 172,
          }}
        >
          <TouchableOpacity
            style={{
              width: 98,
              height: 32,
              borderWidth: 1.5,
              borderColor: "#d2d2d2",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              alignSelf: "center",
              backgroundColor: "#ffffff33",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.8,
              shadowRadius: 1,
              elevation: 5,
            }}
            onPress={() => {
              setsearch(""), setFilteredData(data);
            }}
          >
            <Text style={{ fontSize: 10, color: "#ffffff", fontWeight: "600" }}>
              Clear search
            </Text>
          </TouchableOpacity>
        </View>
      ) : refresh ? (
        <View
          style={{
            position: "absolute",
            alignItems: "center",
            bottom: 172,
          }}
        >
          <TouchableOpacity
            style={{
              width: 130,
              height: 40,
              borderWidth: 0.5,
              borderColor: "#d2d2d2",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              alignSelf: "center",
              backgroundColor: "white",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.8,
              shadowRadius: 1,
              elevation: 5,
            }}
            onPress={search}
          >
            <Text style={{ fontSize: 13, color: "#1B72E8", fontWeight: "600" }}>
              Search this area
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {filteredData ? (
        <Animated.FlatList
          ref={_scrollView}
          horizontal
          scrollEventThrottle={1}
          initialScrollIndex={0}
          onMomentumScrollEnd={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: {
                    x: mapAnimation,
                  },
                },
              },
            ],
            { useNativeDriver: true }
          )}
          // onScrollToIndexFailed={(error) => {
          //   console.log(error.index,Filtering(filteredData)[error.index].name)
          //   _scrollView.current?.scrollToOffset({
          //     offset: (CARD_WIDTH+8) * error.index,
          //     animated: true,
          //   });
          //   //  _scrollView.current?.scrollToItem({
          //   //   item: <MapCard store={Filtering(filteredData)[error.index]} key={error.index} />,
          //   //   animated: true,
          //   // });

          //   setTimeout(() => {
          //     if ( _scrollView !== null) {
          //       _scrollView.current?.scrollToIndex({
          //         index: error.index,
          //         animated: true,
          //       });
          //     }
          //   }, 150);
          // }}
          disableIntervalMomentum={true}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 8}
          style={styles.scrollView}
          data={Filtering(filteredData)}
          getItemLayout={(_, index) => ({
            length: CARD_WIDTH + 8, //  WIDTH + (MARGIN_HORIZONTAL * 2)
            offset: (CARD_WIDTH + 8) * index, //  ( WIDTH + (MARGIN_HORIZONTAL*2) ) * (index)
            index,
          })}
          renderItem={({ item, ind }) => <MapCard store={item} key={ind} />}
        />
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },

  marker: {
    width: 30,
    height: 30,
  },
  cuisine: {
    fontWeight: "500",
    fontSize: 10,
  },

  scrollView: {
    position: "absolute",
    bottom: "0%",
    left: 0,
    right: 0,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  card: {
    // padding: 10,
    elevation: 5,
    backgroundColor: "#FFF",
    flexDirection: "row",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: 152,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    width: 156,
    height: "100%",
    resizeMode: "cover",
  },
  textContent: {
    flex: 2,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  cardtitle: {
    fontSize: 18,
    // marginTop: 5,
    fontWeight: "700",
    marginRight: 25,
    fontWeight: "bold",
  },
  cardDescription: {
    fontSize: 12,
    color: "#444",
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50,
  },
  marker: {
    width: 20,
    height: 20,
  },

  rating: {
    flexDirection: "row",
    display: "flex",
    flexWrap: "wrap",
  },
  comment: {
    backgroundColor: "#FFE68D",
    marginTop: "5%",
    padding: "4%",
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 1,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 12,
  },
  searchArea: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    shadowColor: "rgb(129, 129, 129)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    position: "absolute",
    zIndex: 99,
  },
  divider: {
    marginHorizontal: 6,
    borderColor: "grey",
  },
  input: {
    height: 42,
    flexGrow: 1,
    borderWidth: 1,
    borderColor: "white",
    flex: 1,
    paddingHorizontal: 10,
    borderRadius: 20,
    display: "flex",
    marginLeft: 20,
    marginRight: 14,
    fontSize: 12,
    backgroundColor: "#FFFEFA",
    shadowColor: "#C58A00",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  percent: {
    backgroundColor: "#FFE68D",
    padding: "4%",
    width: 45,
    height: 20,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 1,
  },
  filter: {
    paddingHorizontal: 10,
    paddingVertical: 7,
    marginLeft: 20,
    height: 32,
    marginRight: "-2%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    alignSelf: "flex-start",
    shadowColor: "#C58A00",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    elevation: 5,
    marginBottom: "1%",
  },
});
