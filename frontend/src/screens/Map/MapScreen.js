import {
  Text,
  StyleSheet,
  View,
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  Button,
  TouchableOpacity,
} from "react-native";
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

const CARD_WIDTH = width * 0.92;
const SPACING_FOR_CARD_INSET = width * 0.08;

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
  let mapAnimation = new Animated.Value(0);
  const [mapIndex, setInd] = useState();
  const _map = useRef(null);
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
  ]


  const findDeal = (hh)=>{
    var res= 1
    if (hh.length>0){
      for (i=0; i<hh[0].infos.length; i++){
        hh[0].infos[i].items.map((item)=>{
          if(item.regular_price!==0){
            let deal = item.discounted_price/item.regular_price
            if (deal<res){
              res = deal
            }
          }

        })
      }

    }else{return null}
    if (res!==1){
      return (1-res )*100
    }else{return null}
  }

  const search = async () => {
    setrefresh(false);
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
          off:findDeal(store.hhResult),
          days:validatehh(store.hhResult),
          ...store
        }))
      )
      .then((stores) => {
        setData(stores);
        _map.current.animateToRegion(
          {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta,
          },
          1000
        );
        _scrollView.current?.scrollTo({ x: 0, animated: true });
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }

      var req = new FormData();
      req.append("lat", "40.7295");
      req.append("lng", "-73.9965");
      req.append("latDelta", latitudeDelta);
      req.append("lngDelta", longitudeDelta);

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
            price: store.price,
            photoResult: store.photoResult,
            hh: store.hhResult,
            website: store.website,
            comments: store.comments,
            number: store.number,
            off:findDeal(store.hhResult),
            days:validatehh(store.hhResult),
            ...store
          }))
        )
        .then((stores) => {
          setData(stores);
          _map.current.animateToRegion(
            {
              latitude: 40.7295,
              longitude: -73.9965,
              latitudeDelta: latitudeDelta,
              longitudeDelta: longitudeDelta,
            },
            1000
          );
        })
        .catch((error) => console.log(error));

      // let currentLocation = await Location.getCurrentPositionAsync({});
      // console.log("Location:");
      // console.log(currentLocation);
    };

    getPermissions();
  }, []);

  const interpolations = data.map((marker, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.5, 1],
      extrapolate: "clamp",
    });

    return { scale };
  });

  const onMarkerPress = (mapEventData) => {
    const markerID = mapEventData._targetInst.return.key;
    setInd(mapEventData._targetInst.return.key);
    const { coordinate } = {
      coordinate: {
        latitude: data[markerID]["latitude"],
        longitude: data[markerID]["longitude"],
      },
    };

    _map.current.animateToRegion(
      {
        ...coordinate,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
      },
      350
    );
    setRegion({
      latitude: data[markerID]["latitude"],
      longitude: data[markerID]["longitude"],
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta,
    });
    setrefresh(true);
    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
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
          off:findDeal(store.hhResult),
          ...store
        }))
      )
      .then((data) => {
        setData(data);
        _scrollView.current?.scrollTo({ x: 0, animated: true });
        setsearch("");
        setIndicator(false);
        _map.current.animateToRegion(
          {
            latitude: 40.7295,
            longitude: -73.9965,
            latitudeDelta: 0.07,
            longitudeDelta: 0.1,
          },
          1000
        );
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar
        value={searchVal}
        onchange={setsearch}
        setResult={searchResult}
      />

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
        <Marker
          coordinate={{
            latitude: 40.7295,
            longitude: -73.9965,
          }}
        ></Marker>
        {data.map((marker, index) => {
          const scaleStyle = {
            transform: [
              {
                scale: interpolations[index].scale,
              },
            ],
          };

          return (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              onPress={(e) => onMarkerPress(e)}
            >
              <View style={[styles.percent,!marker.off?{backgroundColor:'grey',width:40}:null]}>
                <Text style={{ fontWeight: "bold" }}>{marker.off?(marker.off).toFixed(0)+'%':'N/A'}</Text>
              </View>
            </Marker>
          );
        })}
      </MapView>
      {refresh ? (
        <View
          style={{
            position: "absolute",
            alignItems: "center",
            bottom: height / 2 + 160,
          }}
        >
          <TouchableOpacity
            style={{
              paddingHorizontal: 10,
              paddingVertical: 7,
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
            <Text>Search this area</Text>
          </TouchableOpacity>
        </View>
      ) : null}

      <Animated.ScrollView
        ref={_scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        style={styles.scrollView}
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === "android" ? SPACING_FOR_CARD_INSET : 0,
        }}
        onScroll={(e) => {
          // console.log(e.nativeEvent.contentOffset.x);
          if (data !== []) {
            let index = Math.floor(
              e.nativeEvent.contentOffset.x / CARD_WIDTH + 0.3
            ); // animate 30% away from landing on the next item
            console.log(index);
            // setInd(index);
          }
        }}
      >
        {data
          ? data.map((data, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate("Detail", { store: data });
                }}
              >
                <View style={styles.card}>
                  <View
                    style={[
                      { position: "absolute", zIndex: 7, margin: "1%" ,display:data.off?'flex':'none'},
                      styles.percent,
                    ]}
                  >
                    <Text style={{ fontWeight: "bold" }}>{data.off?(data.off).toFixed(0)+'%':null}</Text>
                    <Text style={{ fontWeight: "bold" }}>{data.distance}</Text>
                  </View>
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
                    resizeMode="cover"
                  />
                  <View style={styles.textContent}>
                    <Text numberOfLines={3} style={styles.cardtitle}>{data.name}</Text>

                    <Text numberOfLines={1} style={styles.cardDescription}>
                      {data.cuisine}
                    </Text>
                    <View style={styles.rating}>
                      <Image
                        style={{ width: 20, height: 15, alignSelf: "center" }}
                        source={require("../../Image/G.png")}
                      />
                      <Text style={styles.hh}>{data.rating}</Text>
                    </View>
                    {data.comments ? (
                      <View style={styles.comment}>
                        <Text numberOfLines={1} style={styles.hh}>
                          {data.comments}
                        </Text>
                      </View>
                    ) : null}
                    <View
                      style={{ position: "absolute", bottom: "9%", left: "7%" }}
                    >
                      {data.hh[0] &&
                      data.hh[0].infos[0].days.includes(
                        moment().format("dddd")
                      ) ? (
                        <>
                          <Text style={styles.hh}>Today:</Text>
                          <Text style={styles.hh}>
                            {data.hh[0].infos[0].start_time +
                              " - " +
                              data.hh[0].infos[0].end_time}
                          </Text>
                        </>
                      ) : (
                        <Text style={styles.hh}>No happy hours today</Text>
                      )}
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          : null}
      </Animated.ScrollView>
    </SafeAreaView>
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

  scrollView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 10,
  },
  card: {
    // padding: 10,
    elevation: 5,
    backgroundColor: "#FFF",
    flexDirection: "row",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: 160,
    width: CARD_WIDTH,
    overflow: "hidden",
  },
  cardImage: {
    flex: 3,
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  textContent: {
    flex: 2,
    padding: 10,
  },
  cardtitle: {
    fontSize: 13,
    // marginTop: 5,
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
  hh: {
    fontSize: 12,
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
});
