import React, { useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as Icon from "react-native-feather";
import Slider from "../../Component/Slider";
import { Divider } from "react-native-elements";
import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";
export default DetailPage = ({ navigation, route }) => {
  const data = route.params.store;
  const week = ["M", "T", "W", "T", "F", "S", "S"];
  var deals = [
    { name: "Wine", originalPrice: 12, dealPrice: 8 },
    { name: "Cocktail of the day", originalPrice: 12, dealPrice: 8 },
    { name: "Well Drinks", originalPrice: 12, dealPrice: 8 },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <Slider img={data.photoResult[0]}/>

      <ScrollView style={styles.scrollView}>
        {/* title */}
        <View style={styles.card}>
          <Text style={styles.text}>
            {data.name}
            
            {"\n"}
          </Text>
          <Text>
            {data.rating} review - {data.location}
          </Text>
        </View>
        <Divider orientation="horizontal" width={1} style={styles.divider} />

        {/* Happy hour */}
        <View style={styles.card}>
          <Text style={styles.times}>Happy Hour Times{"\n"}</Text>
          {/* <View style={styles.row}>
            {week.map((day, index) => {
              return (
                <View
                  key={index}
                  style={[
                    styles.circleContainer,
                    index <= 4 ? styles.hh : null,
                  ]}
                >
                  <Text style={styles.circle}>{day}</Text>
                </View>
              );
            })}
            <Text>{"\n"}</Text>
          </View> */}
          <View style={styles.row}>
        {week.map((day, index) => {
          return (
      <View key={index} style={[styles.circleContainer, data.hours[index][data.hours[index].length - 1]!=='d'?styles.hh:null]}>
            <Text style={styles.circle} >
              {day}
            </Text>
            </View>
      
          );
        })}
      </View>
          {data.hours.map((time, index) => {
            return (
              <Text key={index} style={styles.time}>
                {time}
              </Text>
            );
          })}
        </View>

        <Divider orientation="horizontal" width={1} style={styles.divider} />

        {/* Deals */}
        <View style={styles.card}>
          {!data.hh[0]||!data.hh[0].infos[0].days.includes(moment().format('dddd'))?<Text>No deals today</Text>:<View
            style={{
              flexDirection: "row",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <View style={styles.column}>
              {data.hh[0].infos[0].items.map((deal, i) => {
                return (
                  <Text style={styles.dealText} key={i}>
                    {deal.type}
                  </Text>
                );
              })}
            </View>

            <View style={[styles.column, { alignItems: "center" }]}>
              {data.hh[0].infos[0].items.map((deal, i) => {
                return (
                  <Text style={styles.dealText} key={i}>
                    {deal.name}
                  </Text>
                );
              })}
            </View>
            <View style={styles.column}>
              {data.hh[0].infos[0].items.map((deal, i) => {
                return (
                  <Text
                    style={[
                      styles.dealText,
                      { textDecorationLine: "line-through" },
                    ]}
                    key={i}
                  >
                    ${deal.regular_price}
                  </Text>
                );
              })}
            </View>

            <View style={styles.column}>
              {data.hh[0].infos[0].items.map((deal, i) => {
                return (
                  <Text style={styles.dealText} key={i}>
                    ${deal.discounted_price}
                  </Text>
                );
              })}
            </View>
          </View>}
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.back}
        onPress={() => {
          navigation.goBack(null) 
        }}
      >
        <Icon.ArrowLeft color={"black"} />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
  },
  circleContainer: {
    width: 25,
    height: 25,
    borderRadius: 100,
    alignItems: "center",
    marginRight: 6,
    marginLeft: -3,
    marginTop: -5,
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
    backgroundColor: "#D9D9D9",
  },
  divider: {
    borderColor: "grey",
    marginVertical: "3%",
  },
  scrollView: {
    paddingHorizontal: 12,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  times: {
    fontSize: 15,
    fontWeight: "bold",
  },
  back: {
    position: "absolute",
    left: "4%",
    top: "6%",
  },
  time: {
    fontSize: 12,
    color: "#4D4D4D",
  },
  column: {
    flexDirection: "column",
  },
  dealText: {
    fontWeight: "600",
    height: 80,
  },
  dealLogo: {
    width: 80,
    height: 80,
  },
});
