import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Linking,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
  Dimensions,
} from "react-native";
import { Tab, TabView } from "react-native-elements";
import * as WebBrowser from "expo-web-browser";
import { MaterialIcons } from "@expo/vector-icons";
import * as Icon from "react-native-feather";
import Slider from "../../Component/Slider";
import * as Location from "expo-location";
import { Divider } from "react-native-elements";
import { Rating } from "react-native-ratings";

const { height, width } = Dimensions.get("screen");
import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";
export default DetailPage = ({ navigation, route }) => {
  const img = {
    Beer: require("../../Image/Beer.png"),
    Wine: require("../../Image/Wine.png"),
    Food: require("../../Image/Food.png"),
    Cocktail: require("../../Image/Cocktail.png"),
  };
  const [userLoc, setLoc] = useState(null);
  const [index, setIndex] = useState(0);
  const [modal, isModal] = useState(false);
  const data = route.params.store;
  const week = ["M", "Tu", "W", "Th", "F", "Sa", "Su"];
  const days = {
    0: "Monday",
    1: "Tuesday",
    2: "Wednesday",
    3: "Thursday",
    4: "Friday",
    5: "Saturday",
    6: "Sunday",
  };
  useEffect(() => {
    const getLoc = async () => {
      let currentLocation = await Location.getCurrentPositionAsync({});

      setLoc(currentLocation.coords);
    };

    getLoc();
  }, []);
  return (
    <View style={styles.container}>
      <Slider img={data.photoResult[0]} />

      <ScrollView style={styles.scrollView}>
        {/* title */}
        <View style={[styles.card, { backgroundColor: "#FFFEFA" }]}>
          <Text style={styles.text}>{data.name}</Text>
          {/* <Divider orientation="horizontal" width={1} style={styles.divider} /> */}
          <View
            style={{ flexDirection: "row", display: "flex", width: "100%" }}
          >
            <View
              style={{ flexDirection: "row", display: "flex", width: "45%" }}
            >
              <Image
                style={{ width: 20, height: 20, alignSelf: "auto" }}
                source={require("../../Image/G.png")}
              />

              <Text style={{ fontWeight: "bold" }}>{data.rating}</Text>
              <Rating
                startingValue={data.rating}
                imageSize={20}
                readonly={true}
                style={{ marginTop: "-1%", paddingHorizontal: "2%" }}
              />
            </View>

            <Text
              style={{
                fontWeight: "bold",
                marginLeft: 20,
                overflow: "hidden",
                width: "45%",
              }}
            >
              {data.cuisine}
              {" " + "$".repeat(+data.price)}
            </Text>
          </View>
          <View
            style={{
              minWidth: "100%",
              marginHorizontal: "-7%",
              paddingBottom: "3%",
            }}
          >
            <View
              style={{
                height: "70%",
                backgroundColor: "#E8BA184D",
                width: "100%",
                position: "absolute",
                bottom: 0,
              }}
            />
            <View
              style={[
                styles.row,
                {
                  justifyContent: "space-around",
                  paddingTop: "3%",
                  zIndex: 100,
                },
              ]}
            >
              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() =>
                  Linking.openURL(
                    "maps://app?daddr=" + data.latitude + "+" + data.longitude
                  )
                }
              >
                <View style={styles.directionIcon}>
                  <MaterialIcons name="directions" size={36} color="black" />
                </View>
                <Text style={{ fontWeight: "bold" }}>Direction</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={async () => {
                  await WebBrowser.openBrowserAsync(
                    !data.menuLink ? data.website : data.menuLink
                  );
                }}
              >
                <View style={styles.directionIcon}>
                  <MaterialIcons name="menu-book" size={34} color="black" />
                </View>
                <Text style={{ fontWeight: "bold" }}>Menu</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() => {
                  Linking.openURL(`tel:${data.number.replace(/\D/g, "")}`);
                }}
              >
                <View style={styles.directionIcon}>
                  <MaterialIcons name="call" size={34} color="black" />
                </View>
                <Text style={{ fontWeight: "bold" }}>Call</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ alignItems: "center" }}
                onPress={() => {
                  isModal(true);
                }}
              >
                <View style={styles.directionIcon}>
                  <MaterialIcons name="schedule" size={34} color="black" />
                </View>
                <Text style={{ fontWeight: "bold" }}>Schedule</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* <Divider orientation="horizontal" width={1} style={styles.divider} /> */}

        {/* general info */}
        {/* <View style={styles.card}>
          <Text>{data.comment}</Text>
        </View> */}
        {/* Happy hour */}
        <View style={styles.card}>
          <Text style={styles.times}>
            Happy Hour Times
            {(data.hh[0] && data.hh[0]["bar_patio_only"] === true
              ? "(bar patio only)"
              : "") + "\n"}
          </Text>

          <View style={styles.row}>
            {week.map((day, index) => {
              return (
                <View
                  key={index}
                  style={[
                    styles.circleContainer,
                    data.days[days[index]].time.length > 0 ? styles.hh : null,
                  ]}
                >
                  <Text style={styles.circle}>{day}</Text>
                </View>
              );
            })}
          </View>
          <Text style={styles.time}>
            {data.days[moment().format("dddd")].time.length > 0
              ? "Today: " + data.days[moment().format("dddd")].time
              : "No happy hours today"}
          </Text>

          <Modal
            animationType="fade"
            transparent={true}
            visible={modal}
            onRequestClose={() => {
              console.log("closing");
              isModal(!modal);
            }}
          >
          <TouchableOpacity style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: 'rgba(0,0,0,0.5)'
              }} onPress={()=>{isModal(false)}}>

              <TouchableOpacity
                style={styles.modal}
                activeOpacity={1}
              >

      <TouchableOpacity
        style={{position:'absolute', right:'5%', top:'4%',zIndex:17}}
        onPress={()=>{isModal(false)}}
      >
        <Icon.X color={"black"} />
      </TouchableOpacity>
                {Object.entries(data.days).map((time, index) => {
                  if (time[1].time.length > 0) {
                    return (
                      <View
                        key={index}
                        style={{ flexDirection: "row", marginVertical: 2 }}
                      >
                        <View
                          key={index}
                          style={[
                            styles.circleContainer,
                            {
                              width: 20,
                              height: 20,
                            },
                            data.days[days[index]].time.length > 0
                              ? styles.hh
                              : null,
                          ]}
                        >
                          <Text style={styles.circle}>{week[index]}</Text>
                        </View>
                        <Text style={styles.time}>
                          {time[0] + ": " + time[1].time}
                        </Text>
                      </View>
                    );
                  }
                })}
              </TouchableOpacity>
              </TouchableOpacity>
          </Modal>
        </View>

        <Divider orientation="horizontal" width={1} style={styles.divider} />

        {/* Deals */}
        <View style={styles.card}>
          <View style={[styles.row, { justifyContent: "space-between" }]}>
            <View style={{ width: "67%" }}>
              <Text style={styles.times}>Happy Hour Deals{"\n"}</Text>
            </View>
            <View
              style={{ flexDirection: "row", display: "flex", width: "34%" }}
            >
              <View style={{ width: "50%" }}>
                <Text style={{ textAlign: "center", fontSize: 12 }}>
                  original{"\n"}price
                </Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text style={{ textAlign: "center", fontSize: 12 }}>
                  discount{"\n"}price
                </Text>
              </View>
            </View>
          </View>
          {data.days[moment().format("dddd")].deal.length > 0 ? (
            <>
              {data.days[moment().format("dddd")].deal.map((deal, i) => {
                return (
                  <View key={i}>
                    <View style={styles.row}>
                      <View style={{ width: "67%", flexDirection: "row" }}>
                        <Image
                          source={img[deal.type]}
                          style={{
                            resizeMode: "contain",
                            width: 20,
                            height: 20,
                          }}
                        />
                        <Text style={{ fontWeight: "bold" }}> {deal.name}</Text>
                      </View>
                      <View style={{ width: "17%" }}>
                        <Text
                          style={[
                            styles.dealText,
                            {
                              textDecorationLine: "line-through",
                              textAlign: "center",
                            },
                          ]}
                        >
                          ${deal.regular_price ? deal.regular_price : "N/A"}
                        </Text>
                      </View>
                      <View style={{ width: "17%" }}>
                        <Text
                          style={[{ textAlign: "center" }, styles.dealText]}
                        >
                          ${deal.discounted_price}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })}
            </>
          ) : (
            <Text>No HH deals today</Text>
          )}
        </View>


        {/* Daily Specials */}
 
 <Divider orientation="horizontal" width={1} style={styles.divider} /><View style={styles.card}>
      <View style={[styles.row,{justifyContent:'space-around'}]}>
        {week.map((day, ind)=>{
          return(
            <TouchableOpacity onPress={()=>{setIndex(ind)}} style={{alignItems: 'center',height:40,backgroundColor:index!==ind?'white':null,opacity:index===ind?1:0.4,
    flex: 1,
    justifyContent: 'center'}} key={ind}>
            <View  style={[
                  
                  data.dsResult.length>0 && data.dsResult[0].dayInfo[ind].menus.length > 0 ? styles.hh : null,{alignSelf:"center"}
                  ]}>
            <Text style={{fontWeight:'bold'}}>{day}</Text></View>
          </TouchableOpacity>
          )
        })}
      </View>
{data.dsResult.length>0?      <TabView value={index} onChange={setIndex}>
      {data.dsResult[0].dayInfo.map((today,ind)=>{
        return(
          <TabView.Item key={ind} style={{ width:'88%'}}>
          <><View style={[styles.row, { justifyContent: "space-between" }]}>
            <View style={{ width: "67%" }}>
              <Text style={styles.times}>Daily Special Deals{"\n"}</Text>
            </View>
            <View
              style={{ flexDirection: "row", display: "flex", width: "34%" }}
            >
              <View style={{ width: "50%" }}>
                <Text style={{ textAlign: "center", fontSize: 12 }}>
                  original{"\n"}price
                </Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text style={{ textAlign: "center", fontSize: 12 }}>
                  discount{"\n"}price
                </Text>
              </View>
            </View>
          </View>
          {today.menus.length > 0 ? 
              today.menus.map((deal, i) => {
                return (
                  <View key={i}>
                    <View style={styles.row}>
                      <View style={{ width: "67%", flexDirection: "row" }}>
                        <Image
                          source={img[deal.type]}
                          style={{
                            resizeMode: "contain",
                            width: 20,
                            height: 20,
                          }}
                        />
                        <Text style={{ fontWeight: "bold" }}> {deal.name}</Text>
                      </View>
                      <View style={{ width: "17%" }}>
                        <Text
                          style={[
                            styles.dealText,
                            {
                              textDecorationLine: "line-through",
                              textAlign: "center",
                            },
                          ]}
                        >
                          ${deal.regular_price ? deal.regular_price : "N/A"}
                        </Text>
                      </View>
                      <View style={{ width: "17%" }}>
                        <Text
                          style={[{ textAlign: "center" }, styles.dealText]}
                        >
                          ${deal.discounted_price}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              })
           
           : (
            <Text>No Daily Special Deals Today</Text>
          )}</>
        </TabView.Item>
       
        )
      })}
 
      </TabView>:<><Text style={styles.times}>Daily Special Deals{"\n"}</Text><Text>No Daily Special Deals This Week</Text></>}

        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.back}
        onPress={() => {
          navigation.goBack(null);
        }}
      >
        <Icon.ArrowLeft color={"black"} />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: "12%",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
  circleContainer: {
    width: 25,
    height: 25,
    borderRadius: 100,
    alignItems: "center",
    marginRight: 6,
    marginLeft: -3,
    marginTop: -5,
    marginBottom: 5,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    textAlign: "center",
    display: "flex",
  },

  circle: {
    color: "#808021",
    fontWeight: "bold",
  },
  hh: {
    backgroundColor: "#FFB300",
  },
  card: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#FFFEFA",

    overflow: "wrap",
  },
  divider: {
    borderColor: "black",
    marginVertical: "2%",
    marginBottom: "3%",
  },
  scrollView: {
    paddingHorizontal: 12,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: "2%",
  },
  times: {
    fontSize: 18,
    fontWeight: "bold",
  },
  back: {
    position: "absolute",
    left: "4%",
    top: "6%",
  },
  time: {
    fontSize: 12,
    height: height * 0.02,
    color: "#4D4D4D",
  },
  column: {
    flexDirection: "column",
  },
  dealText: {
    fontWeight: "600",
    height: height * 0.07,
  },
  directionIcon: {
    height: 55,
    width: 55,
    borderRadius: 100,
    borderColor: "black",
    borderWidth: 0.7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  modal:{
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }
});
