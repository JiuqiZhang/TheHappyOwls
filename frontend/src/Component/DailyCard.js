import React from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
const { width } = Dimensions.get("window");
import moment from "moment/moment";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
const img = {
  Beer: require("../Image/Beer.png"),
  Wine: require("../Image/Wine.png"),
  Food: require("../Image/Food.png"),
  Cocktail: require("../Image/Cocktail.png"),
};
export default DailyCard = React.memo((props) => {
  const data = props.store;
  const navigation = props.navigation;
  const today = data.dsResult[0].dayInfo[moment().isoWeekday() - 1];

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Detail", { store: data });
      }}
    >
      <View style={[styles.card, { width: 280, flexDirection: "column",marginBottom:4 }]}>
        {/* <Image
          source={
            data.photoResult[0] && data.photoResult[0]["photos"][0]
              ? {
                  uri:
                    "https://spring-boot-repo-tpsi.s3.amazonaws.com/" +
                    data.photoResult[0]._id +
                    "_" +
                    data.photoResult[0]["photos"][0].id,
                }
              : require("../Image/store.jpg")
          }
          style={{
            width: "100%",
            height: 120,
            width: 280,
            borderRadius: 5,
          }}
          contentFit="cover"
        /> */}
        <Image
          source={
            data.photoResult[0] && data.photoResult[0]["photos"][0]
              ? {
                  uri:
                    "https://spring-boot-repo-tpsi.s3.amazonaws.com/" +
                    data.photoResult[0]._id +
                    "_" +
                    data.photoResult[0]["photos"][0].id,
                }
              : require("../Image/store.jpg")
          }
          style={{
            width: "100%",
            height: 120,
            width: 280,
            borderRadius: 5,
          }}
          contentFit="cover"
        /> 




        
        <View>
        <View style={{flexDirection:'row', justifyContent:'space-between',width:280}}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "600",
              marginTop: 8,
              maxWidth:220
            }}
           numberOfLines={1}
          >
            {data.name}
          </Text>
          <Text
            style={{
              fontWeight: "500",
              fontSize: 10,
              marginTop: 8,
              color: "#7D7D7D",
              alignSelf:'flex-end'
            }}
          >
            {props.store.distance.toFixed(1) + " mi"}
          </Text>
         </View>

          <View>
            {today.start_time ? (
              <Text style={{ fontSize: 10, fontWeight: "500", marginTop: 3 }}>
                Special Hours: {today.start_time} - {today.end_time}
              </Text>
            ) : null}
            {today.menus.length == 0 ? (
              <Text style={{fontSize:14}}>No Daily Special Deals Today</Text>
            ) : (
              today.menus.slice(0, 2).map((deal, i) => {
                return (
                  <View key={i} style={[styles.row, { marginTop: 4 }]}>
                    {deal.discounted_price !== 0 ? (
                      <>
                        <View style={{ width: "17%" }}>
                          <Text
                            style={{
                              color: "green",
                              fontWeight: "600",
                              fontSize: 14,
                            }}
                          >
                            ${deal.discounted_price}
                          </Text>
                        </View>
                        <Image
                          source={img[deal.type]}
                          style={{
                            width: 14,
                            height: 15,
                          }}
                          contentFit="contain"
                        />
                      </>
                    ) : null}

                    <Text style={{ fontSize: 14, fontWeight: "500" }}>
                      {" "}
                      {deal.name}
                    </Text>
                  </View>
                );
              })
            )}
            {today.menus.length > 2 ? (
              <Text style={{ fontSize: 10,marginTop:2 }}>
                +{today.menus.length - 2} more specials
              </Text>
            ) : null}
          </View>
        </View>

        <LinearGradient
          colors={["#F9EEC8", "#FFD029", "#D9AA04"]}
          start={{ x: -0.4, y: 0 }}
          end={{ x: 1.6, y: 1 }}
          style={[
            {
              position: "absolute",
              zIndex: 7,
              top: "3%",
              left: "3%",
              padding: "1%",
              paddingVertical: 2,
            paddingHorizontal:6,
              display:today.menus.length!==0 ? "flex" : "none",
            },
            styles.percent,
          ]}
        >
          <Text style={{ fontWeight: "600", fontSize: 14 }}>
            {today.menus.length} Offer{today.menus.length==1?null:'s'} Available
          </Text>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
  },
  card: {
    // padding: 10,
    elevation: 5,
    backgroundColor: "#FFF",
    flexDirection: "row",
    borderRadius: 5,
    marginHorizontal: 4,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 0.3,
    shadowOffset: { x: 2, y: -2 },
    overflow: "hidden",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
  percent: {
    backgroundColor: "#F5E3A3",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 1,
  },
});
