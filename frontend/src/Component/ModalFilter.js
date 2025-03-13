import {
  View,
  TouchableOpacity,
  TextInput,
  Text,
  ScrollView,
  StyleSheet,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { Divider } from "react-native-elements";
import Modal from "react-native-modal";
import Checkbox from "expo-checkbox";
import * as Icon from "react-native-feather";
import { LinearGradient } from "expo-linear-gradient";
import moment from "moment/moment";
const styles = StyleSheet.create({
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
});

const img = {
  Beer: require("../Image/Beer.png"),
  Wine: require("../Image/Wine.png"),
  Food: require("../Image/Food.png"),
  Cocktail: require("../Image/Cocktail.png"),
};

export default FilterModal = ({
  filter,
  setFilter,
  setFiltered,
  data,
  modal,
  setmodal,
  open,
  setopen,
  setFilteredData,
  filterVal,
  screen,
}) => {
  const [time, setTime] = useState(false);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modal}
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <TouchableOpacity
        style={{ height: "15%" }}
        onPress={() => {
          setmodal(false);
        }}
      />
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
          style={{
            position: "absolute",
            left: "2%",
            top: "1%",
            zIndex: 17,
            width: 37,
            height: 30,
          }}
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
            {screen === "map" ? null : (
              <View>
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 15,
                    padding: "5%",
                    paddingLeft: "8%",
                  }}
                >
                  Sort By
                </Text>

                {filter.sortby.map((type, i) => {
                  return (
                    <View
                      key={i}
                      style={[
                        {
                          flexDirection: "row",
                          justifyContent: "space-between",
                        },
                        styles.Checkbox,
                      ]}
                    >
                      <Text>{type}</Text>
                      <Checkbox
                        value={filter.sortBy === type}
                        onValueChange={() => {
                          if (filter.sortBy !== type) {
                            setFilter((filter) => ({
                              ...filter,
                              sortBy: type,
                            }));
                          }
                        }}
                        color={"#E8BA183D"}
                      />
                    </View>
                  );
                })}
                <Divider width={1} style={{ margin: "2%" }} />
              </View>
            )}
            <Text
              style={{
                fontWeight: "600",
                fontSize: 15,
                padding: "5%",
                paddingLeft: "8%",
              }}
            >
              Days
            </Text>
            <View
              style={{
                flexDirection: "row",
                display: "flex",
                marginHorizontal:30,
              }}
            >
              <View
                style={[
                  {
                    paddingHorizontal: 10,
         
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 15,
                    shadowColor: "#c58a00",
                    shadowOffset: { width: 1, height: 1 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 5,
                    marginBottom: "1%",
                    flexDirection: "row",
                    backgroundColor: "#F9EEC8",
                    borderWidth: 1,
                    borderColor: "white",
                    justifyContent: "space-between",
                    width: "100%",
                    paddingVertical: 1,
                    height: 32,
                  },
                ]}
              >
                {Object.entries(filter.hhdays).map((day, i) => {
                  return (
                    <TouchableOpacity
                      style={{ alignSelf: "center", height: 28, width: 28 }}
                      onPress={() => {
                        setFilter((filter) => ({
                          ...filter,
                          hhdays: { ...filter.hhdays, [day[0]]: !day[1] },
                        }));
                        if (!day[1]) {
                          setFiltered((filter) => filter + 1);
                        } else {
                          setFiltered((filter) => filter - 1);
                        }
                      }}
                      key={i}
                    >
                      <LinearGradient
                        colors={
                          filter.hhdays[day[0]]
                            ? ["#F9EEC8", "#FFD029", "#D9AA04"]
                            : ["transparent"]
                        }
                        style={[
                          filter.hhdays[day[0]]
                            ? {
                                shadowColor: "#C0A106",
                                backgroundColor: "#F9C241",
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.4,
                                borderWidth: 0.1,
                                borderColor: "#F9C241",
                                shadowRadius: 2,
                                borderRadius: 999,
                              }
                            : null,
                          {
                            alignSelf: "center",
                            height: 28,
                            width: 28,
                            borderRadius: 999,
                          },
                        ]}
                        start={{ x: -0.1, y: 0.2 }}
                        end={{ x: 1.1, y: 1 }}
                      >
                        <Text
                          style={[
                            {
                              fontSize: 14,
                              fontWeight:
                                moment().format("dddd") === day[0]
                                  ? "800"
                                  : "500",
                              textAlign: "center",
                              marginVertical: "20%",
                            },
                          ]}
                        >
                          {day[0] !== "Thursday" ? day[0][0] : "TH"}
                        </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
            <Text
              style={{
                fontWeight: "600",
                fontSize: 15,
                padding: "5%",
                paddingLeft: "8%",
                
              }}
            >
              Hours
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 30,
                justifyContent: "space-between",
                borderRadius: 15,
                borderWidth: 1,
                borderColor: "#D1CFCF",
                height: 39,
                alignItems: "center",
                marginBottom:'2%'
              }}
            >
              <TouchableOpacity
  
                style={{ width: "33%", height: 37, justifyContent: "center",backgroundColor:(!open && !time)?"#F9EEC8":null,borderRadius: 15,left:0,
     
                borderColor: (!open && !time)?"#D1CFCF":null,}}
                onPress={() => {
                  setopen(false);
                  setTime(false);
                  setFilter((filter) => ({
                    ...filter,
                    custom: null,
                  }));
                  setFiltered((filter) => filter - 1);
        
                }}
                color={"#E8BA183D"}
              >
                <Text style={{ alignSelf: "center" }}>Any</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ width: "33%", height: 37, justifyContent: "center",backgroundColor:(open)?"#F9EEC8":null,borderRadius: 15,
borderColor: (open)?"#D1CFCF":null, }}
                value={open}
                onPress={() => {
                  if (!open) {
                    setopen(true);
                  }
                  if (!time) {
                    setFiltered((filter) => filter + 1);
                  }

                  setTime(false);
                  setFilter((filter) => ({
                    ...filter,
                    custom: null,
                  }));
                }}
                color={"#E8BA183D"}
              >
                <Text style={{ alignSelf: "center" }}>Live Now</Text>
              </TouchableOpacity>

              <TouchableOpacity
                value={time}
                style={{ width: "33%", height: 39, justifyContent: "center",backgroundColor:(time)?"#F9EEC8":null,borderRadius: 15,
borderColor: (time)?"#D1CFCF":null, }}
                onPress={() => {
                  if (!open) {
                    setFiltered((filter) => filter + 1);
                  }
                  setopen(false);
                  setTime(true);
                }}
                color={"#E8BA183D"}
              >
                <Text style={{ alignSelf: "center" }}>Custom</Text>
              </TouchableOpacity>
            </View>
            {time ? (
              <Picker
                selectedValue={time}
                onValueChange={(itemValue, itemIndex) => {
                  setTime(itemValue);
                  setFilter((filter) => ({
                    ...filter,
                    custom: itemValue,
                  }));
                }}
              >
                <Picker.Item label="00:00" value="00:00" />
                <Picker.Item label="01:00" value="01:00" />
                <Picker.Item label="02:00" value="02:00" />
                <Picker.Item label="03:00" value="03:00" />
                <Picker.Item label="04:00" value="04:00" />
                <Picker.Item label="05:00" value="05:00" />
                <Picker.Item label="06:00" value="06:00" />
                <Picker.Item label="07:00" value="07:00" />
                <Picker.Item label="08:00" value="08:00" />
                <Picker.Item label="09:00" value="09:00" />
                <Picker.Item label="10:00" value="10:00" />
                <Picker.Item label="11:00" value="11:00" />
                <Picker.Item label="12:00" value="12:00" />
                <Picker.Item label="13:00" value="13:00" />
                <Picker.Item label="14:00" value="14:00" />
                <Picker.Item label="15:00" value="15:00" />
                <Picker.Item label="16:00" value="16:00" />
                <Picker.Item label="17:00" value="17:00" />
                <Picker.Item label="18:00" value="18:00" />
                <Picker.Item label="19:00" value="19:00" />
                <Picker.Item label="20:00" value="20:00" />
                <Picker.Item label="21:00" value="21:00" />
                <Picker.Item label="22:00" value="22:00" />
                <Picker.Item label="23:00" value="23:00" />
              </Picker>
            ) : null}


            <Divider width={1} style={{ margin: "2%" }} />
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
                  flexWrap: "wrap",
                },
                styles.Checkbox,
              ]}
            >
              {Object.entries(filter.items).map((item, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    style={[
                      styles.price,
                      {
                        width: "48%",
                        marginBottom: 20,
                        backgroundColor: item[1] ? "#E8BA183D" : null,
                      },
                    ]}
                    onPress={() => {
                      setFilter((filter) => ({
                        ...filter,
                        items: { ...filter.items, [item[0]]: !item[1] },
                      }));
                      if (!item[1]) {
                        setFiltered((filter) => filter + 1);
                      } else {
                        setFiltered((filter) => filter - 1);
                      }
                    }}
                  >
                    <Image
                      source={img[item[0]]}
                      style={{
                        resizeMode: "cover",
                        width: 30,
                        height: 30,
                        marginBottom: "10%",
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
                  <TouchableOpacity
                    key={i}
                    style={[
                      styles.price,
                      { backgroundColor: s[1] ? "#E8BA183D" : null },
                    ]}
                    onPress={() => {
                      setFilter((filter) => ({
                        ...filter,
                        price: { ...filter.price, [s[0]]: !s[1] },
                      }));

                      if (!s[1]) {
                        setFiltered((filter) => filter + 1);
                      } else {
                        setFiltered((filter) => filter - 1);
                      }
                    }}
                  >
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

            {filter.cuisine.map((type, i) => {
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
                    value={filter.selectedCuisine === type}
                    onValueChange={() => {
                      if (filter.selectedCuisine === type) {
                        setFilter((filter) => ({
                          ...filter,
                          selectedCuisine: null,
                        }));
                        setFiltered((filter) => filter - 1);
                      } else {
                        if (filter.selectedCuisine === null) {
                          setFiltered((filter) => filter + 1);
                        }
                        setFilter((filter) => ({
                          ...filter,
                          selectedCuisine: type,
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
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              width: "100%",
              height: "100%",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setFilter(filterVal);
                setFilteredData(data);
                setmodal(false);
                setopen(false);
                setFiltered(0);
                setTime(false);
              }}
            >
              <Text
                style={{ alignSelf: "center", textDecorationLine: "underline" }}
              >
                Clear All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "#FFD029",
                borderRadius: 15,
                padding: "3%",
                paddingHorizontal: "5%",
              }}
              onPress={() => {
                setmodal(false);
              }}
            >
              <Text style={{ alignSelf: "center" }}>Show</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
