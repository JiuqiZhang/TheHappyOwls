import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Button,
} from "react-native";
import { Searchbar } from "../../Component/SearchBar";
import StoreCard from "../../Component/StoreCard";
import axios from "axios";
import { SearchBar } from "react-native-elements";

export default MenuScreen = ({ navigation }) => {
  const [data, setData] = useState();
  useEffect(() => {
    var config = {
      method: 'get',
      url: 'https://data.tpsi.io/api/v1/stores/findCheckedStoreWithAllData',

      headers: { }
    };
    
    axios(config)
    .then((response) =>
        response.data.map((store) => ({
          name: store.name,
          rating: store.rating,
          cuisine:`${store.cuisine}`,
          hours: store.hours,
        }))
      )
      .then((stores) => {
        // console.log(stores);
        setData(stores);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <SafeAreaView style={styles.container}>
    <Searchbar/>
<ScrollView style={styles.scrollView}>
        {data
          ? data.splice(0, 30).map((object, index) => (
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
      </ScrollView>
      <View style={styles.stickyButton}>
        <Button title={"Map"} color="white" accessibilityLabel="Map" onPress={()=>{navigation.navigate("Map");}}/>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },

  scrollView: {
    marginHorizontal: 15,
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
