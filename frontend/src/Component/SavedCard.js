import {
    Text,
    FlatList,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import moment from "moment";
  import Constants from "expo-constants";
  import { Divider } from "react-native-elements";
  import * as Icon from "react-native-feather";
import { useSelector } from "react-redux";
  const openNow = (prop) => {
    if (prop.days[moment().format("dddd")].time.length > 0) {
      const start = prop.days[moment().format("dddd")].time[0].split(" - ")[0];
      const end = prop.days[moment().format("dddd")].time[0].split(" - ")[1];

      if (moment().format("HH:mm") > start && moment().format("HH:mm") < end) {
        return true;
      }
    }
    return false;
  };
export default SavedCard = React.memo(({item,setRefresh}) =>{
  const  user = useSelector(state => state.user);
    const remove = async(id) =>{
        var formdata = new FormData();

        formdata.append("username", user.email);
        formdata.append("storeID", id);
        
        var requestOptions = {
          method: 'POST',
          body: formdata,
        };
        
        await fetch("https://data.tpsi.io/api/v1/stores/removeStoreToUserFavorite", requestOptions)
          .then(response => response.text())
          .then(result => {if(result){setRefresh()}})
          .catch(error => console.log('error', error));
    
    }

    
    return( <View style={styles.card}>
        <Image
          style={styles.image}
          source={
            item.photoResult[0] && item.photoResult[0].photos[0]
              ? {
                  uri:
                    "http://spring-boot-repo-tpsi.s3.amazonaws.com/" +
                    item.photoResult[0]._id +
                    "_" +
                    item.photoResult[0].photos[0].id,
                }
              : require("../Image/store.jpg")
          }
        />
        <View style={{ flexGrow: 1 }}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ marginLeft: 16, maxWidth: 185 }}>
              <Text
                numberOfLines={2}
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                }}
              >
                {item.name}
              </Text>
              {openNow(item) ? (
              <Text style={{ color: "#008515", fontWeight: 600,fontSize:12, marginBottom:11}}>
                Live Now
              </Text>
            ) : (
              <Text style={{ color: "red", fontWeight: 600, fontSize:12,marginBottom:11 }}>
                Unavailable Now
              </Text>
            )}
    
            <View style={{flexDirection:"row"}}>
          <Image
            style={{
              width: 11,
              height: 11,
              alignSelf: "center",
            }}
            source={require("../Image/G.png")}
          />
          <Text
            style={styles.cuisine}
          >
            {item.rating + " • "}
          </Text>
        <Text style={styles.cuisine}>
          {item.cuisine}
          {item.price ? " • " + "$".repeat(+item.price) : null}
        </Text>
     </View>
            </View>
         <Text
              style={{
                right: 0,
                position: "absolute",
                fontWeight: 500,
                fontSize: 10,
                color: "#999999",
                top: 4,
              }}
            >
              {item.distance + " mi"}
            </Text>
           <TouchableOpacity  style={{ position: "absolute", right: 0, top: 30,padding:0 }} onPress={()=>{remove(item._id)}}>
           <Icon.Bookmark
        height={25}
        width={20}
        fill={"#FFD029"}
        stroke={"#5C4A0A"}
      />
           </TouchableOpacity>
          </View>
        </View>
      </View>)
   
})

const styles = StyleSheet.create({
    container: {
      flex: 1,
      // justifyContent: "center",
  
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
    cuisine:{ fontWeight: "500",fontSize:10, },
      title: {
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 4,
      marginTop: 17,
    },
  });