import React, { useEffect, useState } from "react";
import ModalFilter from "../../Component/ModalFilter";
import Constants from "expo-constants";
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
  Dimensions,
} from "react-native";
import { useSelector } from "react-redux";
import * as Location from "expo-location";
import { LinearGradient } from "expo-linear-gradient";
import * as Icon from "react-native-feather";
import { Divider } from "react-native-elements";
import StoreCard from "../../Component/StoreCard";
import axios from "axios";
import { useRef } from "react";
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
export default MenuScreen = ({ navigation }) => {
  const [msg, setmsg] = useState({
    open: new Date(),
    location: "location got at",
    makeRequestAt: "make request at",
    response: "got response at",
  });
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
    "$1 Oysters": (
      <FontAwesome5
        name="money-bill-alt"
        size={25}
        color={theTag === "$1 Oyster" ? "black" : "grey"}
      />
    ),
    Aperol: (
      <FontAwesome5
        name="wine-glass-alt"
        size={25}
        color={theTag === "Aperol" ? "black" : "grey"}
      />
    ),
    Margarita: (
      <Ionicons
        name="wine"
        size={25}
        color={theTag === "Margarita" ? "black" : "grey"}
      />
    ),
    "Espresso Martini": (
      <Entypo
        name="drink"
        size={25}
        color={theTag === "Espresso Martini" ? "black" : "grey"}
      />
    ),
    "AYCD!": (
      <MaterialCommunityIcons
        name="party-popper"
        size={25}
        color={theTag === "AYCD!" ? "black" : "grey"}
      />
    ),
    "Craft Beers": (
      <Ionicons
        name="pint"
        size={25}
        color={theTag === "Craft Beers" ? "black" : "grey"}
      />
    ),
    "Wine Lovers": (
      <MaterialCommunityIcons
        name="fruit-grapes"
        size={25}
        color={theTag === "Wine Lovers" ? "black" : "grey"}
      />
    ),
    "Mixology Master": (
      <Entypo
        name="lab-flask"
        size={25}
        color={theTag === "Mixology Master" ? "black" : "grey"}
      />
    ),
    "Dog-friendly": (
      <FontAwesome5
        name="dog"
        size={25}
        color={theTag === "Dog-friendly" ? "black" : "grey"}
      />
    ),
    "Extended HH": (
      <Entypo
        name="hour-glass"
        size={25}
        color={theTag === "Extended HH" ? "black" : "grey"}
      />
    ),
    "TPSI offers": (
      <FontAwesome5
        name="fire-alt"
        size={25}
        color={theTag === "TPSI offers" ? "black" : "grey"}
      />
    ),
    "Date night": (
      <FontAwesome5
        name="heartbeat"
        size={25}
        color={theTag === "Date night" ? "black" : "grey"}
      />
    ),
    Trivia: (
      <MaterialCommunityIcons
        name="brain"
        size={25}
        color={theTag === "Trivia" ? "black" : "grey"}
      />
    ),
    "Live Music": (
      <Entypo
        name="modern-mic"
        size={25}
        color={theTag === "Live Music" ? "black" : "grey"}
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
    "Amazing Views": (
      <MaterialCommunityIcons
        name="weather-night"
        size={25}
        color={theTag === "Amazing Views" ? "black" : "grey"}
      />
    ),
    Rooftop: (
      <MaterialCommunityIcons
        name="balcony"
        size={25}
        color={theTag === "Rooftop" ? "black" : "grey"}
      />
    ),
    "Local Drinks": (
      <FontAwesome5
        name="map-signs"
        size={25}
        color={theTag === "Local Drinks" ? "black" : "grey"}
      />
    ),
    "Cheap Drinks": (
      <MaterialIcons
        name="local-drink"
        size={25}
        color={theTag === "Cheap Drinks" ? "black" : "grey"}
      />
    ),
    "Cheap Snacks": (
      <FontAwesome
        name="cutlery"
        size={25}
        color={theTag === "Cheap Snacks" ? "black" : "grey"}
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
  const [filter, setFilter] = useState(filterVal);
  const Filtering = (data) => {
    let res = data;
    
    if(theTag){
      console.log(theTag)
      res= res.filter((data)=>{
        try{
          if (data.tags.includes(theTag)){
            return data
          }
        }catch(e){
          console.log(e)
        }
      })
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
            if (filter.items[key] && store.items.includes(key)) {
              return store;
            }
          }
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
        return;
      }
    });
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
  // useEffect(()=>{console.log(filter.selectedCuisine,typeof(filter.selectedCuisine))},[filter])
  useEffect(() => {
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
      console.log("Location:");
      console.log(currentLocation);
      if (currentLocation) {
        setLoc(currentLocation.coords);
      } else {
        currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Lowest,
        });
        console.log("Location:");
        console.log(currentLocation);
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
          console.log(response.data.splice(0, 10));
          setSpecials(response.data.splice(0, 10));
        })
        .catch((e) => {
          console.log(
            e,
            "failed" +
              "https://data.tpsi.io/api/v1/stores/getTodayDailySpecial?lat=" +
              currentLocation.coords.latitude +
              "&lng=" +
              currentLocation.coords.longitude
          );
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
    getPerm();
  }, [newloc]);
  const [newloc, setNew] = useState(null);
  const [specials, setSpecials] = useState(null);

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
          scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
          });
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
          scrollRef.current?.scrollTo({
            y: 0,
            animated: true,
          });
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
        open={open}
        setopen={setopen}
        modal={modal}
        setmodal={setmodal}
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
              value={search}
              onChangeText={setsearch}
              placeholder=" Search store name"
              returnKeyType="search"
              onSubmitEditing={() => {
                searchResult();
              }}
            />
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
              borderColor: "white",
              backgroundColor: "#F9EEC8",
              shadowColor: "#C58A00",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.4,
              shadowRadius: 2,
            }}
          >
            
              <Icon.Sliders
                style={{ transform: [{ rotate: "90deg" }] }}
                color={"grey"}
                height={20}
              />
            </TouchableOpacity>

        </View>
      </View>

      {/* <Text>{JSON.stringify(filteredData)}</Text> */}
      {/* <DailySection/> */}
     
      {/* testing info */}
      <View
        style={styles.scrollView}
        ref={scrollRef}
        keyboardShouldPersistTaps="handled"
      >
        <ScrollView
          style={{ height: 80, paddingHorizontal: 10 }}
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
                  }
                }}
                style={{
                  justifyContent: "flex-end",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  alignSelf: "center",
                  height: 70,
                  paddingBottom: 10,
                  borderBottomWidth:tag === theTag ?2 : 0,
                  borderColor:'black'
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
                    fontSize: 15,
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
        {/*Today's special!!!!!!!!!!!!!!!!!!!!!!!  */}
        {specials&&!theTag?<ScrollView style={{flexDirection:'column'}}>
      {specials.map((item,id)=>{
        return(<Text key={id}>{item.name}</Text>)
      })}
      </ScrollView>:null}
      {filteredData && Filtering(filteredData).length < 1 ? (
        <Text>no store within the filtered scope</Text>
      ) : null}
        {!indicator ? (
          !result ? (
            data ? (
              <FlatList
                data={
                  filter === filterVal || !open
                    ? Filtering(data)
                    : filteredData
                    ? Filtering(filteredData)
                    : null
                }
                renderItem={({ item }) => (
                  <TouchableOpacity
                    key={item.name}
                    onPress={() => {
                      navigation.navigate("Detail", { store: item });
                      // navigation.navigate("Detail", { store: item,test:"123", change:filter === filterVal || !open ? ()=>setData:()=>setFilteredData});
                    }}
                  >
                    <StoreCard
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
                <Text>{messasge}</Text>
              </>
            )
          ) : (
            <ScrollView
              style={styles.scrollView}
              ref={scrollRef}
              keyboardShouldPersistTaps="handled"
            >
              {Filtering(result).map((object, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    navigation.navigate("Detail", { store: object });
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
    </View>
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
  },
  searchArea: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: statusBarHeight,
    backgroundColor: "#F9EEC8",
    shadowColor: "rgb(129, 129, 129)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
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
});
