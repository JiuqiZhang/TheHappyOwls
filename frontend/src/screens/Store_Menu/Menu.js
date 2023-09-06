import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  TextInput
} from 'react-native';
import { Divider } from "react-native-elements";
import * as Icon from "react-native-feather"
import StoreCard from '../../Component/StoreCard';
import axios from "axios";
import { SearchBar } from 'react-native-elements';
const list = [
  {
    name: 'Amy Farha Bar and Grill',
    cuisine: 'Japanese cuisine',
    rating:'5.5',
    hours:'5pm - 8pm',
    location:'jackson park ave, New york, NY 11101'
  },
  {
    name: 'Jackson Park Lic',
    cuisine: 'Chinese cuisine',
    rating:'4.5',
    hours:'6am - 8pm',
    location:'jackson park ave, New york, NY 11101'
  },
  {
    name: 'The Spot',
    cuisine: 'dessert Bar',
    rating:'5.5',
    hours:'9am - 12am',
    location:'jackson park ave, New york, NY 11101'
  },
  {
    name: 'Amy Farha Bar and Grill',
    cuisine: 'Japanese cuisine',
    rating:'5.5',
    hours:'5pm - 8pm',
    location:'jackson park ave, New york, NY 11101'
  },
  {
    name: 'Jackson Park Lic',
    cuisine: 'Chinese cuisine',
    rating:'4.5',
    hours:'6am - 8pm',
    location:'jackson park ave, New york, NY 11101'
  },
  {
    name: 'The Spot',
    cuisine: 'dessert Bar',
    rating:'5.5',
    hours:'9am - 12am',
    location:'jackson park ave, New york, NY 11101'
  },
  {
    name: 'Amy Farha Bar and Grill',
    cuisine: 'Japanese cuisine',
    rating:'5.5',
    hours:'5pm - 8pm',
    location:'jackson park ave, New york, NY 11101'
  },
  {
    name: 'Jackson Park Lic',
    cuisine: 'Chinese cuisine',
    rating:'4.5',
    hours:'6am - 8pm',
    location:'jackson park ave, New york, NY 11101'
  },
  {
    name: 'The Spot',
    cuisine: 'dessert Bar',
    rating:'5.5',
    hours:'9am - 12am'
  },
  {
    name: 'Amy Farha Bar and Grill',
    cuisine: 'Japanese cuisine',
    rating:'5.5',
    hours:'5pm - 8pm'
  },
  {
    name: 'Jackson Park Lic',
    cuisine: 'Chinese cuisine',
    rating:'4.5',
    hours:'6am - 8pm'
  },
  {
    name: 'The Spot',
    cuisine: 'dessert Bar',
    rating:'5.5',
    hours:'9am - 12am'
  }
]
export default MenuScreen = ({navigation}) => {
  const [data, setData] = useState()
  useEffect(()=>{
    axios
    .get("http://ec2-34-203-231-63.compute-1.amazonaws.com:8080/api/v1/stores/getAllStores")
    .then(response =>
      response.data.map(store => ({
        name: `${store.name}`,
        rating:`${store.rating}`,
        cuisine:`${store.cuisine}`,
        hours:`${store.hours}`
      }))
    )
    .then(stores => {
      console.log(stores)
      setData(
        stores
      );
    })
    .catch(error => console.log(error));
  },[])

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.searchArea}>
    <View style={styles.inputContainer}>
            <Icon.Search color={"grey"} />
            <Divider orientation="vertical" style={styles.divider} />
            <TextInput
              style={styles.input}
              
              placeholder="Search"
            />
          </View>
          </View>
    <ScrollView style={styles.scrollView}>
   {data? data.splice(0,30).map((object, index) => (
    <TouchableOpacity key={index} onPress={()=>{console.log(object.name)}} ><StoreCard  store = {object}/></TouchableOpacity>
    ))
:list.map((object, index) => (
    <TouchableOpacity key={index} onPress={()=>{ navigation.navigate('Detail',{ store: object }) }} ><StoreCard  store = {object}/></TouchableOpacity>
    ))
}

    </ScrollView> 

  </SafeAreaView>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
  
      alignItems: 'center',
    },

    scrollView: {
      marginHorizontal: 15,
      flexGrow:1
    },
    inputContainer: {
      minHeight: 50,
      height: 50,
      maxWidth:'90%',
      borderWidth: 1,
      borderColor: "grey",
      padding: 10,
      borderRadius: 20,
      display: "flex",
      flexDirection: "row",
      margin: 10,
    },
    searchArea:{

      width:'100%',
      padding:'3%',
      borderBottomColor:'grey',
      borderTopColor:'grey',
      borderWidth: .4,
  

    },
    divider: {
      marginHorizontal: 6,
      borderColor: "grey",
    },
    input: {
      minWidth: "80%",
    },
  });
  