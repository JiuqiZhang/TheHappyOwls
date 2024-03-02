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
} from "react-native";

import { Svg, Path } from "react-native-svg";
import Constants from "expo-constants";
import ModalFilter from "../../Component/ModalFilter";
import * as Icon from "react-native-feather";
import { Divider } from "react-native-elements";
import moment from "moment/moment";
import React, { useEffect, useState, useRef } from "react";
var FormData = require("form-data");
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Marker } from "react-native-maps";
const { width, height } = Dimensions.get("window");
import axios from "axios";
import { Searchbar } from "../../Component/SearchBar";
const image = require("../../Image/store.jpg");
const latitudeDelta = 0.0122;
const longitudeDelta = 0.0081;

const CARD_WIDTH = width - 40;

const OpenNow = (prop) => {
  if (prop.bar.days[moment().format("dddd")].time.length > 0) {
    const start =
      prop.bar.days[moment().format("dddd")].time[0].split(" - ")[0];
    const end = prop.bar.days[moment().format("dddd")].time[0].split(" - ")[1];

    if (moment().format("HH:mm") > start && moment().format("HH:mm") < end) {
      return (
        <Text style={{ color: "#008515", fontWeight: 700 }}>Live Now</Text>
      );
    }
  }
  return <Text style={{ color: "red", fontWeight: 700 }}>Unavailable Now</Text>;
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
  const [mapIndex, setInd] = useState();
  const _map = useRef(null);
  const [loc, setLoc] = useState();

  const MapCard = React.memo((props) => {
    const data = props.store;

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Detail", { store: data });
        }}
      >
        <View style={styles.card}>
          <Image
            source={
              data.photoResult[0] && data.photoResult[0]["photos"][0]
                ? {
                    uri:
                      "http://spring-boot-repo-tpsi.s3.amazonaws.com/" +
                      data.photoResult[0]._id +
                      "_" +
                      data.photoResult[0]["photos"][0].id,
                  }
                : image
            }
            style={styles.cardImage}
          />
          <View style={styles.textContent}>
            <Icon.Bookmark
              height={22}
              fill={"#D3D3D3E5"}
              stroke={"white"}
              style={{ position: "absolute", right: 8, top: 6 }}
            />
            <Text numberOfLines={2} style={styles.cardtitle}>
              {data.name}
            </Text>
            {data.hh[0] &&
            data.hh[0].infos[0].days.includes(moment().format("dddd")) ? (
              <>
                <Text
                  style={{
                    color: "#999999",
                    fontWeight: 500,
                    fontSize: 12,
                    marginTop: 8,
                  }}
                >
                  <Text>Today:</Text>
                  <OpenNow bar={data} />
                </Text>
                <Text style={{ fontWeight: 600, fontSize: 12 }}>
                  {data.hh[0].infos[0].start_time +
                    " - " +
                    data.hh[0].infos[0].end_time}
                </Text>
              </>
            ) : (
              <Text
                style={{
                  color: "#999999",
                  fontWeight: 500,
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
                <Text style={{ fontSize: 12, fontWeight: 600 }}>
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
                    fontWeight: 500,
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

  const [filteredData, setFilteredData] = useState();

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
    req.append("lng", region.longitude);
    req.append("latDelta", region.latitudeDelta);
    req.append("lngDelta", region.longitudeDelta);

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
          days: validatehh(store.hhResult),
          ...store,
        }))
      )
      .then((stores) => {
        setData(stores);
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
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      } else {
        const locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.Highest,
            timeInterval: 1000,
            distanceInterval: 1,
          },
          (location) => {
            setLoc({
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            });
            console.log(
              "New location update: " +
                location.coords.latitude +
                ", " +
                location.coords.longitude
            );
          }
        );
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      console.log("Location:");
      console.log(currentLocation);
      setLoc(currentLocation.coords);

      var req = new FormData();
      // req.append("lat", currentLocation.coords.latitude);
      // req.append("lng", currentLocation.coords.longitude);
      req.append("lat", 40.730824);
      req.append("lng", -73.99733);
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
              // latitude: currentLocation.coords.latitude,
              // longitude: currentLocation.coords.longitude,
              latitude: 40.730824,
              longitude: -73.99733,
              latitudeDelta: latitudeDelta,
              longitudeDelta: longitudeDelta,
            },
            1000
          );
        })
        .catch((error) => console.log(error));
      return () => locationSubscription.remove();
    };

    getPermissions();
  }, []);

  const [percent, hidePercent] = useState(false);

  // const interpolations = data.map((marker, index) => {
  //   const inputRange = [
  //     (index - 1) * CARD_WIDTH,
  //     index * CARD_WIDTH,
  //     (index + 1) * CARD_WIDTH,
  //   ];

  //   const scale = mapAnimation.interpolate({
  //     inputRange,
  //     outputRange: [1, 1.5, 1],
  //     extrapolate: "clamp",
  //   });

  //   return { scale };
  // });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.index;
    console.log(markerID);
    //console.log(filteredData[markerID].name)
    setInd(markerID);

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
    //   latitude: filteredData[markerID]["latitude"],
    //   longitude: filteredData[markerID]["longitude"],
    //   latitudeDelta: latitudeDelta,
    //   longitudeDelta: longitudeDelta,
    // });
    setrefresh(true);
    let x = markerID * CARD_WIDTH + markerID * 16;
    console.log(Filtering(filteredData)[markerID].name);
    _scrollView.current?.scrollToIndex({ index: markerID, animated: true });
  };

  const _scrollView = React.useRef(null);

  const onRegionChange = async (region, details) => {
    if (details.isGesture === true) {
      setRegion(region);
      setrefresh(true);
      return;
    }
  };

  const searchResult = async () => {
    if (searchVal === "") {
      return;
    }
    var req = new FormData();
    req.append("search", search);
    setIndicator(true);

    await axios({
      method: "get",
      url: "https://data.tpsi.io/api/v1/stores/Search?search=" + searchVal,
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
          days: validatehh(store.hhResult),
          ...store,
        }))
      )
      .then((data) => {
        setData(data);
        setFilteredData(data);
        _scrollView.current?.scrollToIndex({ index: 0, animated: true });
        setsearch("");
        setIndicator(false);
        _map.current.animateToRegion(
          {
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          },
          1000
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
        for (level in filter.price) {
          if (
            !store.price ||
            (filter.price[level] === true && store.price !== level)
          ) {
            return;
          }
        }
        if (
          filter.selectedCuisine &&
          store.cuisine !== filter.selectedCuisine
        ) {
          return;
        }
        return store;
      } else {
        if (store.days[moment().format("dddd")].time.length > 0) {
          if (
            moment().format("HH:mm") >
              store.days[moment().format("dddd")].time[0].split(" - ")[0] &&
            moment().format("HH:mm") <
              store.days[moment().format("dddd")].time[0].split(" - ")[1]
          ) {
            for (day in filter.hhdays) {
              if (
                filter.hhdays[day] === true &&
                store.days[day].time.length <= 0
              ) {
                return;
              }
            }
            for (level in filter.price) {
              if (
                !store.price ||
                (filter.price[level] === true && store.price !== level)
              ) {
                return;
              }
            }
            if (
              filter.selectedCuisine &&
              store.cuisine !== filter.selectedCuisine
            ) {
              return;
            }
            return store;
          }
        }
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
        data={data}
        modal={modal}
        setmodal={setmodal}
        screen={"map"}
      />
      <View style={styles.searchArea}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={searchVal}
            onChangeText={setsearch}
            placeholder="  Search store name"
            returnKeyType="search"
            onSubmitEditing={() => {
              searchResult();
            }}
          />
          <View
            style={{
              alignSelf: "center",
              width: 42,
              height: 42,
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
              marginRight: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setmodal(true);
              }}
            >
              <Icon.Sliders color={"grey"} height={16} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flexDirection: "row", width: "100%" }}>
          <TouchableOpacity
            style={[
              styles.filter,
              { backgroundColor: open ? "#FFD029" : "white" },
            ]}
            onPress={() => setopen(!open)}
          >
            <Text>{open ? "✓ " : null}Open Now</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.filter,
              { backgroundColor: "#ffffffb2", width: 115, height: 32 },
            ]}
            onPress={() => hidePercent(!percent)}
          >
            <Text>
              <Text>rating</Text>
              <Text>%</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ position: "absolute", top: "40%", zIndex: 17 }}>
        {!indicator ? null : (
          <ActivityIndicator size="large" color="white" animating={indicator} />
        )}
      </View>

      {/* <Text>{userLocation?(userLocation['coords']['latitude']+ ', '+userLocation['coords']['longitude']):"Waiting"}</Text> */}
      <MapView
        ref={_map}
        provider={PROVIDER_GOOGLE}
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
          ></Marker>
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
                  onPress={(e) => onMarkerPress(e)}
                >
                  {/* <View
                    style={[
                      styles.percent,
                      !percent
                        ? marker.off && marker.off > 50
                          ? { zIndex: 7 }
                          : { width: 10, height: 10 }
                        : { width: 10, height: 10 },
                      index === mapIndex
                        ? { backgroundColor: "red", zIndex: 17 }
                        : null,
                    ]}
                  > */}
                  <Svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={27}
                    height={32}
                    fill="none"
                  >
                    <Path
                      fill="#F9EEC8"
                      stroke="#8D8D8D"
                      strokeWidth={1.5}
                      d="M13.5 1.25A12.75 12.75 0 0 1 26.25 14c0 5.205-3.986 10.865-12.3 17.1a.75.75 0 0 1-.9 0C4.736 24.865.75 19.205.75 14A12.75 12.75 0 0 1 13.5 1.25Z"
                    />
                  </Svg>
                  <View
                    style={{
                      bottom: 25,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: 10,
                        color: index === mapIndex ? "white" : null,
                      }}
                    >
                      {!percent
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

      {refresh ? (
        <View
          style={{
            position: "absolute",
            alignItems: "center",
            bottom: 172,
          }}
        >
          <TouchableOpacity
            style={{
              width: 77,
              height: 28,
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
            onPress={search}
          >
            <Text style={{ fontSize: 10, color: "#ffffff", fontWeight: 500 }}>
              Search again
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {filteredData ? (
        <FlatList
          ref={_scrollView}
          horizontal
          scrollEventThrottle={1}
          initialScrollIndex={0}
          onScrollToIndexFailed={(error) => {
            _scrollView.current?.scrollToOffset({
              offset: error.averageItemLength * error.index + error.index*8,
              animated: true,
            });
            setTimeout(() => {
              if ( _scrollView !== null) {
                _scrollView.current?.scrollToIndex({
                  index: error.index,
                  animated: true,
                });
              }
            }, 100);
          }}
          disableIntervalMomentum={true}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 16}
          style={styles.scrollView}
          data={Filtering(filteredData)}
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
    paddingLeft: 12,
  },
  card: {
    // padding: 10,
    elevation: 5,
    backgroundColor: "#FFF",
    flexDirection: "row",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 8,
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
    fontWeight: 700,
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
    marginHorizontal: 20,
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
    padding: 10,
    borderRadius: 20,
    display: "flex",
    marginLeft: 20,
    marginRight: 14,
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
