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
import { AntDesign} from '@expo/vector-icons';
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

const CARD_WIDTH = width * 0.8;
const SPACING_FOR_CARD_INSET = width * 0.1 - 10;
export default MapScreen = ({navigation}) => {
  const [region, setRegion] = useState(null);
  const [refresh, setrefresh] = useState(false);
  const [data, setData] = useState([]);
  const [searchVal, setsearch] = useState('')
  const [indicator, setIndicator] = useState(true)
  let mapAnimation = new Animated.Value(0);
  const [mapIndex, setInd] =useState();
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

  const search = async ()=>{
    setrefresh(false)
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
            location:store.location,
            photoResult:store.photoResult,
            hh:store.hhResult
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
          _scrollView.current?.scrollTo({x: 0,animated: true,
          })
        })
        .catch((error) => console.log(error));
  }



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
            location:store.location,
            photoResult:store.photoResult,
            hh:store.hhResult
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
    setInd(mapEventData._targetInst.return.key)
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

  const searchResult = async()=>{

    if (searchVal===''){
      return
    }
    var req = new FormData();
    req.append("search", search);
    setIndicator(true)
    

    await axios({
      method: "get",
      url: "https://data.tpsi.io/api/v1/stores/Search?search="+searchVal,
      headers: {},
    })
      .then((response) =>
        response.data.map((store) => ({
          name: store.name,
          rating: store.rating,
          cuisine:`${store.cuisine}`,
          hours: store.hours,
          photoResult:store.photoResult,
          latitude: store.latitude,
          longitude: store.longitude,
          location:store.location,
          hh:store.hhResult
        }
        ))

      )
      .then((data)=>{
        setData(data)
        _scrollView.current?.scrollTo({x: 0,animated: true,
        })
        setsearch('')
        setIndicator(false)
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
      .catch((e)=>{
        console.log(e)
      })
    }


  return (
    <SafeAreaView style={styles.container}>
      <Searchbar value={searchVal} onchange={setsearch} setResult={searchResult} />

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

         
        >

</Marker>
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

              onPress={(e) => onMarkerPress(e)}>
             
           <Text style={{fontSize:8}}>{marker.name}</Text>
</Marker>
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
            setInd(index)
          }
        }}
      >
        {data
          ? data.map((data, index) => (
             <TouchableOpacity key={index}  onPress={() => {
                  navigation.navigate("Detail", { store: data });
                }}>
             <View style={styles.card} >
                <Image
                  source={data.photoResult[0]?{uri:'http://spring-boot-repo-tpsi.s3.amazonaws.com/'+data.photoResult[0]._id+'_'+data.photoResult[0]['photos'][0].id}:image}
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
