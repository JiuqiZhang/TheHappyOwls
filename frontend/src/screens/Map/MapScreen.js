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
import React, { useEffect, useState, useRef } from "react";
var FormData = require("form-data");
import * as Location from "expo-location";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Marker } from "react-native-maps";
const { width, height } = Dimensions.get("window");
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Icon } from "react-native-elements";
const CARD_HEIGHT = 220;
import axios from "axios";
import { Searchbar } from "../../Component/SearchBar";
const image = require("../../Image/store.jpg");
const latitudeDelta = 0.0122;
const longitudeDelta = 0.0081;

const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
export default MapScreen = ({}) => {
  const [userLocation, setLocation] = useState(null);
  const [refresh, setrefresh] = useState(false);
  const [data, setData] = useState([]);
  let mapAnimation = new Animated.Value(0);
  let mapIndex = 0;
  const _map = useRef(null);
  mapStyle = [
    {
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.land_parcel",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "administrative.neighborhood",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ];

  useEffect(() => {
    _map.current.animateToRegion(
      {
        latitude: 40.7295,
        longitude: -73.9965,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta,
      },
      1000
    );
    // mapAnimation.addListener(({ value }) => {
    //   let index = Math.floor(value / CARD_WIDTH + 0.3); // animate 30% away from landing on the next item
    //   if (index >= data.length) {
    //     index = data.length - 1;
    //   }
    //   if (index <= 0) {
    //     index = 0;
    //   }
    //   // console.log(data[index])

    //   clearTimeout(regionTimeout);

    //   const regionTimeout = setTimeout(() => {
    //     if( mapIndex !== index ) {
    //       mapIndex = index;
    //       const { coordinate } =  {
    //         coordinate: {
    //           latitude: data[mapIndex]['latitude'],
    //           longitude:data[mapIndex]['longitude'],
    //         },}

    //         // console.log('animated',mapIndex)
    //       _map.current.animateToRegion(
    //         {
    //           ...coordinate,
    //           latitudeDelta: latitudeDelta,
    //           longitudeDelta: longitudeDelta,
    //         },
    //         350
    //       );
    //     }
    //   }, 20);
    // });
  }, [data]);

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

      axios({
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
            // hours: store.hours,
            latitude: store.latitude,
            longitude: store.longitude,
          }))
        )
        .then((stores) => {
          setData(stores);
          console.log(stores.length);
        })
        .catch((error) => console.log(error));

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        coords: {
          accuracy: 5,
          altitude: 0,
          altitudeAccuracy: -1,
          heading: -1,
          latitude: 40.7295,
          longitude: 73.9965,
          speed: -1,
        },
      });
      console.log("Location:");
      console.log(currentLocation);
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
    let x = markerID * CARD_WIDTH + markerID * 20;
    if (Platform.OS === "ios") {
      x = x - SPACING_FOR_CARD_INSET;
    }

    _scrollView.current.scrollTo({ x: x, y: 0, animated: true });
  };

  const _scrollView = React.useRef(null);

  const onRegionChange = async (region, details) => {
    if (details.isGesture === true) {
      console.log(region);
      setrefresh(true);
      return;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Searchbar />

      {/* <Text>{userLocation?(userLocation['coords']['latitude']+ ', '+userLocation['coords']['longitude']):"Waiting"}</Text> */}
      <MapView
        ref={_map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 40.7295,
          longitude: -73.9965,
          latitudeDelta: latitudeDelta,
          longitudeDelta: latitudeDelta,
        }}
        // customMapStyle={mapStyle}
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
        />
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
              pinColor={mapIndex === index ? "res" : "white"}
              onPress={(e) => onMarkerPress(e)}
            />
          );
        })}
      </MapView>
      {refresh ? (
        <View
          style={{ position: "absolute", alignItems:"center", bottom: height/2+160 }}
        >
          <TouchableOpacity
            style={{
              paddingHorizontal:10,
              paddingVertical:7,
              alignItems: "center",
    justifyContent: "center",
              borderRadius: 20,
              alignSelf:'center',
              backgroundColor: "white",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.8,
              shadowRadius: 1,
              elevation: 5,
            }}
            onPress={() => {
              setrefresh(false);
            }}
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
          }
        }}
      >
        {data
          ? data.map((data, index) => (
              <View style={styles.card} key={index}>
                <Image
                  source={image}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
                <View style={styles.textContent}>
                  <Text style={styles.cardtitle}>{data.name}</Text>

                  <Text numberOfLines={1} style={styles.cardDescription}>
                    {data.cuisine}
                  </Text>
                  <View style={styles.button}></View>
                </View>
              </View>
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
    elevation: 2,
    backgroundColor: "#FFF",
    flexDirection: "row",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    height: 150,
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
    fontSize: 12,
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
  // button: {
  //   alignItems: "center",

  // },
  signIn: {
    width: "100%",
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
  textSign: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
