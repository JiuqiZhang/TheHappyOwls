import {
    Text,
    FlatList,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Modal,
    View,
    ImageBackground,
    SafeAreaView,
    Image,
  } from "react-native";
  import axios from "axios";
  import Constants from "expo-constants";
  import { useIsFocused } from "@react-navigation/native";
  const { width, height } = Dimensions.get("screen");
  import { BlurView } from "expo-blur";
  import React, { useEffect, useState } from "react";
  
  export default CouponList = ({ navigation }) => {
    const [modal, setModal] = useState(false);
    const [full, setFull] = useState(null);
    const [list, getList] = useState()
    useEffect(()=>{
        getFav()
    },[])
    const getFav = async () => {

        var config = {
          method: "get",
          url: "https://data.tpsi.io/api/v1/note/valid-coupons",
        };
    
        await axios(config)
          .then((response) => {
           getList(response.data)
            console.log(response.data)
          })
          .catch((error) => console.log(error));
      };
        return (
      <SafeAreaView style={styles.container}>
        {/* <Modal
          animationType="fade"
          visible={modal}
        >
          <TouchableOpacity
            style={{ flex: 1,alignItems:'center',justifyContent:"center" }}
            onPress={() => {
              setModal(false);
            }}
          >
            <Image style={{width:height-100,height:width,resizeMode:'contain',alignSelf:'center',justifyContent:'center',transform: [{rotate: '90deg'}]}} source={full} />
          </TouchableOpacity>
        </Modal> */}
        <Text style={styles.title}>Offers{list ? " (" + list.length + ")" : null}</Text>
        {list == null || list.length == 0 ? (
                <>
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                      alignSelf: "center",
                      marginTop: "55%",
                    }}
                    source={require("../../Image/Cocktail.png")}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: "600",
                      alignSelf: "center",
                      marginTop: "5%",
                    }}
                  >
                    More deals coming soon！
                  </Text>
                </>
              ) :         <FlatList
        style={{flex:1}}
          data={list}
          renderItem={({ item }) => (
            <TouchableOpacity
              key={item}
              style={{flex:1, height: 160, }}
              onPress={() => {
                //   navigation.navigate("Detail", { store: item });
                // setModal(true);
                // setFull(item);
              }}
            >
            <ImageBackground style={styles.image} source={require('../../Image/banner.png')} resizeMode="contain" >
      <Text style={{fontSize:19,fontWeight:'700',marginLeft:2}}>{item.store}</Text>
      <View style={{marginTop:7,marginLeft:20}}>{item.deals.map((item,i)=>{
        return(<Text style={{marginTop:2}} key={i} >{'✦ '+item}</Text>)
      })}
      
      </View>
      <Text style={{marginLeft:20}}>{'✦ '+item.note}</Text>
      <Text style={{fontSize:10,fontWeight:'200', position:'absolute', right:15,bottom:15}}>{item.location}</Text>
      
    </ImageBackground>
    
            </TouchableOpacity>
          )}
        />}

      </SafeAreaView>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 20,
      paddingTop: Constants.statusBarHeight,
    },
  
    image: {
      height: 160,
      width: 'auto',
      borderRadius: 20,
      paddingLeft:10,
      paddingTop:20

  
    },
  
    title: {
      fontSize: 20,
      fontWeight: "600",

      marginTop: 17,
      marginBottom:10
    },
    
  });