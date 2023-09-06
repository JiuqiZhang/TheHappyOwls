import React from "react";
import { Text, Image, View, StyleSheet } from "react-native";
import * as Icon from "react-native-feather";

const week = ["M", "T", "W", "T", "F", "S", "S"];
export default StoreCard = (props) => {
  return (
    <React.Fragment>
      <Image style={styles.image} source={require("../Image/store.jpg")} />
      <View style={[styles.flexcontainer, styles.row]}>
        <Text style={styles.text}>{props.store.name}</Text>
        <View style={styles.rating}>
          <Icon.Star color={"black"} fill={"black"} width={12} />
          <Text style={styles.ratingText}>{props.store.rating}</Text>
        </View>
      </View>

      <Text style={styles.cuisine}>{props.store.cuisine}</Text>
      <View style={styles.row}>
        {week.map((day, index) => {
          return (
      <View key={index} style={[styles.circleContainer, index<=4?styles.hh:null]}>
            <Text style={styles.circle} >
              {day}
            </Text>
            </View>
      
          );
        })}
      </View>
      <Text style={styles.cuisine}>{props.store.hours}</Text>
    </React.Fragment>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 19,
    fontWeight: "600",
 
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "500",
    margin: 4,
  },
  image: {
    maxWidth: "100%",
    height: "auto",
    height: 220,

    borderRadius: 20,
    alignSelf: "center",
    marginTop: "8%",

  },
  row: {
    flex: 1,
    flexDirection: "row",
    margin: 5,

  },
  flexcontainer: {
    marginTop: 8,
    marginBottom: 0,
    justifyContent: "space-between",
  },
  circleContainer: {
    width:25,
    height:25,
    borderRadius: 100,
    alignItems:'center',
    marginRight: 5,
    marginLeft: -3,
    marginTop:-5,
    backgroundColor: "#E0E0E0",
    justifyContent:'center',
  textAlign:'center',
  display:'flex'

  },
  rating: {
    flexDirection: "row",
    display: "flex",
  },
  cuisine: {
    color: "#7A7A7A",
    fontSize: 12,
    margin: 5,
    marginTop: 0,
  },
  circle:{
    color:'#808021',
    fontWeight:'bold'
  },
  hh:{
    backgroundColor:'#FFB300'
  },
});