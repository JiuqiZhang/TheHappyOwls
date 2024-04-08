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
      'Beer': false,
      'Wine': false,
      'Cocktail': false,
      'Food': false,
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
    sortBy: 'distance',
  };
  const  user = useSelector(state => state.user);
  const [filter, setFilter] = useState(filterVal);
  const Filtering = (data) => {
    let res = data
    if (filter.sortBy){
      if(filter.sortBy=='rating'){
        res = res.sort(
          (a,b)=>{return b[filter.sortBy]-a[filter.sortBy]}
         )
      }else{
        res = res.sort(
          (a,b)=>{return a[filter.sortBy]-b[filter.sortBy]}
         )
      }
     
     }
    return res.filter((store) => {
      if (!open) {
        for (day in filter.hhdays) {
          if (filter.hhdays[day] === true && store.days[day].time.length <= 0) {
            return;
          }
        }
        
          if (JSON.stringify(filter.price) !== JSON.stringify(filterVal.price) && filter.price[store.price]!==true) {
            return;
          }
        
      
        if (
          
          store.cuisine[0] !== filter.selectedCuisine && filter.selectedCuisine!==null
        ) {
          return;
        }
        if (Object.values(filter.items).indexOf(true) > -1) {
          for (const key of Object.keys(filter.items)) {
           
            if (filter.items[key] && store.items.includes(key)){
              return store
            }
        }
        return
       }

        return store
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
            if (JSON.stringify(filter.price) !== JSON.stringify(filterVal.price) && filter.price[store.price]!==true) {
              return;
            }
          
            
            if (
              store.cuisine[0] !== filter.selectedCuisine && filter.selectedCuisine!==null
            ) {
              return;
            }
            if (Object.values(filter.items).indexOf(true) > -1) {
              for (const key of Object.keys(filter.items)) {
                if (filter.items[key] && store.items.includes(key)){
                  return store
                }
            }
            return
           }
    
            return store
          }
        }
        return;
      }
    });
  };

  const validateItem = (hh) =>{
    let res = []
    if (hh.length > 0) {
      for (i = 0; i < hh[0].infos.length; i++) {
        // time
        hh[0].infos[i].items.map((item) => {
         if (!(res.includes(item.type))){
          res.push(item.type)
         }
        });
      }
    }

    return res;

  }
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
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      } else {
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

      let currentLocation = await Location.getCurrentPositionAsync({});
      console.log("Location:");
      console.log(currentLocation);
      setLoc(currentLocation.coords);
      setmsg((prevState) => ({
        ...prevState,
        location: (new Date() - prevState.open) / 1000,
      }));

      var req = new FormData();
      req.append("lat", currentLocation.coords.latitude);
      req.append("lng", currentLocation.coords.longitude);
      if (user.email){
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
            items:validateItem(store.hhResult),
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

    setIndicator(true);

    await axios({
      method: "get",
      url:
        "https://data.tpsi.io/api/v1/stores/searchWithDistance?search=" +
        search +
        "&lat=" +
        loc.latitude +
        "&lng=" +
        loc.longitude+(user.email?"&username=" +
        user.email:''),
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
          items:validateItem(store.hhResult),
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
            display: "flex",
            marginLeft: 20,
          }}
        >
          <TouchableOpacity onPress={() => setopen(!open)}>
            <LinearGradient
              colors={
                open ? ["#F9EEC8", "#FFD029", "#D9AA04"] : ["transparent"]
              }
              start={{ x: -0.4, y: 0 }}
              end={{ x: 1.6, y: 1 }}
              style={[
                styles.filter,
                {
                  backgroundColor: open ? "#FFD029" : "white",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  height: 32,
                },
              ]}
            >
              {open ? (
                <View
                  style={{
                    width: 2 * dp,
                    height: 2 * dp,
                    backgroundColor: "#008515",
                    shadowColor: "#008515",
                    shadowOffset: { width: 0, height: 1 },
                    paddingHorizontal: "2%",
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    borderRadius: 9999,
                  }}
                />
              ) : null}
              <Text
                style={{
                  marginVertical: 7,
                  marginLeft: 2 * dp,
                  fontSize: 12,
                  fontWeight: '500',
                }}
              >
                Live Now
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          <View
            style={[
              styles.filter,
              {
                flexDirection: "row",
                backgroundColor: "#F9EEC8",
                right: 20,
                borderWidth: 1,
                borderColor: "white",
                justifyContent: "space-between",
                width: 269,
                paddingVertical: 1,
                height: 32,
              },
            ]}
          >
            {Object.entries(filter.hhdays).map((day, i) => {
              return (
                <TouchableOpacity
                  style={{ alignSelf: "center", height: 28, width: 28 }}
                  onPress={() => {
                    setFilter((filter) => ({
                      ...filter,
                      hhdays: { ...filter.hhdays, [day[0]]: !day[1] },
                    }));
                  }}
                  key={i}
                >
                  <LinearGradient
                    colors={
                      filter.hhdays[day[0]]
                        ? ["#F9EEC8", "#FFD029", "#D9AA04"]
                        : ["transparent"]
                    }
                    style={[
                      filter.hhdays[day[0]]
                        ? {
                            shadowColor: "#C0A106",
                            backgroundColor: "#F9C241",
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.4,
                            borderWidth: 0.1,
                            borderColor: "#F9C241",
                            shadowRadius: 2,
                            borderRadius: 999,
                          }
                        : null,
                      {
                        alignSelf: "center",
                        height: 28,
                        width: 28,
                        borderRadius: 999,
                      },
                    ]}
                    start={{ x: -0.1, y: 0.2 }}
                    end={{ x: 1.1, y: 1 }}
                  >
                    <Text
                      style={[
                        {
                          fontSize: 14,
                          fontWeight:
                            moment().format("dddd") === day[0] ? "800" : "500",
                          textAlign: "center",
                          marginVertical: "20%",
                        },
                      ]}
                    >
                      {day[0] !== "Thursday" ? day[0][0] : "TH"}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>




      {/* testing info */}
      {/* <Text>{"Testing:" + JSON.stringify(msg)}</Text> */}
      {/* {!filteredData?<Text style={{top:'5%'}}>No stores within your area, please try map page or search.</Text>:null} */}
      {!indicator ? (
        !result ? (
          data?<View
            style={styles.scrollView}
            ref={scrollRef}
            keyboardShouldPersistTaps="handled"
          >
            
              <FlatList
                data={filter === filterVal || !open ? Filtering(data):filteredData ? Filtering(filteredData):null}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    key={item.name}
                    onPress={() => {
                    navigation.navigate("Detail", { store: item,test:"123", change:filter === filterVal || !open ? ()=>setData:()=>setFilteredData});
                  }}
                  >
                    <StoreCard store={item} navigation={navigation}  change={filter === filterVal || !open ? setData:setFilteredData}/>
                  </TouchableOpacity>
                )}
              />
         
          </View>: <ActivityIndicator
          size="large"
          color="grey"
          style={{ top: "5%" }}
          animating={indicator}
        />
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
                <StoreCard store={object} navigation={navigation} change={setResult}/>
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
    marginHorizontal: 20,
    width: "100%",
    flexGrow: 1,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "row",
  },
  searchArea: {
    width: "100%",
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
