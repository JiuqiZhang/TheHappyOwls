import React, { useEffect, useState } from "react";
import ModalFilter from "../../Component/ModalFilter";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  View,
  Button,
  Text,
  TextInput,
} from "react-native";
import Modal from "react-native-modal";
import Checkbox from "expo-checkbox";
import * as Icon from "react-native-feather";
import { Divider } from "react-native-elements";
import StoreCard from "../../Component/StoreCard";
import axios from "axios";
import { useRef } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

export default MenuScreen = ({ navigation }) => {
  const [indicator, setIndicator] = useState(true);
  const [data, setData] = useState();
  const [search, setsearch] = useState("");
  const [modal, setmodal] = useState(false);
  const [result, setResult] = useState("");
  const scrollRef = useRef();
  const [filteredData, setFilteredData] = useState()

  const filterVal = {
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
    selectedCuisine:null
  };

  const [filter, setFilter] = useState(filterVal);



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
    var config = {
      method: "get",
      url: "https://data.tpsi.io/api/v1/stores/findCheckedStoreWithAllData",

      headers: {},
    };

    axios(config)
      .then((response) =>
        response.data.splice(0, 60).map((store) => ({
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
        setFilteredData(stores)
        setIndicator(false);
      })
      .catch((error) => console.log(error));
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
      return (1-res)*100;
    } else {
      return null;
    }
  };

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
    <SafeAreaView style={styles.container}>
      <ModalFilter filter={filter} filterVal={filterVal} setFilter={setFilter} setFilteredData={setFilteredData} data = {data} modal={modal} setmodal={setmodal}/>
      <View style={styles.searchArea}>
        <View style={styles.inputContainer}>
          <Icon.Search color={"grey"} />
          <Divider orientation="vertical" style={styles.divider} />

          <TextInput
            style={styles.input}
            value={search}
            onChangeText={setsearch}
            placeholder="Search store name"
            onSubmitEditing={() => {
              searchResult();
            }}
          />
          <Divider orientation="vertical" style={styles.divider} />
          <TouchableOpacity
            onPress={() => {
              setmodal(true);
            }}
          >
            <Icon.Filter color={"grey"} height={27} />
          </TouchableOpacity>
        </View>
      </View>

      {!indicator ? (
        !result ? (
          <ScrollView style={styles.scrollView} ref={scrollRef}>
            {filteredData
              ? filteredData.map((object, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.navigate("Detail", { store: object });
                    }}
                  >
                    <StoreCard store={object} />
                  </TouchableOpacity>
                ))
              : null}
          </ScrollView>
        ) : (
          <ScrollView style={styles.scrollView} ref={scrollRef}>
            {result.map((object, index) => (
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
              scrollRef.current?.scrollTo({
                y: 0,
                animated: true,
              });
            }}
          />
        ) : null}
      </View>
    </SafeAreaView>
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
    minHeight: 50,
    height: 50,
    flexGrow: 1,
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    margin: 10,
    backgroundColor: "#FFFEFA",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  searchArea: {
    width: "100%",
    padding: "1%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomColor: "grey",
    paddingTop: 0,
    borderTopColor: "grey",
    borderWidth: 0.4,
    borderTopWidth: 0,
  },
  divider: {
    marginHorizontal: 6,
    borderColor: "grey",
  },
  input: {
    minWidth: "70%",
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
  
});
