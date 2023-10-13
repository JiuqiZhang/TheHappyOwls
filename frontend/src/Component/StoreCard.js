import React from "react";
import { Text, Image, View, StyleSheet, Linking } from "react-native";
import * as Icon from "react-native-feather";
import moment from "moment/moment";
const week = ["M", "T", "W", "T", "F", "S", "S"];
export default StoreCard = (props) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={props.store.photoResult[0]?{uri:'http://spring-boot-repo-tpsi.s3.amazonaws.com/'+props.store.photoResult[0]._id+'_'+props.store.photoResult[0]['photos'][0].id}:require("../Image/store.jpg")}/>
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
      <View key={index} style={[styles.circleContainer, props.store.hours[index][props.store.hours[index].length - 1]!=='d'?styles.hh:null]}>
            <Text style={styles.circle} >
              {day}
            </Text>
            </View>
      
          );
        })}
      </View>
      <Text style={styles.cuisine}>{props.store.hours[moment().day()-1]}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container:{
    maxWidth:'100%'
  },
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
    height: "100%",
    height: 220,
    width:'100%',
    resizeMode: 'cover',
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
    backgroundColor: "#B6BBBF",
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
    backgroundColor:'#FFB300',

  },
});
