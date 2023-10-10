import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import * as Icon from "react-native-feather";
import Slider from "../../Component/Slider";
import { Divider } from "react-native-elements";
// import Carousel from 'react-native-snap-carousel';
export default DetailPage = ({ navigation, route }) => {
    const data = route.params.store;
    const week = ["M", "T", "W", "T", "F", "S", "S"];
    var deals = [
        { name: "Wine", originalPrice: 12, dealPrice: 8 },
        { name: "Cocktail of the day", originalPrice: 12, dealPrice: 8 },
        { name: "Well Drinks", originalPrice: 12, dealPrice: 8 },
    ];
    return (
        <View style={styles.container}>
            <Slider />

            <ScrollView style={styles.scrollView}>
                {/* title */}
                <View style={styles.card}>
                    <Text style={styles.text}>
                        {data.name}
                        {"\n"}
                    </Text>
                    <Text>
                        {data.rating} review - {data.location}
                    </Text>
                </View>
                <Divider orientation="horizontal" width={1} style={styles.divider} />

                {/* Happy hour */}
                <View style={styles.card}>
                    <Text style={styles.times}>Happy Hour Times{"\n"}</Text>
                    <View style={styles.row}>
                        {week.map((day, index) => {
                            return (
                                <View
                                    key={index}
                                    style={[
                                        styles.circleContainer,
                                        index <= 4 ? styles.hh : null,
                                    ]}
                                >
                                    <Text style={styles.circle}>{day}</Text>
                                </View>
                            );
                        })}
                        <Text>{"\n"}</Text>
                    </View>
                    {data.hours.map((time, index)=>{
                        return(<Text key = {index} style={styles.time}>{time}</Text>)
                    })}
                </View>

                <Divider orientation="horizontal" width={1} style={styles.divider} />

                {/* Deals */}
                <View style={styles.card}>
                    <View style={{
                        flexDirection: "row",
                        display: 'flex',
                        justifyContent: "space-between"
                    }}>
                      <View style={styles.column}>{deals.map((deal, i) => {
                            return (
                                <Text style={styles.dealText} key={i}>IPH</Text>
                            );
                        })}</View>
                    
                        <View style={[styles.column,{ alignItems:'center' }]}>{deals.map((deal, i) => {
                            return (

                                <Text style={styles.dealText} key={i}>{deal.name}</Text>

                            );
                        })}</View>
                        <View style={styles.column}>{deals.map((deal, i) => {
                            return (

                                <Text style={[styles.dealText,{textDecorationLine:'line-through'}]} key={i}>${deal.originalPrice}</Text>


                            );
                        })}</View>
                       
                        <View style={styles.column}>{deals.map((deal, i) => {
                            return (
                                <Text style={styles.dealText} key={i}>${deal.dealPrice}</Text>

                            );
                        })}</View>

                    </View>
                </View>
            </ScrollView>

            <TouchableOpacity
                style={styles.back}
                onPress={() => {
                    navigation.navigate("Menu");
                }}
            >
                <Icon.ArrowLeft color={"black"} />
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        backgroundColor: "#D9D9D9",
    },
    divider: {
        borderColor: "grey",
        marginVertical: "3%",
    },
    scrollView: {
        padding: 12,
        flexGrow:1
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
        color: "#4D4D4D",
    },
    column:{
        flexDirection:'column',
        

    },
    dealText:{
        fontWeight: "600",
        height:80
    },
    dealLogo: {
        width: 80,
        height: 80,
      },
});
