import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import { Searchbar } from "../../Component/SearchBar";
import StoreCard from "../../Component/StoreCard";
import axios from "axios";
import { useRef } from 'react';



export default MenuScreen = ({ navigation }) => {
  const [indicator, setIndicator] = useState(true)
  const [data, setData] = useState();
  const [search, setsearch] = useState('')
  const [result, setResult] = useState('')
  const scrollRef = useRef();
  useEffect(() => {
    var config = {
      method: 'get',
      url: 'https://data.tpsi.io/api/v1/stores/findCheckedStoreWithAllData',

      headers: { }
    };
    
    axios(config)
    .then((response) =>
        response.data.splice(0,30).map((store) => ({
          name: store.name,
          rating: store.rating,
          cuisine:`${store.cuisine}`,
          hours: store.hours,
          photoResult:store.photoResult,
          latitude: store.latitude,
          longitude: store.longitude,
          location:store.location,
          hh:store.hhResult,
          price:store.price
        }))
      )
      .then((stores) => {
        // console.log(stores);
        setData(stores);
        setIndicator(false)
      })
      .catch((error) => console.log(error));
  }, []);

  const searchResult = async()=>{
    if (search===''){
      return
    }
    var req = new FormData();
    req.append("search", search);
    setIndicator(true)
    

    await axios({
      method: "get",
      url: "https://data.tpsi.io/api/v1/stores/Search?search="+search,
      headers: {},
    })
      .then((response) =>
        response.data.map((store) => ({
          name: store.name,
          rating: store.rating,
          cuisine:`${store.cuisine}`,
          hours: store.hours,
          photoResult:store.photoResult,
          location:store.location,
          hh:store.hhResult,
          price:store.price
        }
        ))

      )
      .then((data)=>{
        setResult(data)
        scrollRef.current?.scrollTo({y: 0,animated: true,
        })
        setIndicator(false)

      })
      .catch((e)=>{
        console.log(e)
      })

  }
  return (
    <SafeAreaView style={styles.container}>
    <Searchbar value={search} onchange={setsearch} setResult={searchResult} />

{!indicator?(!result?<ScrollView style={styles.scrollView} ref={scrollRef}>
        {data
          ? data.map((object, index) => (
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
      </ScrollView>:<ScrollView style={styles.scrollView} ref={scrollRef}>
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
      </ScrollView>): <ActivityIndicator size="large" color="grey" style={{top:'5%'}} animating={indicator} />}
      <View style={styles.stickyButton}>
       {result?<Button title={"Return"} color="white" accessibilityLabel="Return" onPress={()=>{setsearch('');setResult(null);scrollRef.current?.scrollTo({y: 0,animated: true,
  })}}/>:null}
      </View>
    </SafeAreaView>
  )
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },

  scrollView: {
    marginHorizontal: 15,
    width:'100%',
    flexGrow: 1,
  },
  inputContainer: {
    minHeight: 50,
    height: 50,
    maxWidth: "90%",
    borderWidth: 1,
    borderColor: "grey",
    padding: 10,
    borderRadius: 20,
    display: "flex",
    flexDirection: "row",
    margin: 10,
  },
  searchArea: {
    width: "100%",
    padding: "3%",
    borderBottomColor: "grey",
    paddingTop:0,
    borderTopColor: "grey",
    borderWidth: 0.4,
    borderTopWidth:0
  },
  divider: {
    marginHorizontal: 6,
    borderColor: "grey",
  },
  input: {
    minWidth: "80%",
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
});
