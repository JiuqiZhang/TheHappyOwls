import {
  Text,
  FlatList,
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
} from "react-native";
import { useIsFocused } from '@react-navigation/native';


import { BlurView } from "expo-blur";
import React, { useEffect, useState } from "react";
import * as Icon from "react-native-feather";
import Constants from "expo-constants";
import { Divider } from "react-native-elements";
import axios from "axios";
import SavedCard from "../../Component/SavedCard";
import { useSelector } from "react-redux";


export default SavedScreen = ({ navigation }) => {
  const [data, setData] = useState();
  const isFocused = useIsFocused();
  const[refresh, setRefresh] = useState()
  const [filter, setFilter] = useState("Distance");
  const  user = useSelector(state => state.user);
  const [modal, setModal] = useState(false);
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

  const getFav = async () => {
    var req = new FormData();
    req.append("username", user.email);
    req.append("lat", 40.7429);
    req.append("lng", -73.9392);
    var config = {
      method: "post",
      url: "https://data.tpsi.io/api/v1/stores/getUserFavoriteStores",
      headers: {},
      data: req,
    };

    await axios(config)
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
          ...store,
        }));
      })
      .then((stores) => {
        if (filter === "Distance") {
          setData(stores.sort((a, b) => a.distance - b.distance));
        } else if (filter === "Date Added") {
          setData(
            stores.sort((a, b) => {
              if (a.dateAdded < b.dateAdded) {
                return 1;
              }
              if (a.dateAdded > b.dateAdded) {
                return -1;
              }
              return 0;
            })
          );
        } else {
          setData(
            stores.sort((a, b) => {
              if (a.name < b.name) {
                return -1;
              }
              if (a.name > b.name) {
                return 1;
              }
              return 0;
            })
          );
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(()=>{getFav()},[filter,isFocused,refresh])

  return (
    <View style={[styles.container,]}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Saved{data ? " (" + data.length + ")" : null}
        </Text>
        <TouchableOpacity
          style={{
            justifyContent: "flex-end",
            flexDirection: "row",
            alignContent: "center",
          }}
          onPress={() => {
            setModal(true);
          }}
        >
          <Text
            style={{ fontSize: 12, textAlign: "right", alignSelf: "flex-end" }}
          >
            By {filter}
          </Text>
          <Icon.ArrowDown
            width={14}
            height={14}
            fill={"black"}
            stroke={"black"}
            style={{ alignSelf: "flex-end" }}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item.name}
            onPress={() => {
              navigation.navigate("Detail", { store: item });
            }}
          >
            <SavedCard item={item} setRefresh={()=>{setRefresh(!refresh)}}/>
            <Divider
              orientation="horizontal"
              width={1}
              style={{ paddingTop: 16 }}
              color={"#D3D3D3"}
            />
          </TouchableOpacity>
        )}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modal}
        onBackdropPress={() => setModal(false)}
        onRequestClose={() => {
          setModal(false);
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
          }}
          onPress={() => {
            setModal(false);
          }}
        >
          <BlurView
            style={{
              flex: 1
            }}
            intensity={15}
            tint="dark"
          >
            <TouchableOpacity style={styles.modal} activeOpacity={1}>
              <View style={styles.modalChoice}>
                <TouchableOpacity
                  style={[
                    styles.choice,
                    { borderTopLeftRadius: 10, borderTopRightRadius: 10 },
                  ]}
                  onPress={() => {
                    setFilter("Distance")
            setModal(false);
          }}
                >
                  <Text>Sort by Distance</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.choice}  onPress={() => {
                    setFilter("Date Added")
            setModal(false);
          }}>
                  <Text>Sort by Date Added</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.choice,
                    ,
                    { borderBottomLeftRadius: 10, borderBottomRightRadius: 10 },
                  ]}
                  onPress={() => {
                    setFilter("Alphabetical Order")
            setModal(false);
          }}
                >
                  <Text>Sort by Alphabetical Order</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={[
                  styles.choice,
                  { borderRadius: 10, marginTop: 10, borderWidth: 1 },
                ]}
                onPress={() => {
            setModal(false);
          }}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </BlurView>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: Constants.statusBarHeight,
    marginHorizontal: 20,
  },
  card: { flexDirection: "row", flex: 1, paddingTop: 16 },
  image: {
    height: 76,
    width: 76,
    resizeMode: "cover",
    borderRadius: 10,
    alignSelf: "flex-start",
  },
  cuisine: { fontWeight: "500", fontSize: 10 },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  header: {
    marginBottom: 4,
    marginTop: 17,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modal: {
    alignItems: "center",
    marginTop: "auto",
    height: 248,
    width: 353,
    alignSelf: "center",
    opacity: 1,
    zIndex:20,
  },
  modalChoice: {
    width: "100%",
    alignItems: "center",
    height: 150,

    borderRadius: 10,
  },
  choice: {
    height: 50,
    justifyContent: "center",
    backgroundColor: "white",
    width: "100%",
    alignItems: "center",
    borderColor: "#D3D3D3",
    borderWidth: 0.5,
  },
});
