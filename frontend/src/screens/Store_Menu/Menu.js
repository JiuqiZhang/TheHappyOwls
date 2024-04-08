import React, { useEffect, useState } from "react";
import ModalFilter from "../../Component/ModalFilter";
import Constants from "expo-constants";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  View,
  FlatList,
  Button,
  Keyboard,
  Text,
  TextInput,
} from "react-native";
import * as Location from "expo-location";

import * as Icon from "react-native-feather";
import { Divider } from "react-native-elements";
import StoreCard from "../../Component/StoreCard";
import axios from "axios";
import { useRef } from "react";
import moment from "moment/moment";
const statusBarHeight = Constants.statusBarHeight;

export default MenuScreen = ({ navigation }) => {
  const [indicator, setIndicator] = useState(true);
  const [data, setData] = useState();
  const [search, setsearch] = useState("");
  const [modal, setmodal] = useState(false);
  const [result, setResult] = useState("");
  const scrollRef = useRef();
  const [filteredData, setFilteredData] = useState();
  const [open, setopen] = useState(false);

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
  useEffect(() => {
    const getPerm = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      console.log("Location:");
      console.log(currentLocation);

      var req = new FormData();
      req.append("lat", currentLocation.coords.latitude);
      req.append("lng", currentLocation.coords.longitude);
      req.append("latDelta", 0.0122);
      req.append("lngDelta", 0.0081);

      var config = {
        method: "post",
        url: "https://data.tpsi.io/api/v1/stores/getAllStoresWithDistance",
        headers: {},
        data: req,
      };

var requestOptions = {
  method: 'POST',
  body: req,
  redirect: 'follow'
};
      

      await axios(config)
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
            price: store.price,
            website: store.website,
            comments: store.comments,
            number: store.number,
            days: validatehh(store.hhResult),
            off: findDeal(store.hhResult),
            ...store,
          }))
        )
        .then((stores) => {
          // console.log(stores);
          setData(stores);
          setFilteredData(stores);
          setIndicator(false);
        })
        .catch((error) => console.log(error));
    };
    getPerm();
  }, []);

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
    var req = new FormData();
    req.append("search", search);
    setIndicator(true);

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

          ...store,
        }))
      )
      .then((data) => {
        setResult(data);
        // scrollRef.current?.scrollTo({
        //   y: 0,
        //   animated: true,
        // });
        setIndicator(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <View style={styles.container} onTouchStart={()=>{Keyboard.dismiss()}}>
      <ModalFilter
        filter={filter}
        filterVal={filterVal}
        setFilter={setFilter}
        setFilteredData={setFilteredData}
        data={data}
        modal={modal}
        setmodal={setmodal}
      />
      <View style={styles.searchArea}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={search}
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
              marginRight: "2%",
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
            <TouchableOpacity
              onPress={() => {
                setmodal(true);
              }}
            >
              <Icon.Filter color={"grey"} height={27} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={[
              styles.filter,
              { backgroundColor: open ? "#FFD029" : "white" },
            ]}
            onPress={() => setopen(!open)}
          >
            <Text style={{ marginVertical: 7 }}>
              {open ? "✓ " : null}Open Now
            </Text>
          </TouchableOpacity>
          <View
            style={[
              styles.filter,
              {
                flexDirection: "row",
                backgroundColor: "#F9EEC8",
                marginRight: "3%",
                borderWidth: 1.25,
                borderColor: "white",
                justifyContent: "space-evenly",
                paddingVertical: 1,
              },
            ]}
          >
            {Object.entries(filter.hhdays).map((day, i) => {
              return (
                <TouchableOpacity
                  style={[
                    {
                      paddingVertical: 5,
                      paddingHorizontal: "3%",
                      borderRadius: 40,
                    },
                    filter.hhdays[day[0]] ?{
                      backgroundColor: "white" ,
                      shadowColor: "#C58A00",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.4,
                      shadowRadius: 2,
                    }:null,
                  ]}
                  onPress={() => {
                    setFilter((filter) => ({
                      ...filter,
                      hhdays: { ...filter.hhdays, [day[0]]: !day[1] },
                    }));
                  }}
                  key={i}
                >
                  <Text
                    style={
                      moment().format("dddd") === day[0]
                        ? { color: "#C48A00", fontWeight: "900" }
                        : null
                    }
                  >
                    {day[0] !== "Thursday" ? day[0][0] : "TH"}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
{/* {!filteredData?<Text style={{top:'5%'}}>No stores within your area, please try map page or search.</Text>:null} */}
      {!indicator ? (
        !result ? (
          <View style={styles.scrollView} ref={scrollRef} keyboardShouldPersistTaps='handled'>
            {filter !==filterVal||open
              ? 
              
              <FlatList
        data={Filtering(data)}
        renderItem={({item}) =><TouchableOpacity
              key={item.name}
                    onPress={() => {
                      navigation.navigate("Detail", { store: item });
                    }}
                  >
                    <StoreCard store={item} />
                  </TouchableOpacity>}
      />
    

   


              : filteredData?Filtering(filteredData).map((object, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.navigate("Detail", { store: object });
                    }}
                  >
                    <StoreCard store={object} />
                  </TouchableOpacity>
                )):null}
          </View>
        ) : (
          <ScrollView style={styles.scrollView} ref={scrollRef} keyboardShouldPersistTaps='handled'>
            {Filtering(result).map((object, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate("Detail", { store: object });
                }}
              >
                <StoreCard store={object} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )
      ) : (
        <ActivityIndicator
          size="large"
          color="grey"
          style={{ top: "5%" }}
          animating={indicator}
        />
      )}
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
    marginHorizontal: 15,
    width: "100%",
    flexGrow: 1,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  searchArea: {
    width: "100%",
    padding: "1%",
    alignItems: "center",
    justifyContent: "center",
    borderTopColor: "grey",
    borderTopWidth: 0,
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
    maxWidth: "80%",
    height: 42,
    flexGrow: 1,
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    borderRadius: 20,
    display: "flex",

    margin: 10,
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
    marginLeft: "5%",
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
