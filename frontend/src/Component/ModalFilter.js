import {View, TouchableOpacity,TextInput, Text, ScrollView, StyleSheet} from 'react-native'
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
        flexDirection: "row",
        width: "22%",
        paddingVertical: "1%",
        borderColor: "black",
        borderRadius: 10,
        borderWidth: 1,
    
      },
})

export default FilterModal = ({filter, setFilter,data, modal, setmodal, setFilteredData, filterVal}) => {



    const showFiltered = () =>{
      // price
     
      let res = data.filter(
        (store)=>{ return (store.off!==null && store.off<(+filter.discount.high) && store.off >= (+filter.discount.low))}
      )

     //days
     res = res.filter(
      (store)=>{
        for (day in filter.hhdays) {
          if (filter.hhdays[day] === true && store.days[day].time.length<=0){
            return
          }
          // if (obj.hasOwnProperty(key) && !predicate(obj[key])) {
          //     result[key] = obj[key];
          // }
      }
      return store

      }
     )
     
     //price
     res = res.filter(
      (store)=>
      {
        for (level in filter.price) {
          if (!store.price || (filter.price[level] === true && store.price!==level)){
            return
          }
        }
        return store
      }
     )

     //cuisine
     if (filter.selectedCuisine){
      res = res.filter(
        (store)=>{return store.cuisine == filter.selectedCuisine}
       )
     }

     setFilteredData(res)
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
            style={{ position: "absolute", left: "2%", top: "1%", zIndex: 17 }}
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

          {/* Discount range */}
          <ScrollView>
            <View>
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 15,
                  padding: "5%",
                  paddingLeft: "8%",
                }}
              >
                Discount Range
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                }}
              >
                <TextInput
                  style={{ borderWidth: 1, width: "30%", height: 30,textAlign:'center' }}
                  value={''+filter.discount.low}
                  keyboardType="numeric"
                  maxLength={2}
                  onChangeText={(e) => {
                    setFilter((filter) => ({
                      ...filter,
                      discount: { low: e, high: filter.discount.high },
                    }));
                  }}
                />
                <Text>-</Text>
                <TextInput
            value={''+filter.discount.high}
                  keyboardType="numeric"
                  maxLength={3}
                  style={{ borderWidth: 1, width: "30%",textAlign:'center' }}
                  onChangeText={(e) => {
                    setFilter((filter) => ({
                      ...filter,
                      discount: { high: e, low: filter.discount.low },
                    }));
                  }}
                />
                {/* <View style={{}}>
  <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15, marginBottom: 5}}>{123}</Text>
  <TextInput
    mode="outlined"
    label={'Email'}
    // secureTextEntry={secureTextEntry}
    // onChangeText={(text) => setText(text)}
    // returnKeyType={returnKeyType}
    // onSubmitEditing={onSubmitEditing}
    // keyboardType={keyboardType}

  />
</View> */}
              </View>
              <Divider width={1} style={{ margin: "2%", marginTop: "5%" }} />
              {/* days */}
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 15,
                  padding: "5%",
                  paddingLeft: "8%",
                }}
              >
                Happy Hour Days
              </Text>
              {Object.entries(filter.hhdays).map((day, i) => {
                return (
                  <View
                    key={i}
                    style={[
                      { flexDirection: "row", justifyContent: "space-between" },
                      styles.Checkbox,
                    ]}
                  >
                    <Text>{day}</Text>
                    <Checkbox
                      value={filter.hhdays[day[0]]}
                      onValueChange={() => {
                        setFilter((filter) => ({
                          ...filter,
                          hhdays: { ...filter.hhdays, [day[0]]: !day[1] },
                        }));
                      }}
                      color={"#E8BA183D"}
                    />
                  </View>
                );
              })}

              {/* items */}
{/* 
              <Divider width={1} style={{ margin: "2%" }} />
              <Text
                style={{
                  fontWeight: "600",
                  fontSize: 15,
                  padding: "5%",
                  paddingLeft: "8%",
                }}
              >
                Happy Hour Items
              </Text> */}

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
              <TouchableOpacity onPress={()=>{setFilter(filterVal);setmodal(false)}}>
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