import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Linking,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions
} from "react-native";
import * as Icon from "react-native-feather";
import Slider from "../../Component/Slider";
import * as Location from "expo-location";
import { Divider } from "react-native-elements";
const { height} = Dimensions.get('screen');
import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";
export default DetailPage = ({ navigation, route }) => {
    const img = { 'Beer': require("../../Image/Beer.png"), 'Wine' : require('../../Image/Wine.png'), 'Food':require('../../Image/Food.png'), 'Cocktail':require('../../Image/Cocktail.png')}
    const [userLoc, setLoc] = useState(null)
  const data = route.params.store;
  const week = ["M", "T", "W", "T", "F", "S", "S"];
  const days ={
    0:'Monday',
    1:'Tuesday',
    2:'Wednesday',
    3:'Thursday',
    4:'Friday',
    5:'Saturday',
    6:'Sunday'
  }
  useEffect( ()=>{
    const getLoc = async() =>{
        let currentLocation = await Location.getCurrentPositionAsync({});
      
        setLoc(currentLocation.coords);
        }
        
      getLoc()
  },[])
  return (
    <SafeAreaView style={styles.container}>
      <Slider img={data.photoResult[0]}/>

      <ScrollView style={styles.scrollView}>
        {/* title */}
        <View style={styles.card}>
          <Text style={styles.text}>
            {data.name}
          </Text>
          <Divider orientation="horizontal" width={1} style={styles.divider} />
          <View style={{ flexDirection: "row",
    display: "flex",}}>
          
          <Text>
          {data.rating}
          </Text><Image
        style={{width:20, height:20, alignSelf:'auto'}}
        source={require('../../Image/G.png')}
      /></View>
          <TouchableOpacity onPress={() => Linking.openURL('maps://app?daddr='+data.latitude+'+'+data.longitude)}><Text  style={{color: '#53A9FF',textDecorationLine:'underline'}}>{data.location}</Text></TouchableOpacity>
        </View>
        {/* <Divider orientation="horizontal" width={1} style={styles.divider} /> */}

        {/* Happy hour */}
        <View style={styles.card}>
          <Text style={styles.times}>Happy Hour Times{"\n"}</Text>
          
          <View style={styles.row}>
        {week.map((day, index) => {
          return (
      <View key={index} style={[styles.circleContainer, data.hh[0]?data.hh[0].infos[0].days.includes(days[index])?styles.hh:null:null]}>
            <Text style={styles.circle} >
              {day}
            </Text>
            </View>
      
          );
        })}
      </View>
          {data.hh[0]?data.hh[0].infos[0].days.map((time, index) => {
            return (
              <Text key={index} style={styles.time}>
                {time+': '+data.hh[0].infos[0].start_time+ ' - ' + data.hh[0].infos[0].end_time}
              </Text>
            );
          }):<Text>No Happy Hour Schedules</Text>}
        </View>

        {/* <Divider orientation="horizontal" width={1} style={styles.divider} /> */}

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
                 {/*  */}
                return (
                
                    <Image style={{width:30,height: 30,marginBottom:'90%'}} key={i} source={img[deal.type]} />
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
    backgroundColor:'#FFFFFF'
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
    marginBottom:5,
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
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    shadowColor: "white",
    backgroundColor: '#FFFEFA',
    shadowOffset: { width: 0, height:2  },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 10,
  },
  divider: {
    borderColor: "black",
    marginVertical: "2%",
    marginBottom:'3%'
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
    height:height*0.02,
    color: "#4D4D4D",
  },
  column: {
    flexDirection: "column",
  },
  dealText: {
    fontWeight: "600",
    height: height*.07,
  },

});
