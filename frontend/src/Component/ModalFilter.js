import {View, TouchableOpacity,TextInput, Text, ScrollView, StyleSheet, Image} from 'react-native'
import React, { useEffect, useState } from "react";
import { Divider } from 'react-native-elements';
import Modal from "react-native-modal";
import Checkbox from "expo-checkbox";
import * as Icon from "react-native-feather";

const styles=StyleSheet.create({
    Checkbox: {
        padding: "8%",
        paddingVertical: "1%",
      },
      price: {
        alignItems: "center",
        justifyContent: "center",
 
        width: "22%",
        paddingVertical: "1%",
        borderColor: "black",
        borderRadius: 10,
        borderWidth: 1,
    
      },
})

const img = {
    Beer: require("../Image/Beer.png"),
    Wine: require("../Image/Wine.png"),
    Food: require("../Image/Food.png"),
    Cocktail: require("../Image/Cocktail.png"),
  };
  
export default FilterModal = ({filter, setFilter,data, modal, setmodal, setFilteredData, filterVal,screen}) => {



    const showFiltered = () =>{
    

     
     let res = data

     //sort
      if (filter.sortBy){
        res = res.sort(
          (a,b)=>{return a[filter.sortBy]-b[filter.sortBy]}
         )
       }


     setmodal(false)

    }

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        style={{ justifyContent: "flex-end", margin: 0 }}
      >
      <TouchableOpacity style={{height:'15%'}} onPress={()=>{setmodal(false)}}/>
        <View
          style={{
            backgroundColor: "#FFFFFF",
            height: "90%",
            borderColor: "#ccc",
            borderWidth: 0.5,
            borderStyle: "solid",
            elevation: 20,
            borderRadius: 20,
          }}
        >
          <TouchableOpacity
            style={{ position: "absolute", left: "2%", top: "1%", zIndex: 17,width:37,height:30 }}
            onPress={() => {
              setmodal(false);
            }}
          >
            <Icon.X color={"black"} />
          </TouchableOpacity>

          <Text
            style={{
              alignSelf: "center",
              fontSize: 17,
              fontWeight: "bold",
              marginVertical: "2.5%",
            }}
          >
            Filter
          </Text>
          <Divider width={1} />

          <ScrollView>
            <View>
           {screen==='map'?null:<View><Text
                style={{
                  fontWeight: "600",
                  fontSize: 15,
                  padding: "5%",
                  paddingLeft: "8%",
                }}
              >
                Sort By
              </Text>

              {(filter.sortby).map((type, i) => {
                return (
                  <View
                    key={i}
                    style={[
                      { flexDirection: "row", justifyContent: "space-between" },
                      styles.Checkbox,
                    ]}
                  >
                    <Text>{type}</Text>
                    <Checkbox
                      value={filter.sortBy===type}
                     
                      onValueChange={() => {
                        if(filter.sortBy === type){
                          setFilter((filter) => ({
                          ...filter,
                          sortBy:null
                        }));
                        }else{
                          setFilter((filter) => ({
                          ...filter,
                          sortBy:type
                        }));
                        }
                         
                      }}
                      color={"#E8BA183D"}
                    />
                  </View>
                );
              })}
              <Divider width={1} style={{ margin: "2%" }} /></View>}

 
              {/* items */}
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 15,
                  padding: "5%",
                  paddingLeft: "8%",
                }}
              >
                Happy Hour Items
              </Text>
              <View
                    style={[
                       {
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flexWrap:'wrap'
       
                },
                      styles.Checkbox,
                    ]}
                  >
              {Object.entries(filter.items).map((item, i) => {
                return (
                 
                  <TouchableOpacity key={i} style={[styles.price,{width:'48%',marginBottom:20,backgroundColor:item[1]?'#E8BA183D':null}]} onPress={() => {
                        setFilter((filter) => ({
                          ...filter,
                          items: { ...filter.items, [item[0]]: !item[1] },
                        }));
                      }}>
                        <Image
                          source={img[item[0]]}
                          style={{
                            resizeMode:"cover",
                            width: 30,
                            height: 30,
                            marginBottom:'10%'
                          }}
                        />
                  <Text>{item}</Text>
                  </TouchableOpacity>
                    
                   
           
                );
              })}
              </View>

              {/* price */}
              <Divider width={1} style={{ margin: "2%" }} />
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 15,
                  padding: "5%",
                  paddingLeft: "8%",
                }}
              >
                Price
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: "8%",
                  paddingBottom: "1%",
                }}
              >
                {Object.entries(filter.price).map((s, i) => {
                  return (
                    <TouchableOpacity key={i} style={[styles.price,{ backgroundColor:s[1]?'#E8BA183D':null}]} onPress={() => {
                        setFilter((filter) => ({
                          ...filter,
                          price: { ...filter.price, [s[0]]: !s[1] },
                        }))}}>
                      <Text style={{ textAlign: "center" }}>
                        {"$".repeat(+s[0])}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <Divider width={1} style={{ margin: "2%" }} />
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 15,
                  padding: "5%",
                  paddingLeft: "8%",
                }}
              >
                Cuisine
              </Text>

              {(filter.cuisine).map((type, i) => {
                return (
                  <View
                    key={i}
                    style={[
                      { flexDirection: "row", justifyContent: "space-between" },
                      styles.Checkbox,
                    ]}
                  >
                    <Text>{type}</Text>
                    <Checkbox
                      value={filter.selectedCuisine===type}
                     
                      onValueChange={() => {
                        if(filter.selectedCuisine === type){
                          setFilter((filter) => ({
                          ...filter,
                          selectedCuisine:null
                        }));
                        }else{
                          setFilter((filter) => ({
                          ...filter,
                          selectedCuisine:type
                        }));
                        }
                         
                      }}
                      color={"#E8BA183D"}
                    />
                  </View>
                );
              })}
   
              {/* <Divider width={1} style={{ margin: "2%" }} />
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 15,
                  padding: "5%",
                  paddingLeft: "8%",
                }}
              >
                Distance Away
              </Text>
              <Divider width={1} style={{ margin: "2%" }} /> */}
            </View>
          </ScrollView>
          <View style={{ height: "10%" }}>
            <Divider width={1} />
            <View
              style={{
                alignContent: "center",
               flexDirection:'row',justifyContent:"space-around",alignItems:'center',
                width: "100%",
                height: "100%",
              }}
            >
              <TouchableOpacity onPress={()=>{setFilter(filterVal);setmodal(false);setFilteredData(data)}}>
                <Text style={{ alignSelf: "center", textDecorationLine:'underline'}}>Clear All</Text>
              </TouchableOpacity>
              <TouchableOpacity style={{backgroundColor:'#FFD029',borderRadius:15,padding:"3%",paddingHorizontal:'5%'}} onPress={()=>{showFiltered()}}>
                <Text style={{ alignSelf: "center" }}>Show</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };